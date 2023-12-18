import React from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URL_API, backgroundList } from '../../utils';

const AddColumn = () => {
    const { boardID } = useParams<{ boardID?: string }>();

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        addNewColumn();
    };

    function getRandom() {
        const randomId = Math.floor(Math.random() * backgroundList.length);
        return backgroundList[randomId];
    }

    const addNewColumn = async () => {
        try {
            const response = await axios.post(`${URL_API}/status/add`, {
                board_id: boardID,
                background: getRandom()
            });
            console.log('Column added successfully:', response.data);
        } catch (error) {
            console.error('Error adding column:', error);
        }
    }
    return (
        <div className="add-column btn" onClick={handleSubmit}>
            <div className="add-column-inner">
                <svg
                    width='16px'
                    height='16px'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    stroke='rgb(230, 230, 230)'
                >
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                        <path
                            d='M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z'
                            fill='rgb(230, 230, 230)'
                        ></path>
                    </g>
                </svg>
                <p>Thêm danh sách khác</p>
            </div>
        </div>
    )
}

export default AddColumn;