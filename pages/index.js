import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/refreshToken").then((res) => {
      if (res.data) {
        router.push({pathname: "/game",});
      } else {
        return;
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/api/auth">Login</Link>
    </div>
  );
}