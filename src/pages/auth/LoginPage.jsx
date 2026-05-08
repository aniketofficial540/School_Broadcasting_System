import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common/Button";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  function validate() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginError("");

    if (!validate()) return;

    try {
      const user = await login(email, password);

      if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (user.role === "principal") {
        navigate("/principal/dashboard");
      }
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function fillDemo(role) {
    if (role === "principal") {
      setEmail("principal@school.com");
      setPassword("password123");
    } else {
      setEmail("teacher1@school.com");
      setPassword("password123");
    }
    setErrors({});
    setLoginError("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            📡
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">EduBroadcast</h1>
          <p className="text-gray-500 mt-1">Content Broadcasting System</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-800 font-display mb-6">Sign In</h2>

          {loginError && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
              <p className="text-red-600 text-sm">❌ {loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all
                  ${errors.email
                    ? "border-red-300 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all
                  ${errors.password
                    ? "border-red-300 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wide">
              Quick Demo Login
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fillDemo("teacher")}
                className="flex-1 py-2 px-3 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                👨‍🏫 Fill as Teacher
              </button>
              <button
                onClick={() => fillDemo("principal")}
                className="flex-1 py-2 px-3 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                🏫 Fill as Principal
              </button>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 font-medium mb-1">Test Credentials:</p>
            <p className="text-xs text-gray-400">🔑 Password for all accounts: <code className="bg-gray-100 px-1 rounded">password123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
