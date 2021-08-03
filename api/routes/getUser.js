var Axios = require("axios");
var express = require("express");
var router = express.Router({ mergeParams: true });
var fs = require("fs");
var https = require("https");

const got = require("got");
const { pipeline } = require("stream");

router.get("/", function (req, res, next) {
  
  const dataStream = got.stream(
    "https://ns548971.ip-66-70-179.net:80/tfe-rest-api/v1/player-stats/single",
    {searchParams: {steamid: `${req.params.user_id}`}}
  );

  pipeline(dataStream, res, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
});

module.exports = router;
