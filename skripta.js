window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
        document.getElementById("barve").appendChild(input);
	}
	
	document.querySelector("#novaBarva").addEventListener('click', dodajBarvo);
		
	//Odstrani barve
	var odstrBarve = function(event) {
		while (document.getElementById("barve").hasChildNodes()) {
		 document.getElementById("barve").removeChild(document.getElementById("barve").firstChild);
		}
	}
	
	document.querySelector("#odstraniBarve").addEventListener('click', odstrBarve);
	
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;
	
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];
		maxCas = document.querySelector("#max").value;
		minCas = document.querySelector("#min").value;
			window.alert(minCas);

		if (ustavi) {
			ustavi = false;
		} else {
			var novId = (id+1) % vrednosti.length;
			var timeout = Math.floor((maxCas-minCas)+minCas);
			setTimeout(function() {spremeniBarvo(novId)} , timeout);
		}		
	}
	
	var stop = function(event) {
		ustavi = true;
		var gumb = document.querySelector("#start");
		gumb.innerHTML = "Zaženi stroboskop";
		gumb.removeEventListener('click', stop);
		gumb.addEventListener('click', zagon);	
	}
	
	var zagon = function(event) {
		ustavi = false;
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		spremeniBarvo(0);
		
		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', stop);
	}
	document.querySelector("#start").addEventListener('click', zagon);
	
});