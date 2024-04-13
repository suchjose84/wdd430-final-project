// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express(); // Create an instance of express

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

/****************ROUTES HERE*************/

// Serve static files from the 'dist/wdd430-final-project/browser' directory
app.use(express.static(path.join(__dirname, 'dist/wdd430-final-project/browser')));

app.use('/', require('./server/routes/index'));

// Handle non-defined routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/wdd430-final-project/browser/index.html'));
});


// Define port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Database connection
const db = require('./server/models');
db.mongoose.connect(db.url)
  .then(() => console.log('Connected to the database'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Terminate the application on database connection error
  });
