import axios from "axios";

const { stringify } = require("querystring");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const auth_token = Buffer.from(
  `${client_id}:${client_secret}`,
  "utf-8"
).toString("base64");

const getAcessToken = async (refresh_token) => {

  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "refresh_token",
        refresh_token
      }),
      {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      //process.env.REFRESH_TOKEN = response.data.refresh_token;
      //console.log(response.data.access_token)
      return response.data.access_token;
    }).catch((e) => {
      console.log("Not Logged In")
      return 0;
    });
}

export default getAcessToken;