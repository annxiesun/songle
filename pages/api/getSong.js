import { getTopTracks } from "../../lib/top-tracks";
import Cookies from "cookies";

function getRandom(max, songs) {
  const i = Math.floor(Math.random() * max);
  return songs[i];
}

export default async function handler(req, res) {
  const number_songs = 20;
  const cookies = new Cookies(req, res);
  let refresh_token = cookies.get("refresh_token");
  const response = await getTopTracks(refresh_token);
  if (response === 0) return 0;
  const song = getRandom(number_songs, response.data.items);
  /*
  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name
  }));*/

  const googleIt = require("google-it");

  let artists = "";

  song.artists.forEach((artist, i) => {
    artists += artist.name + (i === artists.length - 1 ? ',' : '');
  });

  const options = {
    limit: 3,
    disableConsole: true,
  };

  googleIt({ options, query: `soundcloud ${song.name} ${artists}` })
    .then((results) => {
      return res.send({
        name: song.name,
        artist: artists,
        image: song.album.images[0].url,
        link: results[0].link,
      });
    })
    .catch((e) => {
      // any possible errors that might have occurred (like no Internet connection)
    });
}
