import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import axios from 'axios';
import Avatar from 'react-avatar';
import { URL_API } from "../utils";
import AddMember from './AddMember';
import { Member } from '../interface';
import MoreOption from './MoreOption';
interface HeadingProps {
    members: Member[],
    nameBoard: string;
    ownerBoard: string;
}

const Heading: React.FC<HeadingProps> = ({ members, nameBoard, ownerBoard }) => {
    const { boardID } = useParams<{ boardID?: string }>();
    const user_redux = useSelector(selectUser).user;
    const [name, setName] = useState<string>('Name board');
    const [owner, setOwner] = useState<string>(user_redux.id);
    const [memberFilter, setMemberFilter] = useState<Member[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setMemberFilter(members.filter((member: Member) => member.user_id !== user_redux.id.toString()));
        setName(nameBoard);
        setOwner(ownerBoard);
    }, [members, nameBoard, ownerBoard, user_redux]);

    const deleteBoard = async () => {
        try {
            const response = await axios.delete(`${URL_API}/boards?board_id=${boardID}&user_id=${user_redux.id}`);
            const responseData = response.data;
            console.log('deleted successfully:', responseData);
            navigate(`/user/${user_redux.id}/boards`);
        } catch (error) {
            console.error('Error deleting:', error);
            alert("You aren't allowed to delete this board")
        }
    }

    const renameBoard = async (name: string) => {
        try {
            const response = await axios.put(`${URL_API}/board/rename`, {
                board_id: boardID,
                name: name
            });
            const responseData = response.data;
            console.log('renamed successfully:', responseData);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='heading'>
            <div className='left'>
                <h1>{name}</h1>
                <Link to={`/board/kanban/${boardID}`}>
                    <button className='change-mode'>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"></path></svg>
                        <p>Kanban</p>
                    </button>
                </Link>
                <Link to={`/board/table/${boardID}`}>
                    <button className='change-mode'>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.66683 9.66665C0.93045 9.66665 0.333496 9.06969 0.333496 8.33331V1.66665C0.333496 0.930267 0.93045 0.333313 1.66683 0.333313H12.3335C13.0699 0.333313 13.6668 0.930267 13.6668 1.66665V8.33331C13.6668 9.06969 13.0699 9.66665 12.3335 9.66665H1.66683ZM12.3335 5.66665V4.33331H5.66683V5.66665H12.3335ZM12.3335 2.99998V1.66665H5.66683V2.99998H12.3335ZM12.3335 6.99998V8.33331H5.66683V6.99998H12.3335ZM1.66683 4.33331V5.66665H4.3335V4.33331H1.66683ZM1.66683 6.99998V8.33331H4.3335V6.99998H1.66683ZM1.66683 2.99998V1.66665H4.3335V2.99998H1.66683Z" ></path></svg>
                        <p>Table</p>
                    </button>
                </Link>
                <Link to={`/board/charts/${boardID}`}>
                    <button className='change-mode'>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.1586 10.6697C18.6953 11.6601 19 12.7945 19 14V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V14C5 10.134 8.13401 7 12 7C13.2055 7 14.3398 7.30472 15.3301 7.84134L16.2419 6.92954C16.447 6.72443 16.6856 6.57318 16.9401 6.4758C15.522 5.54283 13.8244 5 12 5C7.02944 5 3 9.02944 3 14V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V14C21 12.1756 20.4571 10.4779 19.5241 9.05977C19.4267 9.31425 19.2755 9.55284 19.0704 9.75796L18.1586 10.6697ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9ZM16.1989 11.2152L12.7071 14.707C12.3166 15.0976 11.6834 15.0976 11.2929 14.707C10.9023 14.3165 10.9023 13.6833 11.2929 13.2928L16.949 7.63667C17.3395 7.24615 17.9727 7.24615 18.3632 7.63667C18.7538 8.0272 18.7538 8.66036 18.3632 9.05089L16.2152 11.1989L16.1989 11.2152ZM18 14C18 14.5523 17.5523 15 17 15C16.4477 15 16 14.5523 16 14C16 13.4477 16.4477 13 17 13C17.5523 13 18 13.4477 18 14ZM7 15C7.55228 15 8 14.5523 8 14C8 13.4477 7.55228 13 7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15ZM9.5 10.5C9.5 11.0523 9.05228 11.5 8.5 11.5C7.94772 11.5 7.5 11.0523 7.5 10.5C7.5 9.94772 7.94772 9.5 8.5 9.5C9.05228 9.5 9.5 9.94772 9.5 10.5Z" fill="currentColor"></path></svg>
                        <p>Biểu đồ</p>
                    </button>
                </Link>
            </div>
            <div className='right'>
                <div className='share'>
                    <div className='members'>
                        {memberFilter.map((member, index) => (
                            <div key={index} style={{ width: '22px' }}>
                                <Avatar name={member.email} size={'28'} round="20px" />
                            </div>
                        ))}
                        <div className="owner">
                            <svg fill="#61ae74" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="796 796 200 200" enableBackground="new 796 796 200 200" stroke="#61ae74"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path> </g></svg>
                        </div>
                    </div>
                    <AddMember members={members} memberFilter={memberFilter} owner={owner} />
                </div>
                <MoreOption type={'Bảng'} title={nameBoard} onDelete={deleteBoard} rename={renameBoard} />
            </div>
        </div >
    )
}

export default Heading;