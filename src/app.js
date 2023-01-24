const exp = require('constants')
const { request } = require('express')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000

// Import files
const weatherApi = require('./api-services/weather')
const geoApi = require('./api-services/geo')

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Falgun Shah'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Falgun Shah'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page. Please let us know your queries.',
        name: 'Falgun Shah'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }
    
    geoApi.geoCode(req.query, (error, data) => {
        if(error){
            return res.send({error})
        } 
        weatherApi.forecast(data, (error, data) => {
            if (error) {
                return res.send({error})
            }
            return res.send(data)
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help artical not found',
        name: 'Falgun Shah'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Falgun Shah'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})