import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
interface CardProps {
    title: string,
    type: string,
    onDelete: Function,
    closeDropdown: () => void;
}
const DeleteLayout: React.FC<CardProps> = ({ title, onDelete, type, closeDropdown }) => {
    const [open, setOpen] = useState(false);

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
        onDelete();
        setOpen(false);
        closeDropdown();
    };
    
    return (
        <div>
            <div className='option-part btn' onClick={handleClickToOpen}>Xóa</div>
            <Dialog onClose={handleToClose} open={open} className='dialog'>
                <div className='dialog-container' style={{ width: '300px' }}>
                    <h4 style={{ textAlign: 'center', paddingBottom: '20px' }}>Bạn có chắc muốn xóa <span style={{color: '#7878cd', textDecoration: 'underline'}}>{type} {title}</span> này hay không ?</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='submit'>
                            <button style={{ backgroundColor: '#f72e2e' }} type='submit'>Xóa</button>
                            <div className='close btn' onClick={handleToClose}>
                                <svg
                                    height="20px"
                                    style={{ fill: 'rgb(105, 105, 105)' }}
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog >
        </div>
    )
}

export default DeleteLayout