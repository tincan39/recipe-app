import React, { useState } from 'react';
import Nav from './Nav';
import axios from 'axios';


function Register(props) {

    const [username, setUsername] = useState('');
    const [pwd1, setPwd1] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [error, setError] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        if (pwd1 !== pwd2) {
            setError("Passwords don't match")
            setIsErr(true);
        }
        else {
            const user = {
                username,
                password: pwd1
            };

            axios.post('/register', user)
                .then(res => props.history.push("/login")).catch(err => {
                    setError(err.response.data.message);
                    setIsErr(true);
                })
        }

    }

    return (
        <div>
            <Nav />
            <div className="container">
                <div className="row" style={{ marginTop: "10%" }}>

                    <form onSubmit={onSubmit} className="col-6 mx-auto user-form ">
                        <h2 style={{ textAlign: "center" }}>Register</h2>
                        <div className="form-group">
                            <label htmlFor="userName">Username</label>
                            <input onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="userName" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd1">Password</label>
                            <input onChange={(e) => { setPwd1(e.target.value) }} className="form-control" id="pwd1" type="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd2">Confirm Password</label>
                            <input onChange={(e) => { setPwd2(e.target.value) }} className="form-control" id="pwd2" type="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
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

export default Register;