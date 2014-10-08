/* Hue Control Panel
*	@author 				Daniel Meola
*	@description 			Defines triggers and actions for the Hue control panel
*							http://www.developers.meethue.com/philips-hue-api
*/
var on = '{"on": true, "transistiontime": 1}',
	off = '{"on": false, "transistiontime": 1}',
	orange = '{"on": true,"bri": 248,"hue": 5594,"sat": 252, "transistiontime": 1}';
	red = '{"on": true,"bri": 254,"hue": 65527,"sat": 253, "transistiontime": 1}';
	white = '{"on": true,"bri": 254,"hue": 34106,"sat": 254, "transistiontime": 1}';
	breathe = '{"alert": "lselect", "transistiontime": 6}';
	numberOfLights = 4;

//Defining various triggers
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

/* 
*	@function
*	@description				Returns the PUT URL for a light
*	@param {integer} lightId	The id of the light for which you want a URL
*	@author						Daniel Meola	
*/
function putURL(lightId){
	if(lightId == "all"){					//finish this
		return 'http://10.0.1.2/api/newdeveloper/lights/'+lightId+'/state'
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
	return 'http://10.0.1.2/api/newdeveloper/lights/'+lightId
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
*	@description				Returns the settings for a given light
*	@param {integer} lightId	The id of the light for which you want information
*	@author						Daniel Meola	
*/
function getInfo(lightId){
	$.ajax({
		type: 'GET',
		url: getURL(lightId),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data){}
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