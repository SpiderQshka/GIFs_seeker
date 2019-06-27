var addGifsBtn = document.getElementById('get-gifs'),
	output = document.getElementById('output'),
	gifName = document.getElementById('name'),
	deleteGifsBtn = document.getElementById('delete-gifs'),
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
	}
}

document.addEventListener('click', function(e){
	if (e.target === addGifsBtn){

		// Составление url для отправки AJAX-запроса
		url = api + (query + gifName.value) + apiKey + (limit + (gifNumber.value || 0));

		ajaxGet(url, handler);
	}
	else if (e.target === deleteGifsBtn){
		removeChildren(output);
	}

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
		var alert = document.createElement('div');
		alert.className = 'alert alert-warning';
		alert.innerHTML = 'Have some troubles with getting data, please, try again.<br>' + e.message;
		output.append(alert);
		throw new Error(e.message);
	}
	
	removeChildren(output);

	for(let i = 0; i < gifNumber.value || 0; i++){
		let img = document.createElement('img');
		img.src = response.data[i].images.fixed_height.url;
		img.className = 'p-2';
		output.appendChild(img);
	}
	
}
