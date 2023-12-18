import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { backgroundList } from "../../utils";
interface CardProps {
    title: string,
    background: string,
    update: Function,
    closeDropdown: () => void;
}

const UpdateDetailColumn: React.FC<CardProps> = ({ title, background, update, closeDropdown }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>(title);
    const [backgroundChoose, setBackgroundChoose] = useState<string>(background);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(false);
        closeDropdown();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        update(name, backgroundChoose)
        setOpen(false);
        closeDropdown();
    };

    const updateBackground = (element: string) => {
        setBackgroundChoose(element);
    }

    return (
        <div>
            <div className='option-part btn' onClick={handleClickToOpen}>Sửa đổi</div>
            <Dialog onClose={handleToClose} open={open} className='dialog'>
                <div className='dialog-container' style={{ width: '300px' }}>
                    <div className="detail-column">
                        <h4>Cập nhập</h4>
                        <form onSubmit={handleSubmit}>
                            <div className='input-part'>
                                <label>Tên:</label>
                                <input
                                    placeholder='Nhập tiêu đề...'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="input-part">
                                <label>Màu nền:</label>
                                <div className='list-backgrounds'>
                                    {backgroundList.map((element, index) => (
                                        backgroundChoose === element ? (
                                            <div className='option btn' key={index} style={{ 'backgroundColor': `${element}` }}>
                                                <div className='choose'>
                                                    <svg height='20px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='option btn' key={index} onClick={() => updateBackground(element)} style={{ 'backgroundColor': `${element}` }}></div>
                                        )
                                    ))}
                                </div>
                            </div>
                            <div className='submit'>
                                <button type='submit'>Thêm</button>
                                <div className='close btn' onClick={handleToClose}>
                                    <svg height="20px" style={{ fill: 'rgb(105, 105, 105)' }} id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                                    </svg>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog >
        </div>
    )
}

export default UpdateDetailColumn