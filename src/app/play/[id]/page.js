"use client";

import Image from "next/image";
import data from "../../../assets/data.json";
import { useState } from "react";

export default function Home({ params }) {
  const lv = data.find((lv) => Number(lv.level) === Number(params.id));

  // State to track selected answer for each trash bin
  const [selectedTrash, setSelectedTrash] = useState({});

  // Function to handle click event for trash bins
  const handleTrashClick = (trash) => {
    const isCorrect = trash === lv.answer;
    setSelectedTrash((prevState) => ({
      ...prevState,
      [trash]: isCorrect ? "correct" : "incorrect",
    }));
  };

  if (!lv) {
    return (
      <main className="playScreen">
        <p>Không tìm thấy dữ liệu cho cấp độ này!</p>
        <a className="homeBtn2" href="/menu">Quay lại</a>
      </main>
    );
  }

  return (
    <main className="playScreen">
      <a className="homeBtn2" href="/menu">Quay lại</a>
      <Image
        src={require(`../../../assets/images/objects/${lv.image || "default.png"}`)}
        alt={lv.item}
        width={80}
        height={120}
      />
      <br />
      <div className="trashBtn">
        {lv.trashbin.map((trash) => (
          <div
            key={trash}
            className={`trash ${selectedTrash[trash]}`}
            onClick={() => handleTrashClick(trash)}
          >
            {trash}
          </div>
        ))}
      </div>
    </main>
  );
}
