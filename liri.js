//VARIABLES---------------------------------
var keysjs 	= require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var command = process.argv[2];
var userSearch = process.argv[3];
var fs = require('fs');


//INQUIRER -------------- currently isn't working the way I want it to

// inquirer.prompt([
  
//   {
//     type: "confirm",
//     message: "Would you like to begin?",
//     name: "confirm",
//     default: true
//   }
//COMMANDS (switch statements)-------------------

//]).then(function(user) {

// if (user.confirm) {

	switch(command) {
	    case "my-tweets":
	        twitterfun();
	    break;

	    case "this-movie":
	    	if (userSearch === undefined){
	    		userSearch = "The Grinch"
	    	} else {
	    	omdbfun();
	    	}
	    break;

	    case "spotify-this-song":
	    	if (userSearch === undefined){
	    		userSearch = "The Sign"
	    	} else {
	    	spotifyfun();
	    	}
	    break;

	    case "do-what-it-says":
	    	doWhatItSays();
	    break;

	    case "random-joke":
	    	funnyjoke();
	    break;

	    default:
	    	console.log("Please use one of the following commands: my-tweets, this-movie, spotify-this-song, do-what-it-says")
	} 

// } else {
// 	console.log("suit yourself...try again when you're ready")

// }
//});


//FUNCTIONS ---------------------------------------

function twitterfun() {
		 
	var client = new Twitter(
	  keysjs.twitterKeys
	);
	 //console.log(client);
	var params = {screen_name: 'lirinode2'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  // if (error) {
	  // 	//console.log(error);
	  // 	throw error;
	  // }
	  // console.log(response);
	  if (!error) {
	    //console.log(tweets);
	  }
	  for (var i = 0; i<tweets.length; i++) {
	  	console.log(tweets[i].text)
	  }
	});
}

function omdbfun() {

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    //console.log(JSON.parse(body))
	    console.log("Movie Title: " + JSON.parse(body).Title);
	    console.log("Movie Year: " + JSON.parse(body).Year);
	    console.log("Rated: " + JSON.parse(body).Rated);
	    console.log("imbd Rating: " + JSON.parse(body).imdbRating);
	    console.log("Produced in: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Movie Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	    //a TypeError occurs when there is no rotten tomatoes value for the search
	    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);

	  }
	});

}


function spotifyfun(userSearch) {

	var spotify = new Spotify(
	  keysjs.spotifyKeys
	);
	 
	spotify.search({ type: 'track', query: userSearch, limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	
	for (var i = 0; i<data.tracks.items.length; i++) {
		//console.log(data.tracks.items[0])
		var songData = data.tracks.items[0]
	  	console.log('Song Name: ' + songData.name)
	  	console.log('Artist(s): ' + songData.album.artists[0].name)
	  	console.log('Song URL: ' + songData.external_urls.spotify)
	  	console.log('Album Name: ' + songData.album.name)
	}

	//console.log(data.tracks.items[i])
	//console.log(data.tracks.items[0]); 
	});
}

function doWhatItSays() {

	// This block of code will read from the "movies.txt" file.
	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {
	//fs.readFile('/etc/passwd', (err, data) => {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

	  // We will then print the contents of data
	  console.log(data);

	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  // We will then re-display the content as an array for later use.
	  //console.log(dataArr);
	  spotifyfun(dataArr[1]);

	});
}

function funnyjoke() {
	var oneLinerJoke = require('one-liner-joke');
 
	/*
	The variable getRandomJoke will contain a random joke with a format:
	{"body":"Artificial intelligence is no match for natural stupidity.","tags":["intelligence","stupid"]}
	*/
	var getRandomJoke = oneLinerJoke.getRandomJoke().body;
	console.log(getRandomJoke);
}






