// ResultModal.js
import Modal from "react-modal";

const ResultModal = ({ isOpen, onRequestClose, isCorrect, onRetry, onNextLevel, onMenu }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Result Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối mờ
                },
                content: {
                    color: 'black',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    width: '400px',
                    height: '300px',
                    margin: 'auto',
                    top: '55%',
                    left: '35%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            {isCorrect !== null ? (
                isCorrect ? (
                    <>
                        <h2>Hoan hô, đáp án đúng rồi!</h2>
                        <div className="modalBtn" onClick={onRetry}> Chơi lại</div>
                        <div className="modalBtn" onClick={onNextLevel}>Màn kế tiếp</div>
                        <div className="modalBtn" onClick={onMenu}>Quay lại menu chính</div>
                    </>
                ) : (
                    <>
                        <h2>Đáng tiếc, đáp án sai mất rồi!</h2>
                        <div className="modalBtn" onClick={onMenu}>Quay về menu chính</div>
                        <div className="modalBtn" onClick={onRetry}>Chơi lại</div>
                    </>
                )
            ) : (
                <h2>Đang xử lý...</h2> // Hiển thị nội dung tạm thời nếu isCorrect chưa được xác định
            )}
            <div className="modalBtn" onClick={onRequestClose}>Đóng</div>
        </Modal>
    );
};

export default ResultModal;
