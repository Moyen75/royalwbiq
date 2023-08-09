const getWeather = require('./weather');


const allApis = { getWeather }

async function handleThirdPartyFunction(name, args = {}) {
    if (!allApis[name]) {
        return "This function doesn't exist!"
    }
    return await allApis[name](args)
}

module.exports = handleThirdPartyFunction