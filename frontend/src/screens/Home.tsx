import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const getUserInfoFromBackend = async () => {
        const access_token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/userinfo/${access_token}`);
        if (response.status === 200) {
            const { data: { userInfo } } = response;
            setUser(userInfo); // transfer this to global state in reducer and call dispatch
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/');
        } else {
            getUserInfoFromBackend();
        }
    }, []);

    console.log(user, "user");

    return (
        <div>
            Home
            <div>
                <button onClick={() => localStorage.clear()}>Logout</button>
            </div>
        </div>
    );
};

export default Home;
