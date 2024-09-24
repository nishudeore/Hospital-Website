import express from "express";
import bodyParser from "body-parser";
//import connection from './db.js'; // Correctly import the default export from db.js

const app = express();
const port = 3001;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// GET route for home
app.get("/", (req, res) => {
  res.render("index");
});

// GET route for login page
app.get("/login", (req, res) => {
  res.render("login");
});

// GET route for sign-up page
app.get('/sign_up', (req, res) => {
  res.render("sign_up");
});

// POST route for handling login form submission
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // Placeholder logic for validating the user
      if (username && password) {
        // Redirect to form after login
        res.redirect("/form");
    } else {
        res.send("Invalid login credentials. Please try again.");
    }
});

app.post('/sign_up', (req, res) => {
  const { fullname, username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.send('Passwords do not match');
  }
  res.redirect('/login');

  // SQL query to insert user data
  const query = 'INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)';

  // Execute the query
  /*connection.query(query, [fullname, username, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.send('Error saving user data. Please try again.');


    // Redirect to the login page after successful signup
    res.redirect('/login');
  });*/
});

// GET route for 'view patient details' page
app.get("/view-patient-details", (req, res) => {
  const username = req.query.username;
  res.send(`User details: ${username}`);
});

app.get("/form", (req, res) => {
  res.render("form");
});

// Server listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
