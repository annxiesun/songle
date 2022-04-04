import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios.get("/api/getSong").then((res) => {
      setSong(res.data);
    });
    //setRound(localStorage.getItem("round"));
    console.log(localStorage.getItem("round"));
  }, []);
  const ref = useRef(null);
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [input, setInput] = useState("");

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
    if (input.toUpperCase === song.name.toUpperCase()) console.log("win!");
    setRound((prev) => {
      prev++;
      //localStorage.setItem("round", round);
      return prev;
    });
  };
  return (
    <div className={styles.container}>
      <Link href="/api/auth">Login</Link>
    </div>
  );
}