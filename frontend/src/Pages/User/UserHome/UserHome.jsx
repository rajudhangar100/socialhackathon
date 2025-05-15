import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const accessTokenExpiration = localStorage.getItem("accessTokenExpiration");
    const userData = localStorage.getItem("user");

    const isTokenValid =
      accessToken &&
      accessTokenExpiration &&
      new Date(accessTokenExpiration) > new Date();

    if (!isTokenValid) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          throw new Error("User data not found in localStorage.");
        }

        const consultsRes = await axios.get(
          "http://localhost:5000/v1/consult",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        // Process consultations from backend
        const sortedConsults = [...consultsRes.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const recentAppointments = sortedConsults
          .slice(0, 5)
          .map((consult) => ({
            date: consult.createdAt,
            type: consult.description, // Using description as type
            doctor: consult.doctor.details.name, // Access nested doctor name
            status: consult.status,
          }));

        setAppointments(recentAppointments);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the server. Showing demo data.");
        console.log(error);

        setUser({ name: "Demo User" });
        setAppointments([
          {
            date: "2025-04-15T10:00:00",
            type: "Dental Checkup",
            doctor: "Dr. Smith",
            status: "confirmed",
          },
          {
            date: "2025-04-20T14:30:00",
            type: "Eye Checkup",
            doctor: "Dr. Watson",
            status: "pending",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
  
      <div className="container mt-5 animate-fade">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary fw-bold">
            Welcome, {user?.name || "User"} 👋
          </h1>
          <p className="lead text-muted">
            Your personal healthcare hub - Book consultations, track
            appointments, and stay informed.
          </p>
        </div>

        <div className="row gy-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 text-center bg-light hover-card rounded-4">
              <div className="card-body p-4 d-flex flex-column">
              <img
  src="/doc1.jpg"
  alt="Online Consultation"
  className="mb-4 mx-auto"
  style={{ width: "100px", height: "auto" }}
/>
                <h5 className="fw-bold">Consult Doctor</h5>
                <p className="small text-muted">
                  Consultations with top doctors at your convenience.
                </p>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate("/consultation/doctor")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 text-center bg-light hover-card rounded-4">
              <div className="card-body p-4 d-flex flex-column">
                <img
                  src="/hospital2.jpg"
                  alt="Hospital Consultation"
                  className="mb-3 mx-auto"
                  style={{ width: "100px", height: "auto" }}
                />
                <h5 className="fw-bold">Consult Hospital</h5>
                <p className="small text-muted">
                  Consult hospitals for checkups and diagnostics.
                </p>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate("/consultation/hospital")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 text-center bg-light hover-card rounded-4">
              <div className="card-body p-4 d-flex flex-column">
                <img
                  src="/medicalrecords3.jpg"
                  alt="Medical Consultation Records"
                  className="mb-3 mx-auto"
                  style={{ width: "150px", height: "100px" }}
                />
                <h5 className="fw-bold">Medical Records</h5>
                <p className="small text-muted">
                  Securely view and manage your medical history.
                </p>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate("/patient/consults")}
                >
                  View Records
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-5">
          <h3 className="text-primary mb-4 text-center">Recent Appointments</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appt, idx) => (
                    <tr key={idx}>
                      <td>{new Date(appt.date).toLocaleDateString()}</td>
                      <td>{appt.type}</td>
                      <td>{appt.doctor}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            appt.status === "confirmed"
                              ? "success"
                              : appt.status === "completed"
                              ? "secondary"
                              : "warning"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted text-center">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Health Tips Section */}
        <section className="mb-5 p-4 bg-white shadow rounded">
          <h3 className="text-success mb-4 text-center">Health Tips</h3>
          <div className="row">
            {[
              {
                tip: "💧 Drink plenty of water daily to stay hydrated.",
                color: "info",
              },
              {
                tip: "🏃‍♀️ 30 minutes of daily exercise keeps your heart healthy.",
                color: "warning",
              },
              {
                tip: "🛌 Ensure 7–8 hours of sleep for better recovery and focus.",
                color: "success",
              },
            ].map((tipObj, idx) => (
              <div key={idx} className={`col-md-4`}>
                <div className={`alert alert-${tipObj.color}`}>
                  {tipObj.tip}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    
  );
};

export default UserHome;
