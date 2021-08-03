import React from "react";
import Axios from "axios";
import https from "https";

export async function getTop100() {
  return Axios.get(
    "https://ns548971.ip-66-70-179.net:80/tfe-rest-api/v1/player-stats/top100",
    {
      headers: {
        accept: " application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      params: {
        //"stats-type": "official"
      },
    }
  );
}

export async function sortTop100(json) {
    console.log(json, "json");
  return json.data.players.sort(
    (a, b) => parseFloat(b.points) - parseFloat(a.points)
  );
}

var top100 = [];
var top100_descending = [];

export async function ApiTop100Caller() {
  top100 = await getTop100();

  //console.log(top100.data, "top100");

  top100_descending = await sortTop100(top100.data);

  //console.log(top100_descending, "sorted");

  return top100_descending;
}
