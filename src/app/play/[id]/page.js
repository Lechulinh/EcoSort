"use client";

import Image from "next/image";
import data from "../../../assets/data.json";
import { useState, useEffect } from "react";
import Modal from "react-modal"; // Thêm dòng này
import ResultModal from './ResultModal'; // Thêm dòng import cho ResultModal

export default function Home({ params }) {
    const lv = data.find((lv) => Number(lv.level) === Number(params.id));

    // State to track selected answer for each trash bin
    const [selectedTrash, setSelectedTrash] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // State cho modal
    const [isCorrect, setIsCorrect] = useState(null); // State cho kết quả

    // Function to handle click event for trash bins
    const handleTrashClick = (trash) => {
        const isCorrectAnswer = trash === lv.answer;
        setSelectedTrash((prevState) => ({
            // ...prevState,
            [trash]: isCorrectAnswer ? "correct" : "incorrect",
        }));

        setIsCorrect(isCorrectAnswer); // Cập nhật trạng thái kết quả
        setIsModalOpen(true); // Mở modal
    };

    // Thiết lập phần tử gốc cho modal
    useEffect(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement("body"); // Thay đổi ở đây nếu cần
        }
    }, []);

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

            {/* Hiển thị modal khi có kết quả */}
            <ResultModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                isCorrect={isCorrect} 
                onRetry={() => {
                    setIsCorrect(null);
                    setSelectedTrash({});
                    setIsModalOpen(false);
                }} 
                onNextLevel={() => {
                    const nextLevel = Number(params.id) + 1;
                    if (nextLevel <= 75) {
                        window.location.href = `/play/${nextLevel}`;
                    } else {
                        alert("Bạn đã hoàn thành tất cả các cấp độ!");
                    }
                }}                
                onMenu={() => {
                    window.location.href = "/menu";
                }}                
            />
        </main>
    );
}