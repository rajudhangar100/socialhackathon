import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaFileMedical,
} from "react-icons/fa";

const HosPatView = () => {
  const { PatientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        
        const response = await axios.get(
          `http://localhost:5000/v1/users/${PatientId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [PatientId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Fetching patient details...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-5">
        <h3 className="text-danger">Patient not found</h3>
      </div>
    );
  }

  const {
    name,
    email,
    phone,
    age = "N/A",
    gender = "N/A",
    street,
    city,
    state,
    country,
    pinCode,
  } = patient;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary border-bottom pb-2">
        <FaFileMedical className="me-2" />
        Patient Profile
      </h2>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-primary text-white">
          <FaUser className="me-2" />
          Personal Information
        </div>
        <div className="card-body">
          <p><FaUser className="me-2 text-secondary" /> <strong>Name:</strong> {name}</p>
          <p><FaBirthdayCake className="me-2 text-secondary" /> <strong>Age:</strong> {age}</p>
          <p><FaVenusMars className="me-2 text-secondary" /> <strong>Gender:</strong> {gender}</p>
          <p><FaEnvelope className="me-2 text-secondary" /> <strong>Email:</strong> {email}</p>
          <p><FaPhone className="me-2 text-secondary" /> <strong>Phone:</strong> {phone}</p>
          <p>
            <FaMapMarkerAlt className="me-2 text-secondary" />
            <strong>Address:</strong>{" "}
            {`${street}, ${city}, ${state}, ${country} - ${pinCode}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HosPatView;
