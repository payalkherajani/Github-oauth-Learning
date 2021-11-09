import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../constants/Constants';
import { useAppContext } from '../context/Context';


const NavbarComponent = () => {

    const { state, dispatch } = useAppContext();
    const navigate = useNavigate();
    const { isUserLoggedIn } = state;


    useEffect(() => {
        if (isUserLoggedIn === false) {
            navigate('/');
        }
    }, []);

    const logoutFunction = () => {
        dispatch({ type: LOGOUT });
        localStorage.clear();
    };

    return (
        <nav className="nav nav-dark m-b-0 navbar-fixed-top p-0">
            <h3 className="transform-lowercase"><Link to={{ pathname: '/' }}>Github-Oauth</Link></h3>
            <ul>
                {
                    localStorage.getItem('token') !== null ? (
                        <Link to={{ pathname: '/login' }} onClick={() => logoutFunction()}>
                            <li className="badge-relative">
                                Logout
                            </li>
                        </Link>
                    ) : (
                        <Link to={{ pathname: '/login' }}>
                            <li className="badge-relative">
                                Login
                            </li>
                        </Link>
                    )
                }

            </ul>
        </nav>
    );
};

export default NavbarComponent;
