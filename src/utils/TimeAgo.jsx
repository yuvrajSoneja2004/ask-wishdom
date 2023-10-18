import React, { useEffect, useState } from "react";

function TimeAgo({ createdAt, tagStyles, endWord }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const postTime = new Date(createdAt);
      const timeDifference = currentTime - postTime;

      if (timeDifference < 60000) {
        // Less than a minute
        setTimeAgo(`${Math.round(timeDifference / 1000)}s`);
      } else if (timeDifference < 3600000) {
        // Less than an hour
        setTimeAgo(`${Math.round(timeDifference / 60000)}m`);
      } else if (timeDifference < 86400000) {
        // Less than a day
        setTimeAgo(`${Math.round(timeDifference / 3600000)}h`);
      } else if (timeDifference < 31536000000) {
        // Less than a year (365 days)
        setTimeAgo(`${Math.round(timeDifference / 86400000)}d`);
      } else {
        // More than a year
        setTimeAgo(`${Math.round(timeDifference / 31536000000)}y`);
      }
    };

    // Update the time every minute
    calculateTimeAgo();
    const intervalId = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <label style={{ ...tagStyles }}>
      {timeAgo}

      {`${" "}${endWord === undefined ? "" : endWord}`}
    </label>
  );
}

export default TimeAgo;
