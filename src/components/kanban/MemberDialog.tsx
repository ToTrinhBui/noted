import React, { useState, useEffect } from 'react';
import { Task, Member } from '../../interface';
import MemberTask from './MemberTask';
import Avatar from 'react-avatar';
interface CardProps {
    members: Member[],
    item: Task;
}
const MemberDialog: React.FC<CardProps> = ({ members, item }) => {
    const [isOpen, setOpen] = useState(false);
    let listMembersTask: string[] = []
    listMembersTask = item.members_task?.split(', ') || [];

    const toggle = () => {
        setOpen((prev) => !prev);
    };

    const toggleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (isOpen) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (item.members_task?.length === 0) {
            setOpen(false)
        }
    }, [item.members_task])

    if (item.members_task?.length > 0) {
        return (
            <div>
                <h5>Thành viên</h5>
                <div className='list-members'>
                    {members.map((member, index) => (
                        Array.isArray(listMembersTask) && listMembersTask.includes(member.user_id) ?
                            //     <div className='member-outer' key={index}>
                            //         <div className='member-icon' style={{ padding: '0px' }}>
                            //             <p>{member.email.charAt(0).toUpperCase()}</p>
                            //             <div className='member' style={{ background: member.color }}></div>
                            //         </div>
                            //     </div>
                            <Avatar name={member.email} size={'35'} round="40px" key={index}/>
                            : <div key={index}></div>
                    ))}
                    <div className='member-outer'>
                        <div className='member-icon btn' onClick={toggle} style={{ padding: '0px' }}>
                            <svg width='14px' height='14px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#778899'> <g id='SVGRepo_bgCarrier' strokeWidth='0'></g> <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g><g id='SVGRepo_iconCarrier'><path d='M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z' fill='#778899' ></path></g></svg>
                            <div className='member' style={{ background: "#091e4224", border: "none" }}></div>
                        </div>
                    </div>
                </div>
                <MemberTask trigger={isOpen} close={toggleClose} members={members} item={item} />
            </div>
        )
    }
    return <></>
}

export default MemberDialog