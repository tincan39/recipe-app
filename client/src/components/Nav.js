import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



function Nav(props) {

    return (
        <nav className="nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link style={{ position: "absolute", left: "90%" }} className="nav-link left-items" to="/login">Login</Link>
            <Link style={{ position: "absolute", left: "95%" }} className="nav-link left-items" to="/register">Register</Link>

        </nav>
    )
}



export function Nav2(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const logout = () => {
        localStorage.removeItem('user');
        axios.get('/logout').then((res) => props.history.push('/login'))
    }

    return (
        <nav className="nav">
            <Link className="nav-link" to={() => !user ? '' : `/${user.username}/home`}>Home</Link>
            <Link onClick={logout} style={{ position: "absolute", left: "95%" }} className="nav-link left-items" to="/login">Logout</Link>
        </nav>
    )
}

export default Nav;