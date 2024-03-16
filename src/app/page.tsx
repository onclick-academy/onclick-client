'use client';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect } from 'react';
import getAuthUser from '@/utilities/getAuthUser';

export default function Home() {
  useEffect(() => {
    const _ = async () => {
      const authUser = await getAuthUser();
      console.log(authUser);
    };
    _();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={'/register'}>Register</Link>
      </div>
      <div className={styles.center}>
        <div className={styles.logo} />
      </div>
    </main>
  );
}
