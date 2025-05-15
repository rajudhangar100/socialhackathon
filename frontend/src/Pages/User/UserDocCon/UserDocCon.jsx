import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaStethoscope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import "./UserDocCon.css";
import { useNavigate } from "react-router-dom";

const specializations = [
  "Pediatricians",
  "Geriatricians",
  "Family Physicians",
  "Cardiologists",
  "Dermatologists",
  "Neurologists",
  "Orthopedic Surgeons",
  "Psychiatrists",
  "Ophthalmologists",
  "Dentists",
  "Gynecologists",
  "Endocrinologists",
  "Gastroenterologists",
  "Pulmonologists",
  "Urologists",
  "Hematologists",
  "Oncologists",
  "Rheumatologists",
];

function UserDocCon() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/v1/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doc) => doc.specialization === selectedSpecialization)
    : doctors;

  return (
    <div className="user-doc-bg py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-primary">Meet Our Doctors</h2>

        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <select
              className="form-select"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="">All Specializations</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-center text-muted">
            No doctors available in {selectedSpecialization || "this category"}{" "}
            right now.
          </p>
        ) : (
          <div className="row justify-content-center">
            {filteredDoctors.map((doc, index) => {
              const details = doc.details;
              return (
                <div className="col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="card doctor-card shadow-lg h-100">
                    <div className="card-body">
                      <h5 className="card-title text-dark">
                        <FaUserMd className="me-2 text-primary" />
                        Dr. {details.name}
                      </h5>
                      <p className="card-text">
                        <FaStethoscope className="me-2 text-muted" />
                        {doc.specialization}
                      </p>
                      <p className="card-text text-muted">
                        Experience: {doc.experence} years
                      </p>
                      <p className="card-text">
                        <FaPhoneAlt className="me-2 text-muted" />
                        {details.phone}
                      </p>
                      <p className="card-text">
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        {details.city}, {details.state}
                      </p>
                      <Button
                        variant="outline-primary"
                        className="w-100 mt-3"
                        onClick={() => navigate(`/consultation/${doc.id}`)}
                      >
                        Consult Now (₹{doc.fees})
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-5">
          <h4 className="text-secondary">Why Consult With Us?</h4>
          <p className="text-muted">
            Trusted, experienced, and verified doctors are here to help you
            24/7. Get personalized advice from the comfort of your home.
          </p>
          <img
            src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-4989.jpg?w=740"
            alt="Online Consultation"
            className="img-fluid mt-3 rounded shadow"
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDocCon;
