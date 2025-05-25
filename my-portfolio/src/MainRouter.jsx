import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './feature/home';
import Portfolio from './feature/portfolio';
import LoginPage from './feature/login';
import LogoutPage from './feature/logout';
import CreatePortfolio from './feature/createPortfolio';
import DisplayPortfolio from './feature/displayPortfolio';
import EditPortfolio from './feature/editPortfolio';
import ProtectedRoute from './protectedRoute';

const MainRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/portfolio/:id' element={<Portfolio />} />
                <Route path='/login' element={<LoginPage />} />

                <Route path='/Logout' element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />
                <Route path='/createPortfolio' element={<ProtectedRoute><CreatePortfolio /></ProtectedRoute>} />
                <Route path='/displayPortfolio' element={<ProtectedRoute><DisplayPortfolio /></ProtectedRoute>} />
                <Route path='/editPortfolio/:id' element={<ProtectedRoute><EditPortfolio /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default MainRouter;