import React, {useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../utils';
import DeleteLayout from '../DeleteLayout';
import UpdateDetailColumn from './UpdateDetailColumn';
interface CardProps {
    columnId: string,
    title: string,
    background: string
}
const EditColumn: React.FC<CardProps> = ({ columnId, title, background }) => {
    const { boardID } = useParams<{ boardID?: string }>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleToClose = () => {
        setIsOpen(false);
    };

    const deleteColumn = async () => {
        try {
            const response = await axios.delete(`${URL_API}/status/delete`, {
                data: {
                    board_id: boardID,
                    columnId: columnId,
                }
            });
            const responseData = response.data;
            console.log('deleted successfully:', responseData);
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }

    const updateColumn = async (name: string, background: string) => {
        try {
            const response = await axios.put(`${URL_API}/status/update`, {
                board_id: boardID,
                id: columnId,
                name: name,
                background: background
            });
            const responseData = response.data;
            console.log('renamed successfully:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <div className='more-option'>
            <div className='more-icon btn' onClick={toggle}>
                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="Menu / More_Horizontal"> <g id="Vector"> <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#c7c7c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>  </g></svg>
            </div>
            {isOpen &&
                <div className='more-item'>
                    <UpdateDetailColumn title={title} background={background} update={updateColumn} closeDropdown={handleToClose}/>
                    <DeleteLayout type={'Danh sách'} title={title} onDelete={deleteColumn} closeDropdown={handleToClose}/>
                </div>
            }
        </div>
        </div>
    )
}

export default EditColumn