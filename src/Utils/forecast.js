const request = require('request');


const forecast = (latitude, longitude , callback) => {
    const url = "https://api.darksky.net/forecast/6e0aa50185ba3d8070163d3b7c5f744a/" + latitude + "," + longitude
    request({url, json : true}, (error, {body}) => {
        if (error) {
            callback("Could not reach",undefined);
            return
        }
        if (body.error) {
            callback("Try another",undefined);
            return
        }
        const {temperature, precipProbability} = body.currently

        callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degress out. There is a ' + precipProbability + '% chance of rain.')
    })
}

module.exports = forecast