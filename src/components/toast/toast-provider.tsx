"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {children}
    </>
  );
}
