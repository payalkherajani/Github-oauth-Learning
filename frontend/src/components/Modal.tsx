import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';

const Modal = (props: any) => {

    const { repoInfo, open, handleClose } = props;
    const navigate = useNavigate();



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
            handleClose();
            navigate('/home');
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRepoDetails({ ...repoDetails, [name]: value });
    };


    return (

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Details</DialogTitle>

            <form style={{ padding: '1rem' }}>
                <TextField
                    type="text"
                    value={description}
                    name="description"
                    onChange={onChangeHandler}
                    placeholder="Description"
                    label="Description"
                    fullWidth
                    variant="standard"
                    margin="dense"
                    sx={{ padding: '1rem' }}
                />

                <TextField
                    type="text"
                    value={name}
                    name="name"
                    onChange={onChangeHandler}
                    placeholder="Name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    margin="dense"
                    sx={{ padding: '1rem' }}
                />
            </form>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleOnSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;


{/* <form onSubmit={handleOnSubmit}>
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
</form> */}