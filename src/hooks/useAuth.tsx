"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetcher } from "@/utilities/fetcher";

type UserT = {
  id: string;
  email: string;
  username: string;
  role: string;
};

export function useAuth() {
  const [user, setUser] = useState<UserT | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userInfo = await fetcher({
          url: "/api/users/userinfo",
          method: "GET",
          body: {}
        });

        if (userInfo.id) {
          const currentUser = await fetcher({
            url: `/api/users/${userInfo.id}`,
            method: "GET",
            body: {}
          });
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
        router.push("/login");
      }
    };

    checkUserLoggedIn();
  }, [router]);

  return { user };
}
