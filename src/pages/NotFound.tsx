import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import "../styles/index.css";
import "../styles/home.css";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="not-found">
                <h1>Không tìm thấy trang</h1>
                <p>Trang này có thể là riêng tư. Bạn có thể xem nó bằng cách <Link to='/login'>đăng nhập</Link>.</p>
            </div>
        </>
    )
}