import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const NavbarComponent = () => {

    return (
        <nav className="nav nav-dark m-b-0 navbar-fixed-top p-0">
            <h3 className="transform-lowercase"><Link to={{ pathname: '/' }}>Github-Oauth</Link></h3>
            <ul>
                <Link to={{ pathname: '/login' }}>
                    <li className="badge-relative">
                        Login
                    </li>
                </Link>

            </ul>
        </nav>
    );
};

export default NavbarComponent;
