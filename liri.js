//VARIABLES
var keysjs = require("./keys.js");

var command = process.argv[2];



//FUNCTIONS

function twitter() {
	
	var Twitter = require('twitter');
	 
	var client = new Twitter(
	  keysjs.twitterKeys
	);
	 
	var params = {screen_name: 'lirinode2'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	  	console.log(error);
	  	throw error;
	  }
	  else if (!error) {
	    console.log(tweets);
	  }
	});
}

// function stotify() {
	
// }


//COMMANDS (switch statements)

switch(command) {
    case "my-tweets":
        twitter();
    break;

    default:
    	console.log("Please enter a command")
}