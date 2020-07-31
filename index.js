require('dotenv').config();
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const routes = require('./network/routes');
const PORT = process.env.PORT;

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs'
}));

app.use(express.static('public'));
routes(app);

app.listen(PORT, () => console.log(`app listening on http://localhost:${PORT}`));