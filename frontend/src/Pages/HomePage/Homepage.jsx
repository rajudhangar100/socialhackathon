import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';

import ConsultationOptions from '../../Components/ConsultationOptions/ConsultationOptions';
import Reviews from '../../Components/Reviews/Review';
import ServicesSection from '../../Components/ServicesSection/ServicesSection';
const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // using i18next hook

  const handleBookConsultation = () => {
    const token = localStorage.getItem("accessToken");
    const tokenExpiry = localStorage.getItem("accessTokenExpiration");
    const userData = localStorage.getItem("user");

    const isTokenValid =
      token &&
      tokenExpiry &&
      new Date(tokenExpiry) > new Date();

    if (!isTokenValid) {
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser?.role === "patient") {
          navigate("/user-home");
        } else {
          alert(t("home.accessRestricted")); // assuming you have this key
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
        navigate("/login");
      }
    }
  };

  return (
    <div className="home-wrapper bg-light text-dark">
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
            {t("home.welcome")}
          </h1>
          <p className="lead text-muted animate__animated animate__fadeInUp">
            {t("home.tagline")}
          </p>
          <button
            className="btn btn-primary btn-lg mt-3 animate__animated animate__fadeInUp"
            onClick={handleBookConsultation}
          >
            {t("home.bookConsultation")}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Consultation Options */}
      <ConsultationOptions />

      {/* Reviews Section */}
      <Reviews />

      {/* Appointment CTA */}
      <section className="appointment-section py-5 text-center bg-white">
        <div className="container">
          <h3 className="fw-bold mb-3">{t("home.takeCharge")}</h3>
          <p className="text-muted">{t("home.findDoctor")}</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleBookConsultation}
          >
            {t("home.getStarted")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
