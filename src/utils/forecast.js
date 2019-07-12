const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/679fdd693f0700d168490b2cad2a00c6/' + latitude + ',' + longitude + "?units=ca&lang=pt"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
            
            const fs = require('fs');
            fs.writeFileSync('teste.json', '{"teste":"testando123Funcionou"}');
        }
    })
}

module.exports = forecast