import React from "react";
import {
  FaUserMd,
  FaHospitalAlt,
  FaStethoscope,
  FaClock,
  FaDatabase,
  FaMicroscope,
  FaEye
} from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserMd className="icon text-primary mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "Personal Doctor",
      description: "Connect one-on-one with your preferred doctor anytime.",
    },
    {
      icon: <FaHospitalAlt className="icon text-success mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "Reach Hospitals Directly",
      description: "Book instantly with top-rated hospitals near you.",
    },
    {
      icon: <FaStethoscope className="icon text-danger mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "Easy Booking",
      description: "Schedule appointments in seconds with reminders.",
    },
    {
      icon: <FaClock className="icon text-warning mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "24x7 Expert Care",
      description: "Qualified professionals ready to help anytime, anywhere.",
    },
    {
      icon: <FaDatabase className="icon text-info mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "Doctor Data Access",
      description: "Doctors get secure access to patient history & records.",
    },
    {
      icon: <FaHospitalAlt className="icon text-secondary mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "Hospital Doctor Management",
      description: "Hospitals can easily manage doctors and appointments.",
    },
    {
      icon: <FaMicroscope className="icon text-primary mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "AI-Powered Diagnosis",
      description: "Advanced ML model for faster and accurate diagnosis.",
    },
    {
      icon: <FaEye className="icon text-danger mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: "Eye Disease Detection",
      description:
        "Detects cataract, diabetic retinopathy, glaucoma & more using images.",
    },
  ];

  return (
    <section className="features-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-uppercase">Our Services</h2>
        <div className="row g-4">
          {services.map((service, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div className="card h-100 text-center shadow-lg border-0 rounded-4 service-card">
                <div className="card-body d-flex flex-column justify-content-center">
                  {service.icon}
                  <h5 className="fw-semibold mt-2">{service.title}</h5>
                  <p className="text-muted small">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
