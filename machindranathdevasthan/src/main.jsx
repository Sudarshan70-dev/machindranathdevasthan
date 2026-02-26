import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from './components/navbar';
import Home from './pages/home';
import Donation from './pages/donation';
import DonationForStone from './pages/donationForStone';
import VolunteerRegistration from './pages/volunteerRegistation';
import VipPass from './pages/vipPass';
import About from "./pages/about";
import TrusteeLogin from "./pages/trusteeLogin";
import TrusteeRegister from "./pages/trusteeRegister";
import TermsAndConditions from "./pages/termsAndConditions";
import PrivacyPolicy from "./pages/privacyPolicy";
import RefundPolicy from "./pages/refundPolicy";
import Footer from "./components/footer";



const Main = () => {
      const location = useLocation();

    return (
      <div className="mainContainer">
        <Navbar></Navbar>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/donationForStone" element={<DonationForStone />} />
            <Route
              path="/volunteerRegistration"
              element={<VolunteerRegistration />}
            />
            <Route path="/vipPass" element={<VipPass />} />
            <Route path="/about" element={<About />} />
            <Route path="/trustee-login" element={<TrusteeLogin />} />
            <Route path="/trustee-register" element={<TrusteeRegister />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Routes>
        </AnimatePresence>
        <Footer></Footer>
      </div>
    );
}

export default Main;
