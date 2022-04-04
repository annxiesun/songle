const { stringify } = require('querystring');

export default function handler(req, res) {
  const proto =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";
  const host = req.headers.host;
  const url = proto+"://"+host;

  res.redirect('https://accounts.spotify.com/authorize?' +
  stringify({
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: `${url}/api/callback`,
    scope: 'user-top-read',
  }));
}



//AQBqeLkZJkx8sdrl-ZK1a4Ueb1o7KOk6rf25gAFD8GWYwpphUsiLyIjNIVekeCMqhGUytmKFkEP7NhKpy_CILRa-53fgmmGhQsD60IF-V07VXa1QmVLdVqo6CRAHC44rrDxwknMYOmkcfO_sgYungXcEvrLaGr91NMRTOe4LknrjiQ