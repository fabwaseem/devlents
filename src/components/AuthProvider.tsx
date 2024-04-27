"use client";
import { SessionProvider, getSession } from "next-auth/react";
import type React from "react";
import { useEffect, useState } from "react";

const AuthProvider = () => {
  const [session, setSession] = useState();
  useEffect(() => {
    const gets = async () => {
      console.log("called");
      const newsession = await getSession();
      console.log(newsession);
      setSession(newsession);
    };
    gets();
  }, []);

  return null;
};

export default AuthProvider;
