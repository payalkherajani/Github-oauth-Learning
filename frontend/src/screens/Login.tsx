import React, { useEffect, useState } from 'react';
import GithubIcon from "mdi-react/GithubIcon";
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {

    let query = useQuery();
    const navigate = useNavigate();

    const [data, setData] = useState({
        isUserLoggedIn: false,
        errorMessage: '',
        status: 'Initial'
    });

    const loginUserFromBackend = async (code: string) => {

        const response = await axios.post('http://localhost:5000/authenticate', {
            'code': code
        });

        if (response.status === 200) {
            const { data } = response;
            const accessToken = data.token.split("access_token=")[1].split("&scope")[0];
            console.log(accessToken, "33");
            localStorage.setItem('token', accessToken);
            //need to set dispatch
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
        <div>
            <a
                className="login-link"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
                onClick={() => setData({ ...data, status: 'In-Process' })}
            >
                <GithubIcon />
                <span>Login with GitHub</span>
            </a>
        </div>
    );
};

export default Login;
