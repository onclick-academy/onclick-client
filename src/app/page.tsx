'use client';
import Link from 'next/link';
import styles from './page.module.css';
import getData from '@/utilities/getUserData';
import { useEffect } from 'react';
import { getDeviceToken } from '@/utilities/device';

export default function Home() {
  // const data = await getData();
  // console.log("data", data);
  const fetchDeviceToken = async () => {
    const deviceToken = await getDeviceToken();
    console.log('deviceToken', deviceToken);
    // TODO save the token in DB
  };
  useEffect(() => {
    fetchDeviceToken();
    const eventSource = new EventSource(
      'http://localhost:3000/api/v1/notifications/real-time'
    );
    eventSource.onmessage = function (event) {
      console.log('New message:', JSON.parse(event.data));
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={'/register'}>Register</Link>
      </div>
    </main>
  );
}
