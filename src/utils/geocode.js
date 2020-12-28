const request = require("request")

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoicnViaWRpdW0tOTYiLCJhIjoiY2tpZnV6ZTMzMjZzMzJ5bnhiaGRuMXpsZyJ9.k1dTCdnpmj8ln1QDVxdwpA&limit=1";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to map service.", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find this location.", undefined);
        } else {
            const { center, place_name: location } = body.features[0]
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location,
            });
        }
    });
};

module.exports = geocode
