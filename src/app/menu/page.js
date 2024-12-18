"use client";
import data from "../../assets/data.json";
import { useState, useEffect } from "react";

export default function Home() {

  const levels = 75;
  const initialStatus = Array(levels).fill(false);
  initialStatus[0] = true;
  const [levelStatus, setLevelStatus] = useState(initialStatus);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStatus = JSON.parse(localStorage.getItem("levelStatus"));
      if (storedStatus) {
        setLevelStatus(storedStatus);
      } else {
        localStorage.setItem("levelStatus", JSON.stringify(levelStatus));
      }
    }
  }, []);

  return (
    <main className="menuScreen">
      <div className= "home">
      <a className="homeBtn" href="/"> Quay lại</a>
      </div>
      <div className="menuLevel">
      <ul>
        {data.map((level) => {
          const isUnlocked = levelStatus[level.level-1];
          // const isUnlocked = true;
          return (
            <li key = {level.level}>
            {isUnlocked ? (
              <div className = "level-link">
              <a href={`/play/${level.level}`} className = "lv">
                LV {level.level}
              </a>
              </div>
            ) : (
              <div className="level-locked">LV {level.level}</div>
            )}
            </li>
          );
        })}
      </ul>
      </div>
    </main>
  );
}
