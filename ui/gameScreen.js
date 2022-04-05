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
import { Typography, Fade, LinearProgress } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";

import Image from "next/image";
import Check from "@mui/icons-material/Check";

export default function GameScreen({
  song,
  playing,
  loaded,
  setPlaying,
  playerRef,
  setDone,
  done,
  time,
  progress,
  setProgress,
  round,
  setRound,
}) {
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState(["", "", "", "", ""]);
  const [correct, setCorrect] = useState(null);

  useEffect(() => {
    //setRound(localStorage.getItem("round"));
    console.log(localStorage.getItem("round"));
  }, []);

  const onPlay = () => {
    setPlaying(true);
    setProgress(0, "fraction");
    playerRef.current.seekTo(0);
    setTimeout(() => {
      setPlaying(false);
      setTimeout(() => setProgress(100, "fraction"), 400);
      //playerRef.current.seekTo(rounds[round]/1000, 'seconds');
    }, rounds[round]);
  };

  const onGuess = () => {
    console.log(
      input,
      song?.name,
      input.toUpperCase() === song?.name.toUpperCase()
    );
    if (input.toUpperCase() === song?.name.toUpperCase()) {
      console.log("win!");
      setCorrect(round);
      setDone(true);
    }
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
    if (round === 4) setDone(true);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onGuess();
    }
  };

  return (
    <Grid
      sx={(theme) => ({
        padding: theme.spacing(4),
        width: "600px",
        minHeight: "100vh",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      })}
      container
      direction="column"
      alignItems="center"
      alignContent="center"
      justifyContent="space-around"
    >
      <Grid marginBottom={3}>
        <Image src="/logo.svg" alt="Spotifyible" width={300} height={61.67} />
      </Grid>
      <Grid container>
        {guesses.map((guess, i) => (
          <Grid
            container
            sx={(theme) => ({
              backgroundColor: `${
                !(correct === i)
                  ? theme.palette.primary.light
                  : theme.palette.secondary.main
              }`,
              color: "white",
              padding: theme.spacing(1),
              marginBottom: theme.spacing(1),
              minHeight: "40px",
              borderRadius: "5px",
              width: "100%",
            })}
            xs={12}
            key={`guess-${i}`}
            direction="row"
            justifyContent="space-between"
          >
            <Fade timeout={1500} in={guesses[i] !== ""}>
              <Typography>{guess}</Typography>
            </Fade>
            {correct === i && <Check />}
          </Grid>
        ))}
      </Grid>
      <IconButton disabled={!loaded || done} onClick={() => onPlay()}>
        <PlayArrowIcon />
      </IconButton>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "100%", transition: "none" }}
      />
      {/* {<Button onClick={() => setRound(0)}>Reset</Button>} */}
      <Grid container direction="column" justifyContent="flex-start">
        <Typography>Your Guess</Typography>
        <OutlinedInput
          sx={{ width: "100%" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={"Enter your guess!"}
          disabled={done}
        />
      </Grid>
    </Grid>
  );
}

const rounds = [1000, 2000, 4000, 8000, 16000];
