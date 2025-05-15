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
  FaHeartbeat,
  FaFileMedical,
  FaImage,
  FaNotesMedical,
} from "react-icons/fa";

const DocView = () => {
  const { consultId } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:5000/v1/consult/${consultId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setConsultation(response.data);
      } catch (error) {
        console.error("Error fetching consultation details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [consultId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Fetching consultation details...</p>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-5">
        <h3 className="text-danger">Consultation not found</h3>
      </div>
    );
  }

  const {
    status,
    photos = [],
    description,
    patient = {},
    concernType = "General Checkup",
    medicalHistory = "Not provided",
    currentMedications = "Not mentioned",
  } = consultation;

  const {
    name = "N/A",
    email = "N/A",
    phone = "N/A",
    street = "N/A",
    city = "N/A",
    state = "N/A",
    country = "N/A",
    pinCode = "N/A",
    age = "N/A",
    gender = "N/A",
  } = patient;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary border-bottom pb-2">
        <FaFileMedical className="me-2" />
        Patient Consultation Details
      </h2>

      {/* Patient Info */}
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

      {/* Consultation Info */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-info text-white">
          <FaNotesMedical className="me-2" />
          Health Concern
        </div>
        <div className="card-body">
          <p><FaHeartbeat className="me-2 text-secondary" /> <strong>Concern Type:</strong> {concernType}</p>
          <p><FaFileMedical className="me-2 text-secondary" /> <strong>Symptoms:</strong></p>
          <div className="p-3 bg-light border rounded">
            <p className="mb-0">{description || "No symptoms described."}</p>
          </div>
          <hr />
          <p><strong>Medical History:</strong></p>
          <div className="bg-light p-2 rounded">{medicalHistory}</div>
          <p className="mt-3"><strong>Current Medications:</strong></p>
          <div className="bg-light p-2 rounded">{currentMedications}</div>
        </div>
      </div>

      {/* Photo Attachments */}
      {photos.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-warning text-dark">
            <FaImage className="me-2" />
            Attached Images
          </div>
          <div className="card-body">
            <div className="row g-3">
              {photos.map((photo, index) => (
                <div className="col-md-4" key={index}>
                  <img
                    src={photo}
                    alt={`Attachment ${index + 1}`}
                    className="img-fluid rounded border"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Status & Actions */}
      <div className="d-flex justify-content-between align-items-center mt-5 flex-wrap">
        <h5 className="text-muted">
          <FaFileMedical className="me-2" />
          <strong>Status:</strong> {status}
        </h5>
        
      </div>
    </div>
  );
};

export default DocView;
