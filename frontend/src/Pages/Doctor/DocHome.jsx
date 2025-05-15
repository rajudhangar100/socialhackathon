import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdPerson,
  MdMedicalServices,
  MdOutlineVisibility,
} from "react-icons/md";
import { FaUserMd, FaRegAddressCard } from "react-icons/fa";

const DocHome = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchConsults = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");

      if (!user || !token) {
        console.error("No user or token found");
        navigate("/login");
        return;
      }

      setDoctor(user);

      try {
        const response = await axios.get("http://localhost:5000/v1/consult", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const consults = response.data;

        console.log("Fetched Consults:", consults);

        // Map all consults to extract patient data
        const extractedPatients = consults.map((consult) => ({
          id: consult._id || consult.id, // fallback
          name: consult.patient?.name,
          age: consult.patient?.age,
          gender: consult.patient?.gender,
          problemSummary: consult.description,
          fullDetails: consult.patient,
        }));

        console.log("Extracted Patients: ", extractedPatients);
        setPatients(extractedPatients);
      } catch (err) {
        console.error("Failed to fetch consults:", err);
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchConsults();
  }, [navigate]);

 

  const handleViewProfile = () => {
    navigate("/doctor-profile");
  };

  const handleTreatPatient = (consultId, patient) => {
    navigate(`/doctor/treat/${consultId}`, {
      state: { patientDetails: patient.fullDetails },
    });
  };

  const handleViewDetails = (consultId) => {
    navigate(`/doctor/view/${consultId}`);
  };

  return (
    <div
      className="container py-5"
      style={{
        background: "linear-gradient(to bottom right, #e3f2fd, #ffffff)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary d-flex align-items-center gap-2">
          <FaUserMd size={32} />
          Welcome, Dr. {doctor?.name || "Loading..."}
        </h2>
        <button className="btn btn-primary" onClick={handleViewProfile}>
          View Profile
        </button>
      </div>

      <h4 className="mb-4 text-secondary">All Patients</h4>

      <div className="row g-4">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div className="col-md-6 col-lg-4" key={patient.id}>
              <div className="card h-100 border-top border-4 border-primary shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary d-flex align-items-center gap-2">
                    <MdPerson /> {patient.name}
                  </h5>
                  <p className="card-text text-muted d-flex align-items-center gap-2 mb-1">
                    <FaRegAddressCard /> Age: {patient.age}
                  </p>
                  <p className="card-text text-muted d-flex align-items-center gap-2 mb-1">
                    <FaRegAddressCard /> Gender: {patient.gender || "Not Provided"}
                  </p>
                  <p className="card-text text-muted d-flex align-items-center gap-2">
                    <MdMedicalServices /> Issue:{" "}
                    {patient.problemSummary || "Not Provided"}
                  </p>

                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-primary w-50 d-flex align-items-center justify-content-center"
                      onClick={() => handleViewDetails(patient.id)}
                    >
                      <MdOutlineVisibility className="me-1" /> View
                    </button>
                    <button
                      className="btn btn-success w-50"
                      onClick={() => handleTreatPatient(patient.id, patient)}
                    >
                      Treat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted text-center">No patient data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocHome;
