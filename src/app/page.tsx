import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Ahmed was here
        </p>
      </div>

      <div className={styles.center}>
        <div
          className={styles.logo}
        />
      </div>
    </main>
  );
}
