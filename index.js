const express= require("express");
const bodyParser= require("body-parser");
const axios= require("axios");
const ejs= require("ejs");
const _ = require("lodash");
const fs= require("fs");


const port = process.env.PORT||'3000';

const app= express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
axios.defaults.baseURL='https://restcountries.eu/rest/v2';


const nationsCode = {};

const updateNationsCode = async (url = '/all') =>{
	const data = await (axios.get(url));
	data.data.forEach(nation =>{
		nationsCode[nation.alpha3Code] = nation.name
	})
	
};

updateNationsCode().catch(err => err);


app.route("/")
	.get((req, res)=>{
	
	})
	.post((req, res)=>{

	let requested= req.body.search.toLowerCase();
	res.redirect(`/countries/${requested}/`)
})


app.get("/:region", (req, res) =>{
	const path = req.params.region.toLowerCase();

	let checkPathExists = `./views/${path}.ejs`;

	try{
		if(fs.existsSync(checkPathExists))
		res.render(path);
		else
		res.redirect("/");
	}
	catch(error){
		console.log(error)
	}

})

app.get('/countries/:country', (req, res)=>{

	let country= req.params.country;

	const getResults= async (url)=>{

		let data= await axios.get(url)
		const {
			name,
			topLevelDomain,
			region,
			subregion,
			population,
			nativeName,
			flag,
			capital,
			currencies,
			languages,
			borders
		}= data.data[0];

		const updatedBorders = [];

		borders.forEach(nationCode =>{
			updatedBorders.push(nationsCode[nationCode]);
		})


		res.render('search', {
			name:name,
			topLevelDomain:topLevelDomain,
			region:region,
			subregion:subregion,
			population:population,
			nativeName:nativeName,
			flag:flag,
			capital:capital,
			currencies:currencies[0].name,
			languages:languages[0].name,
			borderCountries: updatedBorders
		})

		console.log(updatedBorders);

	}
	
	getResults(`/name/${country}?fullText=true`).catch(err=> {return err});

})

app.listen(port, ()=>{
	console.log('running at '+ port);

})


