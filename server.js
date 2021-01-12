//Install express server
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/www/'));


app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/www/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('Express app listening on port: 8080');
