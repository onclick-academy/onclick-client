import styles from "./page.module.css";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  console.log(user);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Ahmed was here</p>
      </div>

      <div className={styles.center}>
        <div className={styles.logo} />
      </div>
    </main>
  );
}
