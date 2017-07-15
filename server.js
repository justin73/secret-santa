// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
// const api = require('./routes/api');
const index = require('./routes/index');
const draw = require('./routes/draw');
const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Body Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/', index);
app.use('/api', draw);
//app.use('/api', api);

// // Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));