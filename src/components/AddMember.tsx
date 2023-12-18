import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { Member } from '../interface';
import RemoveMember from './RemoveMember';
import Avatar from 'react-avatar';
import { URL_API } from "../utils";
interface AddMemberProps {
    members: Member[],
    owner: string,
    memberFilter: Member[],
}

const AddMember: React.FC<AddMemberProps> = ({ members, owner, memberFilter }) => {
    const { boardID } = useParams<{ boardID?: string }>();
    const [open, setOpen] = useState(false);
    const user_redux = useSelector(selectUser).user;
    const [searchInput, setSearchInput] = useState<string>('');
    const [listSearch, setListSearch] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<Member>({
        user_id: '',
        email: '',
    });

    useEffect(() => {
        if (searchInput.length > 0) {
            search(searchInput);
        }
    }, [searchInput]);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(false);
    };

    const handleItemSelect = (id: string, email: string) => {
        setSelectedItem({
            user_id: id,
            email: email,
        });
        setSearchInput(email);
        setListSearch([]);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        const messages = document.getElementsByClassName('copied');
        Array.from(messages).forEach(message => {
            const messageElement = message as HTMLElement;
            messageElement.style.visibility = 'visible';
            setTimeout(() => {
                messageElement.style.visibility = 'hidden';
            }, 2000);
        });
    };

    const addMember = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedItem?.email.length > 0 && searchInput === selectedItem?.email) {
            const newMembers: Member[] = members;
            newMembers.push(selectedItem);
            const listMemberId = newMembers.map(member => ({ user_id: member.user_id }));
            let string_members: string = '';
            listMemberId.forEach(member => string_members += member.user_id + ', ');
            updateMembers(string_members.substring(0, string_members.length - 2));
        } else {
            alert('Cant share!')
        }
    }

    const deleteMember = (id: string) => {
        const newMembers: Member[] = members.filter(member => member.user_id !== id);
        const listMemberId = newMembers.map(member => ({ user_id: member.user_id }));
        let string_members: string = '';
        listMemberId.forEach(member => string_members += member.user_id + ', ');
        updateMembers(string_members.substring(0, string_members.length - 2));
    }

    const updateMembers = async (memberboards: string) => {
        try {
            const response = await axios.put(`${URL_API}/board/member/update`, {
                board_id: boardID,
                members: memberboards,
            });
            setSearchInput('');
            const addedMember = response.data;
            console.log('Task added successfully:', addedMember);

        } catch (error) {
            console.error('Error adding:', error);
        }
    }

    const search = async (email: string) => {
        try {
            const response = await axios.get(`${URL_API}/users/email?email=${email}`);
            const membersUserIds = members.map((member) => member.user_id);
            membersUserIds.push(owner);
            const filteredList = response.data.filter((user: any) => !membersUserIds.includes(user.id));
            setListSearch(filteredList);
            console.log(filteredList)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='add-member'>
            <button className='change-mode' onClick={handleClickToOpen}>
                <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" fill="currentColor"></path><path d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z" fill="currentColor"></path></svg>
                <p>Chia sẻ</p>
            </button>
            <Dialog onClose={handleToClose} open={open} className='dialog'>
                <div className='dialog-container add-mem' style={{ width: '550px' }}>
                    <div className='title-box'>
                        <h3>Chia sẻ bảng</h3>
                        <div className='close btn' onClick={handleToClose}>
                            <svg height="20px" style={{ fill: 'rgb(105, 105, 105)' }} id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                            </svg>
                        </div>
                    </div>
                    <form onSubmit={addMember}>
                        <div className='input-part-long'>
                            <div className="input-dropdown">
                                <input placeholder='Địa chỉ email' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type='text' />
                            </div>
                            <div className='role'>Thành viên</div>
                            <div className='submit'>
                                <button type='submit' style={{ height: '36px' }} >Chia sẻ</button>
                            </div>
                            {searchInput.length > 0 && selectedItem?.email !== searchInput && (
                                <ul className="dropdown-menu">
                                    {listSearch.length > 0 ? (
                                        listSearch.map((item, index) => (
                                            <li key={index} onClick={() => handleItemSelect(item?.user_id, item?.email)}>
                                                {item?.email}
                                            </li>
                                        ))
                                    ) : (
                                        <li>Có vẻ người đó không phải là thành viên của Noted</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </form>
                    <div className='copy-link'>
                        <div className='link-icon'>
                            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="transparent" fillOpacity="0.01"></rect><path d="M12.6539 8.76404C12.4917 8.91817 12.2757 9.00284 12.052 8.99998C11.8282 8.99713 11.6145 8.90698 11.4562 8.74875C11.298 8.59053 11.2078 8.37675 11.205 8.153C11.2021 7.92926 11.2868 7.71325 11.4409 7.55104L12.6549 6.33704C13.0001 5.99183 13.4099 5.71799 13.8609 5.53116C14.3119 5.34433 14.7953 5.24817 15.2834 5.24817C15.7716 5.24817 16.255 5.34433 16.706 5.53116C17.157 5.71799 17.5668 5.99183 17.9119 6.33704C18.2577 6.68195 18.5321 7.09168 18.7193 7.54276C18.9065 7.99385 19.003 8.47743 19.0031 8.96583C19.0031 9.45423 18.9069 9.93785 18.7199 10.389C18.5328 10.8402 18.2586 11.25 17.9129 11.595L16.6989 12.809L15.8949 13.613C15.5498 13.9591 15.1398 14.2338 14.6885 14.4214C14.2371 14.6089 13.7532 14.7057 13.2645 14.7062C12.7757 14.7066 12.2916 14.6108 11.8399 14.4241C11.3882 14.2374 10.9777 13.9635 10.6319 13.618C10.471 13.4571 10.3805 13.2387 10.3805 13.011C10.3805 12.7834 10.471 12.565 10.6319 12.404C10.7929 12.2431 11.0113 12.1526 11.2389 12.1526C11.4666 12.1526 11.685 12.2431 11.8459 12.404C12.6269 13.186 13.8959 13.184 14.6819 12.399L15.4859 11.596L16.6999 10.382C16.8862 10.1963 17.034 9.97569 17.1348 9.73275C17.2356 9.48981 17.2874 9.22935 17.2873 8.96633C17.2873 8.70331 17.2352 8.44289 17.1343 8.20002C17.0333 7.95715 16.8853 7.7366 16.6989 7.55104C16.5132 7.36508 16.2926 7.21757 16.0498 7.11692C15.807 7.01627 15.5468 6.96446 15.2839 6.96446C15.0211 6.96446 14.7609 7.01627 14.5181 7.11692C14.2753 7.21757 14.0547 7.36508 13.8689 7.55104L12.6539 8.76404ZM11.8459 15.236C12.0082 15.0819 12.2242 14.9972 12.4479 15.0001C12.6717 15.0029 12.8854 15.0931 13.0437 15.2513C13.2019 15.4095 13.292 15.6233 13.2949 15.8471C13.2977 16.0708 13.2131 16.2868 13.0589 16.449L11.8449 17.663C11.4998 18.0082 11.09 18.2821 10.639 18.4689C10.188 18.6557 9.70461 18.7519 9.21644 18.7519C8.72827 18.7519 8.24489 18.6557 7.79389 18.4689C7.34288 18.2821 6.9331 18.0082 6.58794 17.663C6.24216 17.3181 5.9678 16.9084 5.78057 16.4573C5.59334 16.0062 5.49692 15.5226 5.49683 15.0342C5.49673 14.5458 5.59297 14.0622 5.78003 13.6111C5.96708 13.1599 6.24129 12.7501 6.58694 12.405L7.80094 11.191L8.60494 10.387C8.95008 10.041 9.36005 9.76628 9.8114 9.57872C10.2627 9.39116 10.7466 9.29438 11.2354 9.29391C11.7242 9.29345 12.2082 9.38931 12.66 9.57601C13.1117 9.76272 13.5221 10.0366 13.8679 10.382C14.0289 10.543 14.1194 10.7614 14.1194 10.989C14.1194 11.2167 14.0289 11.4351 13.8679 11.596C13.707 11.757 13.4886 11.8475 13.2609 11.8475C13.0333 11.8475 12.8149 11.757 12.6539 11.596C12.4674 11.4101 12.2461 11.2627 12.0026 11.1624C11.7591 11.062 11.4983 11.0106 11.2349 11.011C10.9715 11.0115 10.7109 11.0638 10.4677 11.1651C10.2246 11.2663 10.0038 11.4145 9.81794 11.601L9.01394 12.404L7.79994 13.618C7.61366 13.8037 7.46589 14.0244 7.36508 14.2673C7.26428 14.5103 7.21244 14.7707 7.21253 15.0337C7.21263 15.2968 7.26465 15.5572 7.36563 15.8001C7.4666 16.0429 7.61453 16.2635 7.80094 16.449C7.98669 16.635 8.20726 16.7825 8.45006 16.8832C8.69286 16.9838 8.95311 17.0356 9.21594 17.0356C9.47877 17.0356 9.73903 16.9838 9.98182 16.8832C10.2246 16.7825 10.4452 16.635 10.6309 16.449L11.8459 15.236Z" fill="currentColor"></path></svg>
                        </div>
                        <div className='link btn' onClick={handleCopyLink}>Sao chép liên kết</div>
                        <h6 className='copied'>Copied!</h6>
                    </div>
                    <div className='list-users-board'>
                        <div className='user-in4'>
                            <div className='user-email'>
                                <div className="avatar" style={{ height: '35px', width: '35px' }}>
                                    <svg fill="#61ae74" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="796 796 200 200" enableBackground="new 796 796 200 200" stroke="#61ae74"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path> </g></svg>
                                </div>
                                <p>{user_redux.email}</p>
                            </div>
                            {owner === user_redux.id ?
                                <div className='user-role'>
                                    <p>Quản trị viên</p>
                                </div> :
                                <RemoveMember id={user_redux.id} onDelete={deleteMember} />
                            }
                        </div>
                        {memberFilter.map((member, index) => (
                            <div key={member.user_id} className='user-in4'>
                                <div className='user-email'>
                                    {/* <div className='member-outer'>
                                        <p>{member.email.charAt(0).toUpperCase()}</p>
                                        <div className='member' style={{ background: member.color }}></div>
                                    </div> */}
                                    <Avatar name={member.email} size={'35'} round="50px" />
                                    <p>{member.email}</p>
                                </div>
                                {owner === member.user_id ?
                                    <div className='user-role'>
                                        <p>Quản trị viên</p>
                                    </div> :
                                    <RemoveMember id={member.user_id} onDelete={deleteMember} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddMember;