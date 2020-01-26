const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const findConnections = require('../websocket');
const sendMessage = require('../websocket');

module.exports = {

    async index(request, response) {
        let devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        let { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            let apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            let { name = login, avatar_url, bio } = apiResponse.data;

            let techsArray = parseStringAsArray(techs);

            let location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            console.log(typeof findConnections)
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }

    /*
    update, delete
    */
};