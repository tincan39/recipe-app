import React, { useState, useContext } from 'react';
import Nav from './Nav';
import axios from 'axios';
import UserContext from '../contexts/UserContext';




function Login(props) {

    const { setAuth } = useContext(UserContext.context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            password
        }
        axios.post('/login', user).then(res => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setAuth(true);
            props.history.push(`/${res.data.user.username}/home`);
        })
            .catch(err => {
                console.log(err);
                setError("Username or password is invalid");
                setIsErr(true);
            })

    }

    return (
        <div>
            <Nav />
            <div className="container">
                <div className="row" style={{ marginTop: "10%" }}>

                    <form onSubmit={onSubmit} className="col-6 mx-auto user-form ">
                        <h2 style={{ textAlign: "center" }}>Login</h2>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="username" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="pwd" type="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        {isErr && <div>
                            <br />
                            <small className="text-danger err">{error}</small>
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;