import { fetcher } from "@/utilities/fetcher";
import styles from "./page.module.css";

type UserT = {
  id: string;
  email: string;
  username: string;
  role: string;
};

async function getData() {
  const userInfo = await fetcher({
    url: "/users/userinfo",
  });

  if (userInfo.id) {
    const currentUser = await fetcher({
      url: `/users/${userInfo.id}`,
    });
    return currentUser;
  }
}
 

export default async function Home() {
  const data = await getData()
  console.log(data);
  

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>was here</p>
      </div>
      <div className={styles.center}>
        <div className={styles.logo} />
      </div>
    </main>
  );
}
