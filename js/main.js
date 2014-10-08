/* Hue Control Panel
*	@author 				Daniel Meola
*	@description 			Defines triggers and actions for the Hue control panel
*							http://www.developers.meethue.com/philips-hue-api
*/

// Variable Definitions
var on = '{"on": true, "transistiontime": 1}',
	off = '{"on": false, "transistiontime": 1}',
	orange = '{"on": true,"bri": 248,"hue": 5594,"sat": 252, "transistiontime": 1}',
	red = '{"on": true,"bri": 254,"hue": 65527,"sat": 253, "transistiontime": 1}',
	white = '{"on": true,"bri": 254,"hue": 34106,"sat": 254, "transistiontime": 1}',
	breathe = '{"alert": "lselect", "transistiontime": 6}',
	numberOfLights = 4,
	response;

var buttonList = ['on-switch', 'off-switch', 'white', 'red', 'breathe', 'play', 'stop'];



function init () {
	getInfo(null, buildUI);
}

/* 
*	@function
*	@description				Builds the UI by reading the lighting configuration
*	@author						Daniel Meola
*/
function buildUI (response) {
	$.each(response, function(index){
		$('#light-container .row').append('<div class="col-lg-3" id= "light-'+index+'">');
		$('#light-container .row #light-'+index).append('<h2>'+response[index].name+'</h2>');
		$('#light-container .row #light-'+index).append(createButtons(index));
		$('#light-container .row').append('</div>');
	});

	initTriggers();				//now that DOM has been created, triggers can be added
}

/* 
*	@function
*	@description				Creates buttons for the UI
*	@author						Daniel Meola
*/
function createButtons(lightId) {
	var html = '';
	$.each(buttonList, function(index, value){
		html += '<p><a class="btn btn-default '+ value +'" data-light="'+lightId+'" href="#">'+ value +' &raquo;</a></p>';
	});
	
	return html;
}

function initTriggers () {
	// Defining various triggers
	$('a').on("click", function(e){
		e.preventDefault();
	});

	$('.on-switch').on("click", function() {
		sendCommand($(this).attr("data-light"), on);
	});

	$('.off-switch').on("click", function() {
		sendCommand($(this).attr("data-light"), off);
	});

	$('.white').on("click", function() {
		sendCommand($(this).attr("data-light"), white);
	});

	$('.red').on("click", function() {
		sendCommand($(this).attr("data-light"), red);
	});

	$('.breathe').on("click", function() {
		sendCommand($(this).attr("data-light"), breathe);
	});

	$('.play').on("click", function() {
		play($(this).attr("data-light"));
	});

	$('.stop').on("click", function() {
		$(this).stop();
	});
}

/* 
*	@function					
*	@description				Returns the PUT URL for a light
*	@param {integer} lightId	The id of the light for which you want a URL
*	@author						Daniel Meola
*/
function putURL(lightId){
	if(lightId == "all"){					//finish this
		return 'http://10.0.1.2/api/newdeveloper/lights/'+lightId+'/state';
	}
	else {
		return 'http://10.0.1.2/api/newdeveloper/lights/'+lightId+'/state';
	}
}

/* 
*	@function					
*	@description				Returns the GET URL for a light
*	@param {integer} lightId	The id of the light for which you want a URL
*	@author						Daniel Meola
*/
function getURL(lightId){
	url = 'http://10.0.1.2/api/newdeveloper/lights/';
	if (lightId) {
		url = url + lightId;
	}
	return url;
}

/* 
*	@function					
*	@description				Applies settings for a given light
*	@param {integer} lightId	The id of the light for which you want to apply settings
*	@param {JSON} settings		The settings that you wish to apply
*	@author						Daniel Meola
*/
function sendCommand(lightId, settings){
	$.ajax({
		type: 'PUT',
		url: putURL(lightId),
		data: settings,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data){}
	}); 
}

/* 
*	@function					
*	@description				Returns the settings for a given light, or all lights if no lightId provided
*	@param {integer} lightId	(optional) The id of the light for which you want information
*	@author						Daniel Meola
*/
function getInfo(lightId, callback){
	$.ajax({
		type: 'GET',
		url: getURL(lightId),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(responseText){
			if(callback){ callback(responseText)}
		}
	});
}

//will run indefinitely until stop() is finished
function play(lightId){
	for(var counter=1; counter<=numberOfLights; counter++){
		intervalId = setInterval(function(){sendCommand(lightId, breathe)},1000);
	}
}

//finish this
function stop() {
	clearInterval(intervalId);
}

init();