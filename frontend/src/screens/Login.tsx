import React, { useEffect, useState } from 'react';
import GithubIcon from "mdi-react/GithubIcon";
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import { useAppContext } from '../context/Context';
import { LOGIN_SUCCESS } from '../constants/Constants';
import { Navigate } from 'react-router-dom';
import { SERVER_URL } from '../config';


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {

    let query = useQuery();
    const { state, dispatch } = useAppContext();
    const navigate = useNavigate();


    const [data, setData] = useState({
        isUserLoggedIn: false,
        errorMessage: '',
        status: 'Initial'
    });

    const loginUserFromBackend = async (code: string) => {

        const response = await axios.post(`${SERVER_URL}/authenticate`, {
            'code': code
        });

        if (response.status === 200) {
            const { data } = response;
            const accessToken = data.token.split("access_token=")[1].split("&scope")[0];
            localStorage.setItem('token', accessToken);
            dispatch({ type: LOGIN_SUCCESS });
            navigate('/home');
        }
    };

    useEffect(() => {
        const code = query.get("code");
        if (code) {
            loginUserFromBackend(code);
        }
    }, [data]);


    return (
        localStorage.getItem('token') !== null ? (<Navigate to='/home' />) : (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    minHeight: '80vh'
                }}
            >
                <img src="/assets/github.svg" alt="github-image" style={{ width: '50%', height: '200px' }} />
                <a
                    className="login-link"
                    href={`https://github.com/login/oauth/authorize?scope=repo,user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
                    onClick={() => setData({ ...data, status: 'In-Process' })}
                    style={{ textDecoration: 'none' }}
                >
                    <Button
                        variant="contained"
                        startIcon={<GithubIcon />}
                        sx={{ background: 'black' }}
                    >
                        Login with GitHub
                    </Button>
                </a>

            </Box>
        )

    );
};

export default Login;
