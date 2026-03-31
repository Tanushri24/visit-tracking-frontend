import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/pages/Login";
import SuperAdminRoutes from "./modules/super-admin/routes/SuperAdminRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Super Admin Routes */}
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
