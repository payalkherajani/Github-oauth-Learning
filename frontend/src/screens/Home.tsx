import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { GET_ALL_LOGGED_IN_USER_REPOS, LOGGED_IN_USER_DETAILS, SELECTED_REPO } from '../constants/Constants';
import { useAppContext } from '../context/Context';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Navigate, Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import dateformat from 'dateformat';
import { Box } from '@mui/material';
import { SERVER_URL } from '../config';


export type RepoInfo = {
    name: string;
    created_at: string;
    html_url: string;
    id: number;
    description: string;
};

const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
};

const Home = () => {

    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);

    const loader = useRef(null);

    const { state, dispatch } = useAppContext();

    const getUserInfoFromBackend = async () => {
        const access_token = localStorage.getItem('token');
        const response = await axios.get(`${SERVER_URL}/userinfo/${access_token}`);
        if (response.status === 200) {
            const { data: { userInfo } } = response;
            dispatch({ type: LOGGED_IN_USER_DETAILS, payload: { userDetails: userInfo } });
        }
    };

    useEffect(() => {
        getUserInfoFromBackend();
    }, []);



    const getUserReposFromBackend = async (page: number) => {
        const access_token = localStorage.getItem('token');
        const response = await axios.get(`${SERVER_URL}/allrepos/${access_token}/${page}`);
        if (response.status === 200) {
            const newRepositories = repos.concat(response?.data?.repositories);
            dispatch({ type: GET_ALL_LOGGED_IN_USER_REPOS, payload: { repos: newRepositories } });
        }
    };

    useEffect(() => {
        getUserReposFromBackend(page);
    }, [page]);

    const handleObserver = (entities: any) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1);
        }
    };

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);



    return (

        localStorage.getItem('token') === null ? (
            <Navigate to='/' />
        ) : (

            <div style={containerStyle}>

                <h2 style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>Home </h2>

                <Box>
                    {
                        state.userRepositories.map((onerepo: RepoInfo, index: number) => {

                            return (
                                <Link to={{
                                    pathname: `/repo/${onerepo.name}`,
                                }}
                                    onClick={() => dispatch({ type: SELECTED_REPO, payload: { repoInfo: onerepo } })}
                                    key={onerepo.id}
                                >

                                    <Card
                                        sx={{ minWidth: 275, marginBottom: '1rem', padding: '1rem', backgroundColor: '#FEF2F2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        key={onerepo.id}
                                    >
                                        <img src="/assets/coder.svg" alt="github-image" style={{ width: '50%', height: '200px' }} />
                                        <CardContent sx={{
                                            display: 'flex', flexDirection: 'column'
                                        }}>

                                            <Typography sx={{ marginBottom: '1rem' }}>
                                                <strong style={{ display: 'inline' }}>Name: </strong>
                                                <span>{onerepo.name} </span>
                                            </Typography>

                                            <Typography sx={{ marginBottom: '1rem' }}>
                                                <strong style={{ display: 'inline' }}>Created Date: </strong>
                                                <span>{dateformat(onerepo.created_at, "fullDate")}</span>
                                            </Typography>

                                            <Typography sx={{ marginBottom: '1rem' }}>
                                                <strong style={{ display: 'inline' }}>Github Repo Link: </strong>
                                                <a href={onerepo.html_url} target='_blank'>
                                                    <Button>Open</Button>
                                                </a>
                                            </Typography>

                                        </CardContent>

                                    </Card>
                                </Link>
                            );
                        })
                    }
                </Box>


                <div className="loading" ref={loader}>
                    <h2>Load More</h2>
                </div>

            </div>
        )


    );
};

export default Home;
