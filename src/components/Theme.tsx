import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { useTheme } from '../theme/ThemeProvider';

interface CardProps {
    trigger: boolean
}
const Theme: React.FC<CardProps> = ({ trigger }) => {
    const { theme, setTheme } = useTheme();
    const [isActive, setIsActive] = useState<string>(theme);

    const lightMode = () => {
        setIsActive("light");
        setTheme("light")
    }

    const darkMode = () => {
        setIsActive("dark");
        setTheme("dark")
    }

    if (trigger) {
        return ReactDOM.createPortal(
            <div className='overlay-logout theme' id={theme}>
                <div className='card-box' style={{ transform: 'none', padding: '10px 0px 15px 0px' }}>
                    <div className='title-card'>
                        <h4 style={{ textAlign: 'center' }}>Chủ đề</h4>
                    </div>
                    <div className='card-content' style={{ padding: '0px' }}>
                        <div className='mode btn' id={isActive === 'light' ? 'isActive' : ''} onClick={lightMode}>
                            <div className='tick' id={isActive === 'light' ? 'isActive-btn' : ''}></div>
                            <img alt='light-mode' src='https://trello.com/assets/a3a279edd7e5baaef4f7.svg' />
                            <p>Màu sáng</p>
                        </div>
                        <div className='mode btn' id={isActive === 'dark' ? 'isActive' : ''} onClick={darkMode}>
                            <div className='tick' id={isActive === 'dark' ? 'isActive-btn' : ''}></div>
                            <img alt='dark-mode' src='https://trello.com/assets/cb4097b01b57e5d91727.svg' />
                            <p>Màu tối</p>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root') as Element
        )
    };
    return <></>;
}

export default Theme