const axios = require("axios")

async function getWeather({ location }) {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=27533a4379cc8ed71831a8f4922ef430`)
        return data
    } catch (error) {
        console.log(error)
        return error.message
    }

}

module.exports = getWeather;