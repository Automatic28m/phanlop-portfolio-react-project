import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './feature/home';
import LoginPage from './feature/login';
import CreatePortfolio from './feature/createPortfolio';
import DisplayPortfolio from './feature/displayPortfolio';
import EditPortfolio from './feature/editPortfolio';

const MainRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/createPortfolio' element={<CreatePortfolio />} />           
                <Route path='/displayPortfolio' element={<DisplayPortfolio />} />           
                <Route path='/editPortfolio/:id' element={<EditPortfolio />} />           
            </Routes>
        </Router>
    )
}

export default MainRouter;