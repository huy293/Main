const express = require('express');
const session = require('express-session');
const app = express();
const configViewEngine = require('./src/config/viewEngine')
const webRouter = require('./src/routes/web')
const apiRouter = require('./src/routes/api');
const connection = require('./src/config/database')
var bodyParser = require('body-parser')

require('dotenv').config();


const port = process.env.PORT || 2000;
const hostname = process.env.HOST_NAME;

app.use(session({
    secret: 'keep it secret, keep it safe.',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 3600000, // Thời gian sống 1 giờ (đơn vị là millisecond)
        httpOnly: true,
        path: '/'
    }
}));

// config template
configViewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// route
app.use('/', webRouter);
app.use('/api', apiRouter);

connection();

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})