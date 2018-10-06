# liri-node-app

## Trilogy Boot-Camp Assignment 10

### Objective: 
Build a Language Interpretation and Recognition Interface (LIRI) that will be a command line node app that takes in parameters and gives back data.

#### Instructions: 
Using node in the command line, enter one of the following commands to request the available information.

1. "concert-this" 
	* Name of the Venue
	* Venue Location
	* Date of the Event

![Alt text](./images/concert-this.png?raw=true "Concert-This Example")

2. "spotify-this-song"
	If no song is entered, LIRI will default to "The Sign" by Ace of Base.
	* Artist(s)
	* The Song's Name
	* Spotify's Preview Link
	* The Album that the song is from

![Alt text](./images/spotify-this-song.png?raw=true "Spotify-This-Song Example")

3. "movie-this"
	If no movie is entered, LIRI will default to Mr. Nobody.
	* Title of the movie.
	* Year the movie came out.
	* IMDB Rating of the movie.
	* Rotten Tomatoes Rating of the movie.
	* Country where the movie was produced.
	* Language of the movie.
	* Plot of the movie.
	* Actors in the movie.

![Alt text](./images/movie-this.png?raw=true "Movie-This Example")

4. "do-what-it-says"
	LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

![Alt text](./images/do-what-it-says.png?raw=true "Do-What-It-Says Example")

Using the fs Node Package the successful data output for each comand will be appended to a log.txt file

### Technologies Used:
Javascript, Node.js, Node-Spotify-API, Requests wit OMDB API & Bands in Town API, Moment.js, & DotEnv

### Built Using:
Visual Code

### Authors:
Carolyn Michael