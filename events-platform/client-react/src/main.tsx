import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EventsPage from './pages/EventsPage'
import EventPage from './pages/EventPage'
import EventFormPage from './pages/EventFormPage'
import AdminPage from './pages/AdminPage'
import InscriptionPage from './pages/InscriptionPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/form/:eventId" element={<EventFormPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/participations/:eventId" element={<InscriptionPage />} />
        {/* Redirects home, all urls that do not match */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
