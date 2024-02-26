"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetcher } from "@/utilities/fetcher";

type UserT = {
  id: string;
  email: string;
  username: string;
};

const AuthContext = createContext({
  user: null as UserT | null
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserT | null>(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const user = await fetcher({
          url: "/users/userinfo",
          method: "GET",
          body: {}
        });

        const url = "/users/" + user.id;
        const currentUser = await fetcher({
          url,
          method: "GET",
          body: {}
        });
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
