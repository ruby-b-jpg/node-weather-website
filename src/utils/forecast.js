const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=cb2e7b78e669a93dc8ad5ae369993ab1&query=" +
        latitude +
        "," +
        longitude;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (body.error) {
            callback("Unable to find weather at this location.", undefined);
        } else {
            const {
                temperature: currentTemperature,
                feelslike: currentFeelsLike,
                weather_descriptions: weatherDescription,
            } = body.current;
            const weatherString =
                weatherDescription[0] +
                ". It is currently " +
                currentTemperature +
                " degrees out. It feels like " +
                currentFeelsLike +
                " degrees out.";
            callback(undefined, weatherString);
        }
    });
};

module.exports = forecast;
