import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ReportLostItem from './pages/ReportLostItem'
import ReportFoundItem from './pages/ReportFoundItem'
import Marketplace from './pages/Marketplace'
import ItemDetail from './pages/ItemDetail'
import ClaimItem from './pages/ClaimItem'
import MyClaims from './pages/MyClaims'
import ProfileSettings from './pages/ProfileSettings'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import CampusSafetyGuidelines from './pages/CampusSafetyGuidelines'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import SecurityPolicy from './pages/SecurityPolicy'
import CentralLibraryHub from './pages/CentralLibraryHub'
import ContactSecurityHub from './pages/ContactSecurityHub'
import DeskDashboard from './pages/DeskDashboard'

import App from './pages/app'

// Auto scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<App />} />
        <Route path="/landing" element={<App />} />
        <Route path="/campussmart" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reportlost" element={<ReportLostItem />} />
        <Route path="/reportfound" element={<ReportFoundItem />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/item" element={<ItemDetail />} />
        <Route path="/submitclaim" element={<ClaimItem />} />
        <Route path="/claim-item" element={<ClaimItem />} />
        <Route path="/myclaims" element={<MyClaims />} />
        <Route path="/my-claims" element={<MyClaims />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/safety-guidelines" element={<CampusSafetyGuidelines />} />
        <Route path="/guidelines" element={<CampusSafetyGuidelines />} />
        <Route path="/safety-guidelines.html" element={<CampusSafetyGuidelines />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/terms-of-service.html" element={<TermsOfService />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="/security" element={<SecurityPolicy />} />
        <Route path="/security-policy.html" element={<SecurityPolicy />} />
        <Route path="/central-library-hub" element={<CentralLibraryHub />} />
        <Route path="/central-library" element={<CentralLibraryHub />} />
        <Route path="/library-hub" element={<CentralLibraryHub />} />
        <Route path="/contact-security-hub" element={<ContactSecurityHub />} />
        <Route path="/contact-security" element={<ContactSecurityHub />} />
        <Route path="/security-hub" element={<ContactSecurityHub />} />
        <Route path="/desk-dashboard" element={<DeskDashboard />} />
        <Route path="/desk" element={<DeskDashboard />} />
        {/* Catch-all: redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
