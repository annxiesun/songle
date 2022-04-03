const { stringify } = require('querystring');

export default function handler(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
  stringify({
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: 'http://localhost:3000/api/callback',
    scope: 'user-top-read',
  }));
}



//AQBqeLkZJkx8sdrl-ZK1a4Ueb1o7KOk6rf25gAFD8GWYwpphUsiLyIjNIVekeCMqhGUytmKFkEP7NhKpy_CILRa-53fgmmGhQsD60IF-V07VXa1QmVLdVqo6CRAHC44rrDxwknMYOmkcfO_sgYungXcEvrLaGr91NMRTOe4LknrjiQ