import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { useTheme } from '../../theme/ThemeProvider';
import { URL_API } from '../../utils';
import { Background } from '../../interface';
import "../../styles/index.css";
import "../../styles/kanban.css";

interface CardProps {
    trigger: boolean,
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    backgrounds: Background[];
}
const AddBoard: React.FC<CardProps> = React.memo(({ trigger, close, backgrounds }) => {
    const [choose, setChoose] = useState<string>('');
    const user_redux = useSelector(selectUser).user;
    const [name, setName] = useState<string>('');
    const navigate = useNavigate();
    const { theme } = useTheme();

    const getRandom = (): string => {
        let link = "";
        if (backgrounds.length > 0) {
            const randomId = Math.floor(Math.random() * backgrounds.length);
            link = backgrounds[randomId]?.link || '';
        }
        return link;
    };

    useEffect(() => {
        const link = getRandom();
        setChoose(link);
    }, [backgrounds]);

    const addNewBoard = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (name.length < 0) setName('Name board');
        try {
            const response = await axios.post(`${URL_API}/boards`, {
                user_id: user_redux.id,
                name: name,
                background: choose,
                members: [
                    user_redux.id
                ]
            });
            const newBoardId = response.data.id;
            navigate(`/board/kanban/${newBoardId}`);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const chooseBackground = (id: any) => {
        setChoose(backgrounds[id].link);
    }

    if (trigger) {
        return (
            <div className='overlay-add-board' id={theme}>
                <div className='card-add-board'>
                    <div className='title-card'>
                        <h4 style={{ width: '90%', textAlign: 'center' }}>Thêm bảng</h4>
                        <div className='close-card btn' onClick={close}>
                            <svg height="12px" style={{ fill: '#868686' }} id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                            </svg>
                        </div>
                    </div>
                    <div className='card-content'>
                        <div className='demo' style={{ backgroundImage: `url(${choose}&q=80&w=400)` }}>
                            <img alt='assets' src='https://trello.com/assets/14cda5dc635d1f13bc48.svg' />
                        </div>
                        <form onSubmit={addNewBoard}>
                            <h5>Phông nền</h5>
                            <div className='list-backgrounds'>
                                {backgrounds.map((background, index) => (
                                    choose === background.link ? (
                                        <div className='option btn' key={index} style={{ 'backgroundImage': `url(${background.link}&q=80&w=400)` }}>
                                            <div className='choose'>
                                                <svg height='20px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='option btn' key={index} onClick={() => chooseBackground(background.id - 1)} style={{ 'backgroundImage': `url(${background.link}&q=80&w=400)` }}></div>
                                    )
                                ))}
                            </div>
                            <h5>Tiêu đề bảng</h5>
                            <div className='name-board' style={{ display: 'flex' }}>
                                <input placeholder='Hãy nhập tiêu đề' required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <button type='submit'>Tạo mới</button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
    return <></>;
});

export default AddBoard;