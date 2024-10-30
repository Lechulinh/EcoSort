"use client";
import data from "../../assets/data.json";
import { useState, useEffect } from "react";

export default function Home() {

  const levels = 75;
  const initialStatus = Array(levels).fill(false);
  initialStatus[0] = true; // Unlock Level 1 by default

  const [levelStatus, setLevelStatus] = useState(initialStatus);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStatus = JSON.parse(localStorage.getItem("levelStatus"));
      if (storedStatus) {
        setLevelStatus(storedStatus);
      }
    }
  }, []);

  return (
    <main className="menuScreen">
      <a className="homeBtn" href="/"> Quay lại</a>
      <div className="menuLevel">
      <ul>
        {data.map((level) => {
          const isUnlocked = levelStatus[level.level-1];
          // const isUnlocked = true;
          return (
            <div>
            {isUnlocked ? (
              <div className = "level-link">
              <a href={`/play/${level.level}`} className = "lv">
                LV {level.level}
              </a>
              </div>
            ) : (
              <div className="level-locked">LV {level.level}</div>
            )}
            </div>
          );
        })}
      </ul>
      </div>
    </main>
  );
}
