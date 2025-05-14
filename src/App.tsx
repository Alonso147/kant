import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./contexts/AuthContext";

// Importar páginas individuales
import Home from "./pages/Home";
import ExercisePage from "./pages/ExercisePage";
import NutritionPage from "./pages/NutritionPage";
import Sleep from "./pages/Sleep"; // Nueva página Sleep
import OrganizationPage from "./pages/OrganizationPage";
import MenstrualPage from "./pages/MenstrualPage";
import GoalsPage from "./pages/GoalsPage";
import CommunityPage from "./pages/CommunityPage";
import IA from "./pages/IA"; // Nueva pestaña "IA" con el chat mentor

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/inicio") // Llamada al backend
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error al obtener datos:", err));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout data={data} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="exercise" element={<ExercisePage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="sleep" element={<Sleep />} /> {/* Ruta de Sleep (relativa) */}
            <Route path="organization" element={<OrganizationPage />} />
            <Route path="menstrual" element={<MenstrualPage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="ia" element={<IA />} />
            <Route path="*" element={<Navigate to="/exercise" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

