const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require('./middleware/logger');
const persons = require('./Person');

const app = express();

// Initialize Middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

// Render Homepage i,e HomePage Route
app.get('/', (req, res) => {
    res.render('index', {
        title: "My Person App",
        persons
    });
})

/* app.get('/', (req, res) => {
    // res.send(`<h1>Hello World!!</h1>`);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */


//Persons API routes
app.use('/api/persons', require('./routes/api/persons'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Express Server is running on port ${PORT}`)
);
