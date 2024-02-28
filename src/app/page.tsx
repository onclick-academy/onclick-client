"use client";
import Link from "next/link";
import styles from "./page.module.css";
import getData from "@/utilities/getUserData";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      console.log("data", data);
    }
  },[])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={"/register"}>Register</Link>
      </div>
      <div className={styles.center}>
        <div className={styles.logo} />
      </div>
    </main>
  );
}
