const request = require('request')

const forecast = ({letitude, longitude}, callback) => {
    const location = letitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=5d86fd240bc202806d273ed74ae7b9a3&query='+location
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find the weather!', undefined)
        } else {
            callback(undefined,{
                location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature + ' degree',
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = {
    forecast: forecast
}