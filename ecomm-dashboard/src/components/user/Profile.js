import React, {useEffect, useState} from 'react';
import Header from "../includes/Header";
import {withRouter} from 'react-router-dom'

const Profile = (props) => {

    const [data, setData] = useState([])
    useEffect(async () => {
        let result = await fetch('http://127.0.0.1:8000/api/user-profile/'+props.match.params.id)
        result = await result.json()
        setData(result)
    },[])

    return (
        <div>
            <Header />
            <h1>Welcome {data.name}</h1>
            <h2>Email: {data.email}</h2>
        </div>
    );
};

export default withRouter(Profile);
