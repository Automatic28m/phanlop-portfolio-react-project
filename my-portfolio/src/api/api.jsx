const BASE_URL = "https://phanlop-portfolio-react-project.onrender.com";
// const BASE_URL = "http://localhost:8080";

const api = {
    protected: `${BASE_URL}/protected`,

    // Home.jsx
    getSkills: `${BASE_URL}/getSkills`,
    getProjects: `${BASE_URL}/getProjects`,
    getAcheivements: `${BASE_URL}/getAcheivements`,
    getInternships: `${BASE_URL}/getInternships`,
    getActivities: `${BASE_URL}/getActivities`,
    getEducations: `${BASE_URL}/getEducations`,

    // displayPortfolio.jsx
    portfolio : `${BASE_URL}/Portfolio`,
    deletePortfolioById : `${BASE_URL}/deletePortfolioById`,

    // createPortfolio.jsx
    getPortfolioType: `${BASE_URL}/getPortfolioType`,
    createPortfolioAndGallery: `${BASE_URL}/createPortfolioAndGallery`,

    // login & register
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
    
    // editPortfolio.jsx
    getPortfolioById: `${BASE_URL}/getPortfolioById`,
    updatePortfolioById: `${BASE_URL}/updatePortfolioById`,
    
    // portfolio.jsx
    getGalleryByPortfolioId: `${BASE_URL}/getGalleryByPortfolioId`
}

export default api;