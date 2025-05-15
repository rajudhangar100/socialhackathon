import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaUserMd,
  FaHospitalAlt,
  FaStethoscope,
  FaClock,
  FaDatabase,
  FaMicroscope,
  FaEye,
  FaGlobe,
} from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import './ServicesSection.css';

const ServicesSection = () => {
  const { t, i18n } = useTranslation();

  // Ensuring the component re-renders when language is changed
  useEffect(() => {
    // This ensures the component re-renders when the language is switched
  }, [i18n.language]);

  const services = [
    {
      icon: <FaUserMd className="icon text-primary mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.personalDoctor.title"),
      description: t("services.personalDoctor.description"),
    },
    {
      icon: <FaHospitalAlt className="icon text-success mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.reachHospitals.title"),
      description: t("services.reachHospitals.description"),
    },
    {
      icon: <FaStethoscope className="icon text-danger mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.easyBooking.title"),
      description: t("services.easyBooking.description"),
    },
    {
      icon: <FaClock className="icon text-warning mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.care24x7.title"),
      description: t("services.care24x7.description"),
    },
    {
      icon: <FaDatabase className="icon text-info mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.doctorData.title"),
      description: t("services.doctorData.description"),
    },
    {
      icon: <FaHospitalAlt className="icon text-secondary mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.hospitalMgmt.title"),
      description: t("services.hospitalMgmt.description"),
    },
    {
      icon: <FaMicroscope className="icon text-primary mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.aiDiagnosis.title"),
      description: t("services.aiDiagnosis.description"),
    },
    {
      icon: <FaGlobe className="icon text-danger mb-3 animate__animated animate__fadeInUp" size={35} />,
      title: t("services.eyeDetection.title"),
      description: t("services.eyeDetection.description"),
    },
  ];

  return (
    <section className="features-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-uppercase">{t("services.heading")}</h2>
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
