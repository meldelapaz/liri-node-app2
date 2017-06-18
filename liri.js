//VARIABLES---------------------------------
var keysjs 	= require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var command = process.argv[2];
var userSearch = '';


//COMMANDS (switch statements)-------------------

switch(command) {
    case "my-tweets":
        twitterfun();
    break;

    case "this-movie":
    	omdbfun();
    break;

    case "spotify-this-song":
    	spotifyfun();
    break;

    //default:
    	//console.log("Please enter a command")
}


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
	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

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
	    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
	  }
	});

}


function spotifyfun(song) {

	var spotify = new Spotify(
	  keysjs.spotifyKeys
	);
	 
	spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
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


