import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import PostPage from "./pages/PostPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* Redirects home, all urls that do not match */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
