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
    const _ = async () => {
      const authUser = await getAuthUser();
      console.log(authUser);
    };
    _();
  }, []);

  return (
    <main>
      <div>
        <Link href={'/register'}>Register</Link>
      </div>
    </main>
  );
}
