import React, { useEffect, useState } from "react";
import moment from "moment";

function TimeCountDown({ endDate, status }) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = moment();
      const duration = moment.duration(moment(endDate).diff(now));
      return duration.format("D[d] : HH[h] : mm[m] : ss[s]");
    };

    const updateCountdown = () => {
      setCountdown(calculateCountdown(endDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      {status === "UPCOMING" ? "Start in : " : "Auction time remaining : "}{" "}
      {countdown}
    </div>
  );
}

export default TimeCountDown;
