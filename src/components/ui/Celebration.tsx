"use client";

import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "./Button";

type CelebrationProps = {
  title: string;
  message: string;
  redirectText?: string;
  redirectTo?: string;
};

const Celebration = ({ title, message, redirectText = "برگشت به خانه", redirectTo = "/" }: CelebrationProps) => {
  const { width, height } = useWindowSize();
  const router = useRouter();

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
      {width && height && <Confetti width={width} height={height} className="absolute top-0 left-0" />}

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="z-50 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold text-green-600">{title}</h1>
        <p className="mb-6 text-lg text-gray-700">{message}</p>
        <Button onClick={() => router.push(redirectTo)}>{redirectText}</Button>
      </motion.div>
    </div>
  );
};

export default Celebration;
