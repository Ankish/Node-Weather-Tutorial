
const request = require('request');

const geocode = (address,  callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYW5raXNoeSIsImEiOiJjanhvY21wdGQwNWpzM25wNGFxMGY1am92In0.7-gdalPItJk8DEBCQ4lD4Q"

    request({url , json: true},(error,{body : data}) => {

        if (error) {
            callback("unable to connect", undefined);
            return
        }

        if (data.features.length === 0){
            callback("No Items found", undefined);
            return
        }
        const latitude = data.features[0].center[1];
        const longitude = data.features[0].center[0];

        callback(undefined, {
            latitude,
            longitude,
            location: data.features[0].place_name
        });
    })
}

module.exports = geocode ;