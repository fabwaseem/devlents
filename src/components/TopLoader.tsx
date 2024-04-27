"use client";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const TopLoader = () => {
  const { theme } = useTheme();
  return (
    <NextTopLoader
      zIndex={999999999999999}
      color={theme === "dark" ? "#ffffff" : "#000000"}
    />
  );
};

export default TopLoader;
