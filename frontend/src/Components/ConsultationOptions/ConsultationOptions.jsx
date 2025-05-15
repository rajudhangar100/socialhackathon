import React from "react";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

const ConsultationOptions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { ref: hospitalRef, inView: hospitalVisible } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: doctorRef, inView: doctorVisible } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleRedirect = (type) => {
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
          if (type === "hospital") {
            navigate("/consultation/hospital");
          } else if (type === "doctor") {
            navigate("/consultation/doctor");
          }
        } else {
          alert(t("home.accessRestricted")); // use translation here too
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
        navigate("/login");
      }
    }
  };

  return (
    <section className="consultation-section py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">
          {t("consultation.chooseType", "Choose Your Consultation Type")}
        </h2>
        <div className="row text-center">
          {/* Hospital Card */}
          <div
            ref={hospitalRef}
            className={`col-md-6 mb-3 ${hospitalVisible ? 'animate__animated animate__fadeInLeft' : ''}`}
          >
            <div className="card shadow-sm p-4 h-100">
              <h4>{t("consultation.hospitalTitle", "Consult Hospital Near You")}</h4>
              <p className="text-muted">
                {t(
                  "consultation.hospitalDesc",
                  "Choose from our network of trusted hospitals around your area."
                )}
              </p>
              <button
                className="btn btn-outline-primary"
                onClick={() => handleRedirect("hospital")}
              >
                {t("consultation.findHospitals", "Find Hospitals")}
              </button>
            </div>
          </div>

          {/* Doctor Card */}
          <div
            ref={doctorRef}
            className={`col-md-6 mb-3 ${doctorVisible ? 'animate__animated animate__fadeInRight' : ''}`}
          >
            <div className="card shadow-sm p-4 h-100">
              <h4>{t("consultation.doctorTitle", "Personal Doctor Consultation")}</h4>
              <p className="text-muted">
                {t(
                  "consultation.doctorDesc",
                  "Get personal care and follow-up from your preferred doctor."
                )}
              </p>
              <button
                className="btn btn-outline-success"
                onClick={() => handleRedirect("doctor")}
              >
                {t("consultation.consultNow", "Consult Now")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationOptions;
