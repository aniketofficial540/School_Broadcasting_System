import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🤔</div>
        <h1 className="text-4xl font-bold text-gray-900 font-display mb-2">404</h1>
        <p className="text-gray-500 text-lg mb-6">Oops! This page doesn't exist.</p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
