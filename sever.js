require('./models/db');
const express = require('express');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const app = express();
const port = (process.env.port || 3000);

//bodypasrser for viewing in json
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// seting up a view engin using default js path and express-handlebars
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
}));
app.set('view engine', 'hbs');


app.listen(port, () => console.log(`Listen on at http://localhost:${port}`));

app.use('/employee', employeeController);