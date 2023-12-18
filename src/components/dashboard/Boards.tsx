import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Background, Board } from "../../interface";
const AddBoard = React.lazy(() => import("./AddBoard"));
interface BoardsProps {
    props: Board[];
    backgrounds: Background[];
    search: boolean;
}

const Boards: React.FC<BoardsProps> = React.memo(({ props, backgrounds, search }) => {
    const navigate = useNavigate();
    const [dataReceived, setDataReceived] = useState<Board[]>(props);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setDataReceived([...props]);
    }, [props]);

    const handleCardClick = useCallback((item_id: string) => {
        navigate(`/board/kanban/${item_id}`);
    }, [navigate]);

    const toggleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="boards">
            <div className="list-cards">
                <div className="card btn add-board" onClick={toggle}>
                    <p>Tạo bảng mới</p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <AddBoard trigger={isOpen} close={toggleClose} backgrounds={backgrounds} />
                    {dataReceived && dataReceived.length > 0 ?
                        (dataReceived.map((item: Board) => (
                            <div key={item.id} className="card btn" onClick={() => handleCardClick(item.id)}>
                                <div className="card-item">
                                    <h4>{item.name}</h4>
                                    <div className="item-background" style={{ 'backgroundImage': `url(${item.background}&q=80&w=400)`, 'backgroundPosition': "center", 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat' }}></div>
                                </div>
                            </div>
                        ))) :
                        (search && <div className="not-found-boards">Không thể tìm thấy bảng mà bạn cần tìm...</div>)
                    }
                </Suspense>
            </div>
        </div>
    );
});

export default Boards;
