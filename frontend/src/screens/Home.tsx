import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Modal } from '../components';


export type Repo = {
    id: number;
    description: string | null;
    name: string;
    private: boolean;
    visibility: string;
    stargazers_count: number;
    watchers_count: number;
    node_id: string;
};

export type User = {
    public_repos: number;
    total_private_repos: number;
};
const Home = () => {

    const [user, setUser] = useState<User>({
        public_repos: 0,
        total_private_repos: 0
    });
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [showEditModal, setEditModal] = useState(false);
    const [singleSelectedRepoDetails, setSingleSelectedRepoDetails] = useState({});
    const loader = useRef(null);



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

    const getUserReposFromBackend = async (page: number) => {
        const access_token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/allrepos/${access_token}/${page}`);
        if (response.status === 200) {
            const newRepositories = repos.concat(response?.data?.repositories);
            setRepos(newRepositories);
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

    const editRepoInfo = (repoDetails: Repo) => {
        setEditModal(true);
        setSingleSelectedRepoDetails(repoDetails);
    };

    const handleCloseModal = () => {
        setEditModal(false);
    };


    return (
        <div>
            Home
            <div>
                <button onClick={() => localStorage.clear()}>Logout</button>
            </div>
            {
                repos.map((onerepo: Repo, index: number) => {
                    return (
                        <div key={index} style={{ border: '1px solid red' }}>
                            <div>Descriptiion: {onerepo.description}</div>
                            <div>Name: {onerepo.name} </div>
                            <div> Visibility{onerepo.visibility} </div>
                            <div> Stars: {onerepo.stargazers_count}</div>
                            <div> Watchers: {onerepo.watchers_count} </div>
                            <div><button onClick={() => editRepoInfo(onerepo)}>Edit Repo</button></div>
                        </div>
                    );
                })
            }
            {
                repos.length === (user.public_repos) ? (<h2>No more repos to show</h2>) : (
                    <div className="loading" ref={loader}>
                        <h2>Load More</h2>
                    </div>)
            }
            {
                showEditModal && (
                    <Modal
                        closeModalFunction={handleCloseModal}
                        repoInfo={singleSelectedRepoDetails}
                    />
                )
            }
        </div>
    );
};

export default Home;
