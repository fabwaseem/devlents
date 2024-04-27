"use client"
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";

const ToastProvider = () => {
  const { theme } = useTheme();
  return <ToastContainer theme={theme} position="bottom-center" />;
};

export default ToastProvider;
