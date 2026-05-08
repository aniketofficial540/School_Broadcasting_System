import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import UploadContentPage from "./pages/teacher/UploadContentPage";
import MyContentPage from "./pages/teacher/MyContentPage";
import PrincipalDashboard from "./pages/principal/PrincipalDashboard";
import PendingApprovalsPage from "./pages/principal/PendingApprovalsPage";
import AllContentPage from "./pages/principal/AllContentPage";
import LiveBroadcastPage from "./pages/public/LiveBroadcastPage";
import NotFoundPage from "./pages/NotFoundPage";

function LegacyLiveBroadcastRedirect() {
  const { teacherId } = useParams();

  return <Navigate to={`/live/${teacherId}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
            },
          }}
        />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/live/:teacherId" element={<LegacyLiveBroadcastRedirect />} />
          <Route path="/live/:teacherId" element={<LiveBroadcastPage />} />

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRole="teacher">
                <MainLayout>
                  <TeacherDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/upload"
            element={
              <ProtectedRoute allowedRole="teacher">
                <MainLayout>
                  <UploadContentPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/my-content"
            element={
              <ProtectedRoute allowedRole="teacher">
                <MainLayout>
                  <MyContentPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/principal/dashboard"
            element={
              <ProtectedRoute allowedRole="principal">
                <MainLayout>
                  <PrincipalDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/pending"
            element={
              <ProtectedRoute allowedRole="principal">
                <MainLayout>
                  <PendingApprovalsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/all-content"
            element={
              <ProtectedRoute allowedRole="principal">
                <MainLayout>
                  <AllContentPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}
