import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

interface CardProps {
    trigger: boolean
}
const Logout: React.FC<CardProps> = ({ trigger }) => {
    const user_redux = useSelector(selectUser).user;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useTheme();

    const handleLogout = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(logout());
        navigate('/login');
    };

    if (trigger) {
        return ReactDOM.createPortal(
            <div className='overlay-logout' id={theme}>
                <div className='card-logout'>
                    <div className='title-card'>
                        <h5>TÀI KHOẢN</h5>
                        <div className='user'>
                            <div className="avatar">
                                <svg fill="#61ae74" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="796 796 200 200" enableBackground="new 796 796 200 200" stroke="#61ae74"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path> </g></svg>
                            </div>
                            <div>{user_redux.email}</div>
                        </div>
                    </div>
                    <div className='logout btn' onClick={(event) => handleLogout(event)}>Đăng xuất</div>
                </div>
            </div>,
            document.getElementById('modal-root') as Element
        )
    };
    return <></>;
}

export default Logout;