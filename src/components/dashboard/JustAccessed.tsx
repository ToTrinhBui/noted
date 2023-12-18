import React, { useState, useEffect, useCallback } from 'react'
import { Board } from '../../interface'
import { selectUser } from '../../redux/userSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { URL_API } from '../../utils'
import { useNavigate } from "react-router-dom";

const JustAccessed = () => {
    const board_accessed = useSelector(selectUser).justAccessed;
    const [data, setData] = useState<Board>()
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    const handleCardClick = useCallback((item_id: string) => {
        if (item_id && item_id.length > 0) {
            navigate(`/board/kanban/${item_id}`);
        }
    }, [navigate]);

    async function fetchData() {
        try {
            const response = await axios.get(`${URL_API}/boards/${board_accessed}`);
            setData(response.data.boards);
        } catch (error) {
            console.error(error);
        }
    }

    if (board_accessed && data)
        return (
            <div className='boards' style={{margin: '0px'}}>
                <h3 style={{marginBottom: '22px'}}>Vừa truy cập:</h3>
                <div className="card btn" onClick={() => handleCardClick(data?.id || '')}>
                    <div className="card-item">
                        <h4>{data?.name || 'Name board'}</h4>
                        <div className="item-background" style={{ 'backgroundImage': `url(${data?.background}&q=80&w=400)`, 'backgroundPosition': "center", 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat' }}></div>
                    </div>
                </div>
                <h3 style={{marginTop: '32px'}}>Danh sách bảng của bạn:</h3>
            </div>
        )
    return <></>
}

export default JustAccessed;