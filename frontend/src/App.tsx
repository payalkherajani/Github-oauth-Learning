import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarComponent, Footer } from './components';
import { Login, Home, RepoDetail } from './screens';
import { Box } from '@mui/material';

const App = () => {
    return (
        <Router>
            <Box sx={{ minHeight: '100vh' }}>
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/repo/:name" element={<RepoDetail />} />
                </Routes>
                <Footer />
            </Box>
        </Router>
    );
};

export default App;