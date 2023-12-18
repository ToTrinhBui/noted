import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import Theme from "./Theme";
import mainLogo from "../images/logo.png";

export default function NavbarUser({ style = {}, ...props }) {
    const user_redux = useSelector(selectUser).user;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>(window.location.search.slice(1));
    const [themeOpen, setThemeOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen((prev) => !prev);
        setThemeOpen(false);
    };

    const toggleTheme = () => {
        setThemeOpen((prev) => !prev);
        setIsOpen(false);
    }

    const searchForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation()
        navigate(`/search?${input}`);
    }

    return (
        <div className="navbar-user" style={style} {...props}>
            <div className="left">
                <Link to={`/user/${user_redux.id}/boards`}>
                    <div className="logo-outer">
                        <img className="logo" alt="logo" src={mainLogo}/>
                        <h2>Noted</h2>
                    </div>
                </Link>
            </div>
            <div className="right">
                <form onSubmit={searchForm}>
                    <div className="search">
                        <div>
                            <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fillRule="evenodd" clipRule="evenodd" d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"></path></svg>
                        </div>
                        <input placeholder="Tìm kiếm" value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                </form>
                <div className="container btn" onClick={toggleTheme}>
                    <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 20V4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>
                    <div className="circle"></div>
                </div>
                <Theme trigger={themeOpen} />
                <div className="container btn" onClick={toggle}>
                    <div className="avatar">
                        <svg fill="#61ae74" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="796 796 200 200" enableBackground="new 796 796 200 200" stroke="#61ae74"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path> </g></svg>
                    </div>
                    <div className="circle"></div>
                </div>
                <Logout trigger={isOpen} />
            </div>
        </div>
    )
}