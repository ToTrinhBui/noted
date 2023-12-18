import React from 'react';
import { Member, Task } from '../../interface';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';
import { URL_API } from '../../utils';
interface CardProps {
    trigger: boolean,
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    members: Member[],
    item: Task;
}

const MemberTask: React.FC<CardProps> = ({ trigger, close, members, item }) => {
    const { boardID } = useParams<{ boardID?: string }>();
    let listMembersTask: string[] = []
    listMembersTask = item.members_task?.split(', ') || [];

    const editTask = async (members_task: string) => {
        try {
            const response = await axios.put(`${URL_API}/task/edit`, {
                board_id: boardID,
                task: {
                    id: item.id,
                    name: item.name,
                    deadline: item.deadline,
                    dsach_id: item.dsach_id,
                    bang_id: boardID,
                    members_task: members_task,
                    done: item.done,
                    description: item.description,
                    label: item.label,
                }
            })
            const editedTask = response.data;
            console.log('Task updated successfully:', editedTask);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const isMember = (userId: string) => {
        listMembersTask.push(userId)
        let string_members: string = '';
        listMembersTask.forEach(member => string_members += member + ', ');
        editTask(string_members.substring(0, string_members.length - 2));
    };

    const notIsMember = (userId: string) => {
        const newListMembers = listMembersTask.filter(memberId => memberId !== userId);
        let string_members: string = '';
        newListMembers.forEach(member => {
            let addString = member + ', '
            string_members += addString
        });
        editTask(string_members.substring(0, string_members.length - 2));
    }

    if (trigger) {
        return (
            <div className='overlay'>
                <div className='card-box'>
                    <div className='title-card'>
                        <h4 style={{ width: '90%', textAlign: 'center' }}>Thành viên</h4>
                        <div className='close-card btn' onClick={close}>
                            <svg
                                height="12px"
                                style={{ fill: '#868686' }}
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
                    <div className='card-content'>
                        <h5>Thành viên của bảng</h5>
                        {members.map((member, index) => (
                            item.members_task && item.members_task?.split(', ').includes(member.user_id) ?
                                <div className='members btn' key={index} onClick={() => notIsMember(member.user_id)}>
                                    <div className='member-outer'>
                                        <Avatar name={member.email} size={'35'} round="40px" />
                                        <p>{member.email}</p>
                                        <div className='right' style={{ paddingRight: '5px' }}>
                                            <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#44546f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='members btn' key={index} onClick={() => isMember(member.user_id)}>
                                    <div className='member-outer'>
                                        <Avatar name={member.email} size={'35'} round="40px" />
                                        <p>{member.email}</p>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return <></>;
}

export default MemberTask;