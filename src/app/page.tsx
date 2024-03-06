import Link from "next/link";
import styles from "./page.module.css";
import getData from "@/utilities/getUserData";

export default async function Home() {
  // const data = await getData();
  // console.log("data", data);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={"/registeration"}>Register</Link>
      </div>
      <div className={styles.center}>
        <div className={styles.logo} />
      </div>
    </main>
  );
}
