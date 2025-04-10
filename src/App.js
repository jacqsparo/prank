import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [realButtonPos, setRealButtonPos] = useState({ top: "50%", left: "50%" });
  const [showMessage, setShowMessage] = useState(false);

  const moveRealButton = () => {
    const top = Math.random() * 80 + "%";
    const left = Math.random() * 80 + "%";
    setRealButtonPos({ top, left });
  };

  const handleFakeClick = () => {
    setShowMessage(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const realBtn = document.getElementById("real-button");
      if (realBtn) {
        const rect = realBtn.getBoundingClientRect();
        const buffer = 80; // distance in px to trigger move
        const isNear =
          Math.abs(e.clientX - rect.left) < buffer &&
          Math.abs(e.clientY - rect.top) < buffer;
        if (isNear) moveRealButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-pink-100 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-10">What type of Korean are you?</h1>

      <motion.button
        id="real-button"
        className="absolute px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        style={{ top: realButtonPos.top, left: realButtonPos.left }}
        onMouseEnter={moveRealButton}
      >
        Real
      </motion.button>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={handleFakeClick}
      >
        Fake
      </button>

      {showMessage && (
        <div className="mt-10 text-xl text-green-700 font-semibold">
          Finally, you admit it 😏
        </div>
      )}
    </div>
  );
}
