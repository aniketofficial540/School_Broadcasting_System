import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
    if (user.role === "principal") return <Navigate to="/principal/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
