const request = require('request')
const chalk = require('chalk')

const geoCode = ({address = 'vadodara, gujarat'}, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZmFsZ3Vuc2hhaCIsImEiOiJjbGQydnBoZ3QwODhiM29vMXB6YXNkZm0yIn0.kEO9hlaPEBP09aoxtezIlQ&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location!', undefined)
        } else {
            callback(undefined, {
                letitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}