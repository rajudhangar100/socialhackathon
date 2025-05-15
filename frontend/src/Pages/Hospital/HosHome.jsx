import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHospitalAlt,
    FaUserMd,
    FaRegAddressCard,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";

const HosHome = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleViewDoctors = () => {
        navigate("/hospital/doctors");
    };

    const handleViewPatients = () => {
        navigate("/hospital/patients");
    };

    return (
        <div
            className="container py-5"
            style={{
                background: "linear-gradient(to right, #f8f9fa, #ffffff)",
                minHeight: "100vh",
            }}
        >
            {/* Header Section */}
            <div className="mb-5 text-center">
                <h2 className="fw-bold text-primary d-flex justify-content-center align-items-center gap-2">
                    <FaHospitalAlt size={36} />
                    Welcome to {user.name}'s Dashboard
                </h2>
                <p className="text-muted">Manage your hospital information, doctors, and patients easily from here.</p>
            </div>

            {/* Hospital Info Cards */}
            <div className="row g-4 mb-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg border-0 rounded-4 h-100">
                        <div className="card-body">
                            <h5 className="text-primary d-flex align-items-center gap-2 fw-semibold">
                                <FaMapMarkerAlt /> Location
                            </h5>
                            <hr />
                            <p className="mb-2">{user.name}</p>
                            <p className="text-muted mb-1">{user.street}, {user.city}</p>
                            <p className="text-muted mb-1">{user.state}, {user.country} - {user.pinCode}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card shadow-lg border-0 rounded-4 h-100">
                        <div className="card-body">
                            <h5 className="text-success d-flex align-items-center gap-2 fw-semibold">
                                <FaPhoneAlt /> Contact Information
                            </h5>
                            <hr />
                            <p className="mb-2 text-muted"><FaPhoneAlt className="me-2" /> {user.phone}</p>
                            <p className="mb-0 text-muted"><FaEnvelope className="me-2" /> {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            

            {/* Navigation Cards */}
            <div className="row g-4 justify-content-center">
                {/* Doctors Card */}
                <div className="col-md-5">
                    <div className="card shadow-lg border-0 rounded-4 h-100 text-center hover-shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <div className="bg-primary text-white rounded-circle p-3 mb-3">
                                <FaUserMd size={30} />
                            </div>
                            <h5 className="fw-semibold text-primary">Doctors</h5>
                            <p className="text-muted mb-3">
                                View and manage doctors associated with your hospital.
                            </p>
                            <button className="btn btn-primary px-4 rounded-pill" onClick={handleViewDoctors}>
                                View Doctors
                            </button>
                        </div>
                    </div>
                </div>

                {/* Patients Card */}
                <div className="col-md-5">
                    <div className="card shadow-lg border-0 rounded-4 h-100 text-center hover-shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <div className="bg-success text-white rounded-circle p-3 mb-3">
                                <FaRegAddressCard size={30} />
                            </div>
                            <h5 className="fw-semibold text-success">Patients</h5>
                            <p className="text-muted mb-3">
                                Track patient records and their consultations.
                            </p>
                            <button className="btn btn-success px-4 rounded-pill" onClick={handleViewPatients}>
                                View Patients
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HosHome;
