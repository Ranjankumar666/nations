//https://restcountries.eu/rest/v2/all

let addClass=(tag, className)=>(tag.classList.add(className));

let addChild=(parent,...args)=>{

	args.forEach(child=> {
		parent.appendChild(child);
	})
}

let target= document.querySelector("#region");



(async ()=>{
	let data;

	if(localStorage.getItem('data') === null){

		let api= await axios.get('https://restcountries.eu/rest/v2/'+ target.value);
		let apiData= await api.data;
		sessionStorage.setItem('data', JSON.stringify(apiData));
	}
		data = JSON.parse(sessionStorage.getItem('data'));


	await data.forEach(country=>{

		let img= document.createElement('img');
		let name= document.createElement('p');
		let population= document.createElement('p');
		let region= document.createElement('p');
		let capital= document.createElement('p');

		img.setAttribute('src', country.flag);

		addClass(img,'container__body__card__img');
		addClass(name,'heading-2')

		name.innerText= country.name;
		population.innerHTML= `<span class="heading-3 margin-right-sm">Population:</span>${country.population}`;
		region.innerHTML= `<span class="heading-3 margin-right-md">Region:</span> ${country.region}`;
		capital.innerHTML= `<span class="heading-3 margin-right-md">Capital:</span>${country.capital}`;



		let bodyContainer= document.querySelector('.container__body');
		let card=  document.createElement('a');
		addClass(card,'container__body__card');
		card.setAttribute('href',`/countries/${country.name.toLowerCase()}`)

		addChild(bodyContainer, card);

		card.appendChild(img)

		let cardDiv= document.createElement('div');
		card.appendChild(cardDiv);
		addClass(cardDiv,'container__body__card__details')



		addChild(cardDiv, name, population, region, capital);


	})


})();

let show= true;
let optionList= document.querySelector('.container__search__options').addEventListener('click',async function(){

	let options= document.querySelector('.list');
	let icon= document.querySelector('.search__icon');
	if(show){

		options.setAttribute('id', 'show');
		icon.classList.add('rotate-scale-down');
		icon.classList.remove('rotate-rev-scale-down');
		show=false;

	}
	else{
		options.setAttribute('id', 'noShow');
		show=true;
		icon.classList.remove('rotate-scale-down');
		icon.classList.add('rotate-rev-scale-down');
	}


})





