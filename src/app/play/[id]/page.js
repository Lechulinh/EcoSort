"use client";

import Image from "next/image";
import data from "../../../assets/data.json";
import { useState, useEffect } from "react";
import ResultModal from './ResultModal'; // Thêm dòng import cho ResultModal
import { useRouter } from 'next/navigation';

export default function Home({ params }) {
    const lv = data.find((lv) => Number(lv.level) === Number(params.id));
    const router = useRouter();
    const [selectedTrash, setSelectedTrash] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // State cho modal
    const [isCorrect, setIsCorrect] = useState(false); // State cho kết quả

    // Function to handle click event for trash bins
    const handleTrashClick = (trash) => {
        const isCorrectAnswer = trash === lv.answer;
        setSelectedTrash(() => ({
            // ...prevState,
            [trash]: isCorrectAnswer ? "correct" : "incorrect",
        }));

        setIsCorrect(isCorrectAnswer); // Cập nhật trạng thái kết quả
        setIsModalOpen(true); // Mở modal
    };
    const completeLevel = () => {
        // Access localStorage and levelStatus
        const storedStatus = JSON.parse(localStorage.getItem("levelStatus")) || Array(75);
        const currentLevelIndex = Number(params.id) - 1; // Adjust for 0-based index
        if (currentLevelIndex < storedStatus.length - 1) {
            storedStatus[currentLevelIndex + 1] = true; // Unlock the next level
            localStorage.setItem("levelStatus", JSON.stringify(storedStatus));
        }
    };

    useEffect(() => {
        if (isCorrect) {
            completeLevel(); // Unlock next level when current level is completed
        }
    }, [isCorrect, completeLevel]);


    return (
        <main className="playScreen">
            <div>
                <a className="homeBtn" href="/menu">Quay lại</a>
            </div>
            <div className="imgPlay">
                <Image
                src={require(`../../../assets/images/objects/${lv.image || "default.png"}`)}
                alt={lv.item}
                width={180}
                height={180}
            />
            <br />
            </div>
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
                    setIsCorrect(false);
                    setSelectedTrash({});
                    setIsModalOpen(false);
                }} 
                onNextLevel={() => {
                    const nextLevel = Number(params.id) + 1;
                    if (nextLevel <= data.length) {
                        router.push(`/play/${nextLevel}`); // Điều hướng đến màn kế tiếp
                    } else {
                        alert("Bạn đã hoàn thành tất cả các cấp độ!");
                    }
                }} 
                onMenu={() => {
                    router.push('/menu');
                }} 
            />
        </main>
    );
}