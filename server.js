// load the things we need
var express = require('express');
var app = express();

const fs = require('fs');
const csv = require('csv-parser');
const csvWriter = require('csv-write-stream')

const bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');

var sampleFrame = '<iframe src="https://trinket.io/embed/python/6ebe39efb6?outputOnly=true&start=result&showInstructions=true" width="20%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>'

// index page 
app.get('/', function(req, res) {

    res.render('pages/index');

});

app.get('/activity_1', function(req, res) {

    var imgData = []
    fs.createReadStream('data_1.csv')
        .pipe(csv())
        .on('data', (row) => {
            imgData.push(row);
        })
        .on('end', () => {

            res.render('pages/activity_1', {
                imgData: imgData,
            });

        });


});

app.get('/activity_2', function(req, res) {

    var imgData = []
    fs.createReadStream('data_2.csv')
        .pipe(csv())
        .on('data', (row) => {
            imgData.push(row);
        })
        .on('end', () => {

            res.render('pages/activity_2', {
                imgData: imgData,
            });

        });


});

//add API to remove?

app.post('/submitLink_1', function(req, res){
    
    //TODO: need to check if ID exist?
    var cleanURL = req.body.urlName.split('/').pop()
    var writer = csvWriter({sendHeaders: false})
    writer.pipe(fs.createWriteStream('data_1.csv', {flags: 'a'}))
    writer.write({id: cleanURL, user: req.body.userName, time: new Date()})
    writer.end()

    res.redirect('/')
});

app.post('/submitLink_2', function(req, res){
    
    //TODO: need to check if ID exist?
    var cleanURL = req.body.urlName.split('/').pop()
    var writer = csvWriter({sendHeaders: false})
    writer.pipe(fs.createWriteStream('data_2.csv', {flags: 'a'}))
    writer.write({id: cleanURL, user: req.body.userName, time: new Date()})
    writer.end()

    res.redirect('/')
});

app.listen(process.env.PORT || 8080)
