import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHosCon.css";

const capitalizeWords = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const AvailableHospitals = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:5000/v1/hospital", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHospitals(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch hospitals. Displaying demo list.");
        setHospitals([
          {
            id: 1,
            name: "City Care Hospital",
            city: "new york",
            state: "ny",
            country: "usa",
            specialization: "Cardiology, Neurology, Orthopedics",
          },
          {
            id: 2,
            name: "Sunrise Multispeciality",
            city: "los angeles",
            state: "ca",
            country: "usa",
            specialization: "General Medicine, Pediatrics",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleRegister = (hospitalId) => {
    navigate(`/hospital/${hospitalId}/doctors`);
  };

  return (
    <div>
      <div className="user-doc-bg py-5">
        <div className="container">
          <h1 className="text-center fw-bold text-primary mb-4">
            🏥 Explore Hospitals Near You
          </h1>
          <p className="text-center text-muted mb-5">
            Find the best medical care and book your consultation with ease. We
            bring you the most trusted hospitals at your fingertips.
          </p>

          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}

          {error && (
            <div className="alert alert-warning text-center">{error}</div>
          )}

          <div className="row gy-4">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="col-md-6 col-lg-4">
                <div className="card hospital-card shadow-sm rounded-4 h-100 border-0">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-primary mb-2">
                      {hospital.name}
                    </h5>
                    <p className="mb-1">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                      <strong>Location: </strong>
                      {capitalizeWords(hospital.city)},{" "}
                      {capitalizeWords(hospital.state)},{" "}
                      {capitalizeWords(hospital.country)}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-heart-pulse-fill text-success me-1"></i>
                      <strong>Specialties:</strong>{" "}
                      <span className="badge bg-light text-dark">
                        {hospital.specialization}
                      </span>
                    </p>
                    <div className="mt-auto d-flex justify-content-center">
                      <button
                        className="btn btn-outline-primary rounded-pill px-4"
                        onClick={() => handleRegister(hospital.id)}
                      >
                        Register for Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extras for visual appeal */}
        </div>
      </div>
      <section className="mt-5 glassy-effect p-4 rounded-4 shadow-sm">
        <h4 className="fw-semibold text-secondary mb-3">Why Choose Us?</h4>
        <ul className="list-unstyled">
          <li>✔ Verified hospital listings with accurate information</li>
          <li>✔ Real-time availability of consultation slots</li>
          <li>✔ Quick registration and booking</li>
          <li>✔ 24x7 support and care services</li>
        </ul>
      </section>
    </div>
  );
};

export default AvailableHospitals;
