
const BASE_URL = "https://phanlop-portfolio-react-project.onrender.com";
// const BASE_URL = "http://localhost:8080";

const api = {
    base_url: BASE_URL,
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
    countGalleryByPortfolioId : `${BASE_URL}/countGalleryByPortfolioId`,

    // createPortfolio.jsx
    getPortfolioType: `${BASE_URL}/getPortfolioType`,
    createPortfolioAndGallery: `${BASE_URL}/createPortfolioAndGallery`,

    // login & register
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
    
    // editPortfolio.jsx
    getPortfolioById: `${BASE_URL}/getPortfolioById`,
    updatePortfolioById: `${BASE_URL}/updatePortfolioById`,
    uploadMultipleGalleryImagesToPortfolioId: `${BASE_URL}/uploadMultipleGalleryImagesToPortfolioId`,
    addSkillTypeToPortfolio: `${BASE_URL}/addSkillTypeToPortfolio`,
    getSkillTypeByPortfolioId: `${BASE_URL}/getSkillTypeByPortfolioId`,

    // editGallery.jsx
    deleteGalleryById: `${BASE_URL}/deleteGalleryById`,
    
    // portfolio.jsx
    getGalleryByPortfolioId: `${BASE_URL}/getGalleryByPortfolioId`,
    
    // uploadGalleryComponent.jsx
    uploadGallery: `${BASE_URL}/upload-gallery`,

    // editSkillType.jsx
    addSkillType: `${BASE_URL}/addSkillType`,
    getSkillTypes: `${BASE_URL}/getSkillTypes`,
    getSkillTypeById: `${BASE_URL}/getSkillTypeById`,
    deleteSkillTypeById: `${BASE_URL}/deleteSkillTypeById`,
    updateSkillTypeById: `${BASE_URL}/updateSkillTypeById`,
}

export default api;