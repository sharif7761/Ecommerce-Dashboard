import React, {useEffect, useState} from 'react';
import Header from "./includes/Header";
import {useHistory} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const history = useHistory()
    useEffect(() =>{
        if(localStorage.getItem('user-info')) {
            history.push('/add')
        }
    },[])

    async function login() {
        let item = {email, password}
        let result = await fetch('http://127.0.0.1:8000/api/login', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(item)
        })
        result = await result.json()

        if(result['error']) {
            alert('Incorrect Email or Password')
            history.push('/login')
        }
        else {
            localStorage.setItem("user-info", JSON.stringify(result))
            history.push('/add')
        }

    }

    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>User Login</h1>
                <br/>
                <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} className="form-control"/>
                <br/>
                <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                <br/>
                <button onClick={login} className="btn btn-primary">Sign Up</button>
            </div>
        </div>
    );
};

export default Login;
