import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import ConsultationOptions from '../../Components/ConsultationOptions/ConsultationOptions';
import Reviews from '../../Components/Reviews/Review';
import ServicesSection from '../../Components/ServicesSection/ServicesSection';

const Home = () => {
  const navigate = useNavigate();

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
          alert("Access restricted to patients only.");
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
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">Welcome to DanceBar</h1>
          <p className="lead text-muted animate__animated animate__fadeInUp">
            Bridging healthcare with technology. Your trusted hub for expert consultations and bookings.
          </p>
          <button 
            className="btn btn-primary btn-lg mt-3 animate__animated animate__fadeInUp"
            onClick={handleBookConsultation}
          >
            Book a Consultation
          </button>
        </div>
      </section>

      <ServicesSection />
      <ConsultationOptions />
      <Reviews />

      {/* Appointment CTA */}
      <section className="appointment-section py-5 text-center bg-white">
        <div className="container">
          <h3 className="fw-bold mb-3">Take Charge of Your Health Today</h3>
          <p className="text-muted">Find the right doctor or hospital and book in a few seconds.</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleBookConsultation}
          >
            Get Started
          </button>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
