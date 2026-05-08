import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const teacherLinks = [
    { path: "/teacher/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/teacher/upload", label: "Upload Content", icon: "📤" },
    { path: "/teacher/my-content", label: "My Content", icon: "📚" },
  ];

  const principalLinks = [
    { path: "/principal/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/principal/pending", label: "Pending Approvals", icon: "⏳" },
    { path: "/principal/all-content", label: "All Content", icon: "📋" },
  ];

  const navLinks = user?.role === "teacher" ? teacherLinks : principalLinks;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-auto lg:transform-none
        `}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg">
            📡
          </div>
          <div>
            <div className="font-bold text-gray-900 font-display leading-tight">
              EduBroadcast
            </div>
            <div className="text-xs text-gray-400 capitalize">{user?.role} Panel</div>
          </div>
        </div>

        <div className="px-4 py-3 mx-3 mt-3 bg-gray-50 rounded-xl">
          <div className="text-sm font-semibold text-gray-800 truncate">{user?.name}</div>
          <div className="text-xs text-gray-500 truncate">{user?.email}</div>
        </div>

        <nav className="mt-4 px-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1
                  text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-4 flex justify-start">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            ☰
          </button>
          <div className="font-bold text-gray-900 font-display">EduBroadcast</div>
          <div className="w-8" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
