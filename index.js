// Gary Lutwen
// Oregon State University
// CS290	HW5
// 18 May 2021


var express = require('express');

var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('port', 1969);



// ADDED THIS FUNCTION TO BOILERPLATE CODE FROM G HEALEY VIDEO
// SO I CAN AVOID SOME REDUNDANCY IN MY GET AND POST ROUTES

const getQueryParameters = (req, res, next) => 
	{
  		res.locals.queryData = req.query;
  		next();
	};


// NOW WE ACTUALLY GRAB ALL OF THE PARAMETERS FROM THE QUERY STRING
// AND WE CAN USE THEM IN THE GET AND POST ROUTES

app.use(getQueryParameters);



// GET ROUTE TAKES THE PARAMETERS FROM THE QUERY STRING AND STORES THEM
// IN A STACK DATA STRUCTURE VIA .PUSH, AND THEN WE RENDER THE DATA
// USING THE masterHTML.handlebars FILE IN MY VIEWS FOLDER

app.get('/', function(req, res){

	
	console.log(res.locals.queryData);
	
	var urlGetParameters = [];

	for (var i in res.locals.queryData)
	{
		urlGetParameters.push({'name':i, 'value':res.locals.queryData[i]});
	}	

	var context = {};
	context.urlList = urlGetParameters;
	context.type = 'GET';
	res.render('masterHTML', context);

	
});



// POST ROUTE TAKES THE PARAMETERS FROM THE QUERY STRING AND STORES THEM
// IN A STACK DATA STRUCTURE VIA .PUSH, AND THEN WE RENDER THE DATA
// USING THE masterHTML.handlebars FILE IN MY VIEWS FOLDER.  WE ALSO HAVE
// THE OPTION OF TAKING PARAMETERS FROM THE BODY AS WELL.  THEY ARE
// DIFFERENTIATED BY USING CONTEXT2.URLLIST AND CONTEXT2BODYLIST.
// MY masterHTML.handlebars FILE ALLOWS FOR A POST REQUEST THAT HAS QUERY
// PARAMETERS, BODY PARAMETERS, OR BOTH.


app.post('/', function(req, res){
	
	console.log(res.locals.queryData);


	var urlPostParameters = [];

	for (var j in res.locals.queryData)
	{
		urlPostParameters.push({'name':j, 'value':res.locals.queryData[j]});
	}
	
	var context2 = {};
	context2.urlList = urlPostParameters;


	var bodyParameters = [];

	for (var k in req.body)
	{
		bodyParameters.push({'name':k, 'value':req.body[k]});
	}

	context2.bodyList = bodyParameters;


	context2.type = 'POST';
	res.render('masterHTML', context2);

});



// THESE NEXT TWO ROUTES ARE THE BOILERPLATE CODE FOR THE ERROR ROUTES THAT WE
// WERE PERMITTED TO COPY FROM THE LECTURE.

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found: ');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});


// we need an event prevent default here...

app.listen(app.get('port'), function(){
  console.log('Express started for Gary Lutwen on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});