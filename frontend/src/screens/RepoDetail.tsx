import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import dateformat from 'dateformat';
import { Modal } from '../components';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../context/Context';

export type Repo = {
    name: string;
    description: string;
    link_to_repo: string;
    created_at: string;
    html_url: string;
};

const RepoDetail = () => {

    const [showEditModal, setEditModal] = useState(false);
    const { state, dispatch } = useAppContext();
    const { selectedRepository } = state;


    const navigate = useNavigate();

    const editRepoInfo = () => {
        setEditModal(true);
    };

    const handleCloseModal = () => {
        setEditModal(false);
    };

    return (
        <Box sx={{ minHeight: '80vh' }}>

            <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>Repository Information</h2>

            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '1rem' }}>

                <img src="/assets/form.svg" alt="github-image" style={{ width: '50%', height: '200px' }} />

                <Card
                    sx={{ minWidth: 275, marginBottom: '1rem', padding: '1rem', backgroundColor: '#FEF2F2' }}>
                    <CardContent>

                        <Typography sx={{ marginBottom: '1rem' }}>
                            <strong style={{ display: 'inline' }}>Name: </strong>
                            <span>{selectedRepository.name} </span>
                        </Typography>

                        <Typography sx={{ marginBottom: '1rem' }}>
                            <strong style={{ display: 'inline' }}>Description: </strong>
                            <span>{selectedRepository.description} </span>
                        </Typography>

                        <Typography sx={{ marginBottom: '1rem' }}>
                            <strong style={{ display: 'inline' }}>Created Date: </strong>
                            <span>{dateformat(selectedRepository.created_at, "fullDate")}</span>
                        </Typography>

                        <Typography sx={{ marginBottom: '1rem' }}>
                            <strong style={{ display: 'inline' }}>Github Repo Link: </strong>
                            <a href={selectedRepository.html_url} target='_blank'>
                                <Button>Open</Button>
                            </a>
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => navigate('/home')}
                            sx={{
                                marginRight: '3rem'
                            }}
                        >Back
                        </Button>

                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => editRepoInfo()}

                        >Edit</Button>

                    </CardContent>

                </Card>
            </Box>
            {
                showEditModal && (
                    <Modal
                        handleClose={handleCloseModal}
                        repoInfo={selectedRepository}
                        open={showEditModal}
                    />
                )
            }
        </Box>
    );
};

export default RepoDetail;
