var Axios = require("axios");
var express = require("express");
var router = express.Router({ mergeParams: true });
var fs = require("fs");
var https = require("https");

const got = require("got");
const { pipeline } = require("stream");

router.get("/", function (req, res, next) {
    Axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=BD5A8854ECF7DC113CA3243511D7BA29&steamids=${req.params.user_id}`)
  .then(function (response) {
    // handle success
    
    res.send(response.data.response.players[0])
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    
  });




module.exports = router;