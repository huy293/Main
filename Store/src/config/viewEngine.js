const express = require('express')
const configViewEngine = (app) => {
    app.set('views', './src/views');
    app.set('view engine', 'ejs');
    //config static file css/images/js
    app.use('/public', express.static('./src/public/'))
    app.use('/iconify', express.static('./src/iconify/iconify-icon/1.0.7'))
    app.use('/jsdelivr', express.static('./src/jsdelivr/npm'))

}
module.exports = configViewEngine;