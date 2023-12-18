import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectUser } from "../redux/userSlice";
import mainLogo from "../images/logo.png";

export default function Navbar() {
    const user_redux = useSelector(selectUser).user;
    const login = useSelector(selectUser).isLoggedIn;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(login);
    }, [login])

    return (
        <div className="navbar">
            <Link to='/'>
                <img className="logo" alt="Logo" src={mainLogo} />
            </Link>
            <ul>
                <li>Features</li>
                <li>Solutions</li>
                <li>Plans</li>
                <li>Pricing</li>
                <li>Resources</li>
            </ul>
            <div className="link-account">
                {isLoggedIn ? (
                    <>
                        <div className="link-to-login">Hello!</div>
                        <Link to={`/user/${user_redux.id}/boards`} className="link-to-sign-up">Go to your Boards</Link>
                    </>
                )
                    : (
                        <>
                            <Link to='/login'><div className="link-to-login">Log in</div></Link>
                            <Link to='/register' className="link-to-sign-up">Get for free</Link>
                        </>
                    )}
            </div>
        </div>
    )
}