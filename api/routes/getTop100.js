var Axios = require("axios");
var express = require("express");
var router = express.Router();
var fs = require("fs");
var https = require("https")

const got = require('got');
const { pipeline } = require('stream');


router.get("/", function (req, res, next) {
    const dataStream = got.stream({
        url: 'https://ns548971.ip-66-70-179.net:80/tfe-rest-api/v1/player-stats/top100',
        // qs: {
        //   api_key: '123456',
        //   query: 'World of Warcraft: Legion'
        // }
    });
    
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

module.exports = router;
