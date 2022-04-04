import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Game() {
  useEffect(() => {
    axios.get("/api/getSong").then((res) => {
      setSong(res.data);
      setLoaded(true);
    });
    //setRound(localStorage.getItem("round"));
    console.log(localStorage.getItem("round"));
  }, []);
  const ref = useRef(null);
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState(["", "", "", "", ""]);
  const [loaded, setLoaded] = useState(false);

  const onPlay = () => {
    setPlaying(true);
    //console.log(rounds[round]);
    setTimeout(() => {
      setPlaying(false);
      console.log("pause");
      ref.current.seekTo(0);
      console.log(ref.current);
    }, rounds[round]);
  };

  const onGuess = () => {
    if (input.toUpperCase === song?.name.toUpperCase()) console.log("win!");
    setGuesses((guesses) => {
      const copy = [...guesses];
      copy[round] = input;
      return copy;
    });
    setRound((prev) => {
      prev++;
      //localStorage.setItem("round", round);
      return prev;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onGuess();
    }
  }

  console.log("g", guesses);
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
      <Grid
        sx={(theme) => ({
          padding: theme.spacing(4),
          width: "600px",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
        })}
        container
        direction="column"
        alignItems="center"
        alignContent="center"
      >
        {guesses.map((guess, i) => (
          <Grid
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.light,
              color: "white",
              padding: theme.spacing(1),
              marginBottom: theme.spacing(1),
              minHeight: "40px",
              borderRadius: "5px",
              width: "100%",
            })}
            xs={12}
            key={`guess-${i}`}
          >
            {guess}
          </Grid>
        ))}
        <IconButton disabled={!loaded} onClick={() => onPlay()}>
          <PlayArrowIcon />
        </IconButton>
        {/* {<Button onClick={() => setRound(0)}>Reset</Button>} */}
        {song && (
          <ReactPlayer
            ref={ref}
            height={0}
            url={song.link}
            playing={playing}
            controls
          />
        )}
        <OutlinedInput
          sx={{ width: "100%" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Grid>
    </Container>
  );
}

const rounds = [1000, 2000, 4000, 8000, 16000];
