import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res);
  let refresh_token = cookies.get("refresh_token");
  if (!refresh_token) {
    res.send(false);
  } else {
    res.send(true);
  }
};