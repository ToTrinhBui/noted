import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/index.css";
import "../styles/home.css";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="home">
                <div className="home-inner">
                    <div className="introduce">
                        <h1>Brings all your tasks, teammates, and tools together</h1>
                        <p>Keep everything in the same place-even if your team isn't.</p>
                        <Link to={'/login'}><button>Sign up - it's free!</button></Link>
                    </div>
                    <img alt="introduce" src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=720&fm=webp" />
                </div>
            </div>
        </>
    )
}