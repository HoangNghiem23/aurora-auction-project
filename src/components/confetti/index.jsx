import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ShowFirework = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {showConfetti && (
        <Confetti
          style={{
            width: "100vw",
            height: "100vh",
          }}
        />
      )}
    </div>
  );
};

export default ShowFirework;
