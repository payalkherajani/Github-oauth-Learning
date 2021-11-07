import React, { useEffect, useState } from 'react';
import GithubIcon from "mdi-react/GithubIcon";
import { useLocation } from 'react-router';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {

    let query = useQuery();

    const [data, setData] = useState({
        isUserLoggedIn: false,
        errorMessage: '',
        status: 'Initial'
    });

    const loginUserFromBackend = async () => {

    };

    useEffect(() => {
        const code = query.get("code");
        if (code) {
            loginUserFromBackend();
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
