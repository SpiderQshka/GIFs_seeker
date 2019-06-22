var btn = document.getElementById('get-gifs'),
	output = document.getElementById('output'),
	gifName = document.getElementById('name'),
	gifNumber = document.getElementById('number');

var api = 'http://api.giphy.com/v1/gifs/search?',
	query = '&q=',
	apiKey = '&api_key=UnHs5uksnMWHBLc1ae4X1q03r7CVHwPH',
	limit = '&limit=',
	url;


// Удаляет потомков элемента, если они есть
function removeChildren(elem){
	while(elem.lastChild){
		elem.removeChild(elem.lastChild);
	};
}

btn.addEventListener('click', function(e){

	// Составление url для отправки AJAX-запроса
	url = api + (query + gifName.value) + apiKey + (limit + gifNumber.value);

	ajaxGet(url, handler);

});

// Обработка AJAX-запроса
function ajaxGet(url, callback){
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url);

	xhr.send();

	xhr.onreadystatechange = function(){

		if(this.readyState !== 4) return;

		callback(this);

	}
}

// Обработка и вывод полученных данных
function handler(data){
	try{
		var response = JSON.parse(data.response);
	}
	catch(e){
		output.innerHTML = 'Have some troubles with getting data, please, try again.<br>' + e.message;
		throw new Error(e.message);
	}

	removeChildren(output);

	for(let i = 0; i < gifNumber.value; i++){
		let img = document.createElement('img');
		img.src = response.data[i].images.fixed_height.url;
		img.className = 'col col-sm-6 col-md-4 col-lg-4 col-xl-3 p-4 border bg-light';
		output.appendChild(img);
	}
	
}
