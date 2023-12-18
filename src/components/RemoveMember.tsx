import React, { useState } from 'react';

interface DeleteMemberProps {
    id: string;
    onDelete: (id: string) => void;
}

const RemoveMember: React.FC<DeleteMemberProps> = ({ id, onDelete }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleDropdown = (Id: string) => {
        setOpenId((prevOpenId) => (prevOpenId === Id ? null : Id));
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className='user-role btn' onClick={() => toggleDropdown(id)} >
                <p>Thành viên</p>
            </div>
            {openId === id && (
                <div className='user-delete btn' onMouseLeave={() => toggleDropdown(id)} onClick={()=> onDelete(id)}>Xóa khỏi bảng</div>
            )}
        </div>
    )
};

export default RemoveMember;
