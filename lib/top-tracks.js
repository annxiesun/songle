import axios from "axios";
import getAccessToken from "./getAcessToken";

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

export const getTopTracks = async (refresh_token) => {
  const access_token = await getAccessToken(refresh_token);
  if (access_token === 0) return 0;
  //console.log(access_token);
  return axios.get(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }).catch((e) => {
    console.log('Not Logged In');
  });
};