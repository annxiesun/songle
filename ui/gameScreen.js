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
import { Typography, Fade } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function GameScreen({song, loaded, setPlaying, playerRef, setDone}) {

  const [round, setRound] = useState(0);
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState(["", "", "", "", ""]);

  useEffect(() => {
    //setRound(localStorage.getItem("round"));
    console.log(localStorage.getItem("round"));
  }, []);

  const onPlay = () => {
    setPlaying(true);
    setTimeout(() => {
      setPlaying(false);
      playerRef.current.seekTo(0);
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
    if (round === 5) setDone(true);
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
            <Fade timeout={1500} in={guesses[i] !== ""}>
              <Typography>{guess}</Typography>
            </Fade>
          </Grid>
        ))}
        <IconButton disabled={!loaded} onClick={() => onPlay()}>
          <PlayArrowIcon />
        </IconButton>
        {/* {<Button onClick={() => setRound(0)}>Reset</Button>} */}
        <Grid container direction="column" justifyContent="flex-start">
          <Typography>Your Guess</Typography>
          <OutlinedInput
            sx={{ width: "100%" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Enter your guess!"}
          />
        </Grid>
      </Grid>
  );
}

const rounds = [1000, 2000, 4000, 8000, 16000];
