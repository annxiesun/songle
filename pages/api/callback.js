import axios from "axios";
const { stringify } = require("querystring");
import Cookies from 'cookies';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const auth_token = Buffer.from(
  `${client_id}:${client_secret}`,
  "utf-8"
).toString("base64");

export default function handler(req, res) {
  let { code } = req.query;
  const cookies = new Cookies(req, res);

  const proto =
  req.headers["x-forwarded-proto"] || req.connection.encrypted
    ? "https"
    : "http";
const host = req.headers.host;
const url = proto+"://"+host;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: `${url}/api/callback`,
      }),
      {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      //console.log(response.data.access_token);
      cookies.set('refresh_token', response.data.refresh_token);
      res.redirect('/game')
      //res.send(code);
    });
}
