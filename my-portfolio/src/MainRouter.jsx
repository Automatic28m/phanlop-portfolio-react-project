import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./feature/home";
import Portfolio from "./feature/portfolio";
import LoginPage from "./feature/login";
import LogoutPage from "./feature/logout";
import CreatePortfolio from "./feature/createPortfolio";
import DisplayPortfolio from "./feature/displayPortfolio";
import EditPortfolio from "./feature/editPortfolio";
import ProtectedRoute from "./protectedRoute";
import EditGallery from "./feature/editGallery";
import ManageSkillType from "./feature/manageSkillType";
import EditSkillType from "./feature/editSkillType";
import Dashboard from "./feature/dashboard";
import BackendLayout from "./layouts/BackendLayout";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Routes with BackendLayout */}
        <Route
          element={
            <ProtectedRoute>
              <BackendLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/displayPortfolio"
            element={
              <ProtectedRoute>
                <DisplayPortfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Logout"
            element={
              <ProtectedRoute>
                <LogoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createPortfolio"
            element={
              <ProtectedRoute>
                <CreatePortfolio />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editPortfolio/:id"
            element={
              <ProtectedRoute>
                <EditPortfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editGallery/:id"
            element={
              <ProtectedRoute>
                <EditGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageSkillTypes"
            element={
              <ProtectedRoute>
                <ManageSkillType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editSkillType/:id"
            element={
              <ProtectedRoute>
                <EditSkillType />
              </ProtectedRoute>
            }
          />
          {/* add more backend layout children here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRouter;
