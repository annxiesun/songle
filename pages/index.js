import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    axios.get('/api/getSong').then((res) => {
      setSong(res.data);
    })
  },[])

  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(0);

  const onPlay = () => {
    setPlaying(true);
    console.log(rounds[round]);
    setTimeout(() => {
      setPlaying(false);
      console.log('pause');
    }, rounds[round]);
    setRound(prev => {prev++; return prev;});
  }

  return (
    <div className={styles.container}>
      <Link href="/api/auth">Login</Link>
      <div>{round}</div>
      <button onClick={() => onPlay()}>Play</button>
      {song && <ReactPlayer height={0} url={song.link} playing={playing} controls />}
    </div>
  )
}

const rounds = [1000, 2000,4000,8000,16000];