require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');
const db_uri = process.env.DB_URI;
const handlebars = require('express-handlebars');
//  ESTO ES INSEGURO POR XSS
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
////////////////////////
const routes = require('./network/routes');
const PORT = process.env.PORT;

db(db_uri);

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
routes(app);

app.listen(PORT, () => console.log(`app listening on http://localhost:${PORT}`));