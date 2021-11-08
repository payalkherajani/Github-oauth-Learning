import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Modal = (props: any) => {

    const { repoInfo } = props;
    console.log(repoInfo, "o");


    const [repoDetails, setRepoDetails] = useState({
        name: repoInfo?.name,
        description: repoInfo?.description
    });

    const { name, description } = repoDetails;

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const access_token = localStorage.getItem('token');
        const repo = repoInfo?.name;
        const owner = repoInfo?.owner?.login;
        const response = await axios.patch(`http://localhost:5000/updaterepo/${access_token}?owner=${owner}&repo=${repo}&name=${name}&description=${description}`);
        if (response.status === 200) {
            console.log(response);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRepoDetails({ ...repoDetails, [name]: value });
    };



    return (
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                value={description}
                name="description"
                onChange={onChangeHandler}
                placeholder="Description"
            />

            <input
                type="text"
                value={name}
                name="name"
                onChange={onChangeHandler}
                placeholder="Name"
            />
            <button type="submit">Update</button>
        </form>
    );
};

export default Modal;
