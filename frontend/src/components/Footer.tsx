import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '20vh',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '5px solid black',
                flexDirection: 'column',
                backgroundColor: 'black',
            }} >
            <footer style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem',
                }}>
                    <p style={{ padding: '0.5rem', color: '#919aa1' }}> CONNECT WITH ME! </p>
                </Box>

                <div>
                    <ul style={{ display: 'flex' }}>
                        <li style={{ marginRight: '1rem' }}>
                            <a href="https://twitter.com/payal_kherajani" target="_blank">
                                <TwitterIcon />
                            </a>
                        </li>

                        <li style={{ marginRight: '1rem' }}>
                            <a href="https://www.linkedin.com/in/payalkherajani/" target="_blank">
                                <LinkedInIcon />
                            </a>
                        </li>

                        <li style={{ marginRight: '1rem' }}>
                            <a href="https://github.com/payalkherajani" target="_blank">
                                <GitHubIcon />
                            </a>
                        </li>

                        <li style={{ marginRight: '1rem' }}>
                            <a href="https://www.instagram.com/" target="_blank">
                                <InstagramIcon />
                            </a>
                        </li>
                    </ul >
                </div >

            </footer >
        </Box >

    );
};

export default Footer;
