const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamV1Y2FzdWxvIiwiYSI6ImNqdGV0N2k5NzFsdnAzeXMwMTF3bGt2bmIifQ.fU1acXs-RIAFfrZdpAb6Lw&limit=1'

    // request({ url, json: true }, (error, {body}) => {
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode