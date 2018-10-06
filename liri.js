require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv.slice(3).join(" ");
var request = require("request");
var moment = require("moment");
var fs = require("fs");

switch (action) {
	case "concert-this":
		concertThis(input);
		break;

	case "spotify-this-song":
		if (input) {
			spotifyThisSong(input);
		} else {
			spotifyThisSong("The Sign, Ace of Base");
		}
		break;

	case "movie-this":
		if (input) {
			movieThis(input);
		} else {
			movieThis("Mr. Nobody");
		}
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;
}

//CREATE MORE CHECKS FOR ERRORS IF NEEDED//
function concertThis(input) {
	var divider = "\n---------------------------------------------------\n\n";
	var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
	request(bandsUrl, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var venueInfo = JSON.parse(body);
			for (i = 0; i < venueInfo.length; i++) {
				var output = [
					"Name of Venue: " + venueInfo[i].venue.name,
					"Venue Location: " + venueInfo[i].venue.city + " " + venueInfo[i].venue.region + " " + venueInfo[i].venue.country,
					"Date of event: " + moment(venueInfo[i].datetime).format("MM/DD/YYYY")
				].join("\n\n");

				console.log(output + divider);
				logData(output + divider);
			}

		} else {
			return console.log("Error: " + error);
		}
	});
}

//DO I NEED A LOOP? - Keeping for now if want to increase limit later//
function spotifyThisSong(input) {
	var divider = "\n---------------------------------------------------\n\n";
	spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var songInfo = data.tracks.items
		for (var i = 0; i < songInfo.length; i++) {
			var output = [
				"Artist(s): " + songInfo[i].album.artists[i].name,
				"Song Name: " + songInfo[i].name,
				"Preview URL: " + songInfo[i].preview_url,
				"Album Name: " + songInfo[i].album.name,
			].join("\n\n");
			console.log(output + divider);
			logData(output + divider);
		}
	});
}

function movieThis(input) {
	var divider = "\n---------------------------------------------------\n\n";
	var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=de79b866";
	request(movieUrl, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var movieInfo = JSON.parse(body);
			var output = [
			"Movie Title: " + movieInfo.Title,
			"Release Year: " + movieInfo.Year,
			"IMDB Rating: " + movieInfo.imdbRating,
			"Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value,
			"Language: " + movieInfo.Language,
			"Plot: " + movieInfo.Plot,
			"Actors: " + movieInfo.Actors,
		].join("\n\n");
			console.log(output + divider);
			logData(output + divider);
		} else {
			return console.log("Error: " + error);
		}
	});
}

//SET UP FOR OTHER FUNCTIONS TO RUN DEPENDING ON ACTION
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		var dataArray = data.split(",");
		action = dataArray[0];
		input = dataArray[1];
		console.log(action + " " + input);
		if (action === "concert-this") {
			concertThis(input);
		}
		if (action === "spotify-this-song") {
			spotifyThisSong(input);
		}
		if (action === "movie-this") {
			movieThis(input);
		}
	});
}

//BONUS KEEP A LOG//
function logData(output) {
	fs.appendFile("log.txt", output, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log("Content Added!");
	});
}
