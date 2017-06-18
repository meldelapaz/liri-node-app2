//VARIABLES
var keysjs 	= require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var command = process.argv[2];
var userType = '';


//COMMANDS (switch statements)

switch(command) {
    case "my-tweets":
        twitterfun();
    break;

    case "this-movie":
    	omdbfun();
    break;

    // case "spotify-this-song":
    // 	spotifyfun();
    // break;

    //default:
    	//console.log("Please enter a command")
}


//FUNCTIONS

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
	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	  }
	});

}


function spotify() {
	
	var spotify = new Spotify({
	  id: <your spotify client id>,
	  secret: <your spotify client secret>
	});
	 
	spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(data); 
	});

}


