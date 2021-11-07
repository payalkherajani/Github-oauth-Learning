import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/');
        }
    }, []);

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
