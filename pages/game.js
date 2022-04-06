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
        router.push({ pathname: "/api/auth" });
      }
    });
  }, []);

  useEffect(() => {
    if (auth) {
      if (!localStorage.getItem("song")) {
        axios
          .get("/api/getSong")
          .then((res) => {
            localStorage.setItem("song", JSON.stringify(res.data));
            setSong(res.data);
          })
          .catch((e) => {
            console.log("Not logged in");
          });
      } else {
        setSong(JSON.parse(localStorage.getItem("song")))
      }
    }
  }, [auth]);

  const ref = useRef(null);

  const [song, setSong] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (done) {
      setTimeout(() => {
        setShowEnd(true);
        setPlaying(false);
      }, 3000);
    }
  }, [done]);

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
      {!showEnd ? (
        <GameScreen
          song={song}
          loaded={loaded}
          setPlaying={setPlaying}
          playerRef={ref}
          done={done}
          setDone={setDone}
          setWin={setWin}
          playing={playing}
          progress={progress}
          setProgress={setProgress}
          round={round}
          setRound={setRound}
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
          onReady={() => setLoaded(true)}
          ref={ref}
          height={0}
          width={0}
          url={song.link}
          playing={playing}
          progressInterval={300}
          onProgress={() => {
            setProgress(
              (ref.current.getCurrentTime() / rounds[round]) * 100000
            );
            console.log("l", progress);
          }}
          controls
        />
      )}
    </Container>
  );
}

const rounds = [1000, 2000, 4000, 8000, 16000];
