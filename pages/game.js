import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useRouter } from "next/router";

import Container from "@mui/material/Container";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import EndScreen from "../ui/endScreen";
import GameScreen from "../ui/gameScreen";

export default function Game() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get("/api/refreshToken").then((res) => {
      if (res.data) {
        setAuth(true);
      } else {
        router.push({pathname: "/api/auth",});
      }
    });
  }, []);

  useEffect(() => {
    if (auth) {
      axios.get("/api/getSong").then((res) => {
        setSong(res.data);
        setLoaded(true);
      }).catch(e => {
        console.log("Not logged in")
      });
    }
  }, [auth]);

  const ref = useRef(null);

  const [song, setSong] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(false);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignContent: "center",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {!done ? (
        <GameScreen
          song={song}
          loaded={loaded}
          setPlaying={setPlaying}
          playerRef={ref}
          setDone={setDone}
          setWin={setWin}
        />
      ) : (
        <EndScreen
          song={song}
          loaded={loaded}
          setPlaying={setPlaying}
          playerRef={ref}
          win={win}
        />
      )}
      {song && (
        <ReactPlayer
          ref={ref}
          height={0}
          width={0}
          url={song.link}
          playing={playing}
          controls
        />
      )}
    </Container>
  );
}

const rounds = [1000, 2000, 4000, 8000, 16000];
