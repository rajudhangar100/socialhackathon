import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import UrgencyCheckCard from "../../../Components/UrgencyCheckCard/UrgencyCheckCard";

const UserHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
 const [, setError] = useState(""); // OR just remove both if not used at all


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

        const sortedConsults = [...consultsRes.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const recentAppointments = sortedConsults.slice(0, 5).map((consult) => ({
          date: consult.createdAt,
          type: consult.description,
          doctor: consult.doctor.details.name,
          status: consult.status,
        }));

        setAppointments(recentAppointments);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the server. Showing demo data.");

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
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary fw-bold">
          {t("user.welcome", { name: user?.name || "User" })}
        </h1>
        <p className="lead text-muted">{t("user.subheading")}</p>
      </div>

      <div className="row gy-4 mb-5">
        <Card
          image="/doc1.jpg"
          title={t("user.consultDoctor")}
          desc={t("user.consultDoctorDesc")}
          onClick={() => navigate("/consultation/doctor")}
        />
        <Card
          image="/hospital2.jpg"
          title={t("user.consultHospital")}
          desc={t("user.consultHospitalDesc")}
          onClick={() => navigate("/consultation/hospital")}
        />
        <Card
          image="/medicalrecords3.jpg"
          title={t("user.medicalRecords")}
          desc={t("user.medicalRecordsDesc")}
          onClick={() => navigate("/patient/consults")}
        />
      </div>
      <UrgencyCheckCard/>
      <section className="mb-5">
        <h3 className="text-primary mb-4 text-center">{t("user.recentAppointments")}</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>{t("user.date")}</th>
                <th>{t("user.type")}</th>
                <th>{t("user.doctor")}</th>
                <th>{t("user.status")}</th>
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
                      <span className={`badge bg-${
                        appt.status === "confirmed"
                          ? "success"
                          : appt.status === "completed"
                          ? "secondary"
                          : "warning"
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted text-center">
                    {t("user.noAppointments")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-5 p-4 bg-white shadow rounded">
        <h3 className="text-success mb-4 text-center">{t("user.healthTips")}</h3>
        <div className="row">
          {["tip1", "tip2", "tip3"].map((key, idx) => (
            <div key={idx} className="col-md-4">
              <div className={`alert alert-${["info", "warning", "success"][idx]}`}>
                {t(key)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Card = ({ image, title, desc, onClick }) => (
  <div className="col-md-4">
    <div className="card shadow-sm border-0 h-100 text-center bg-light rounded-4">
      <div className="card-body p-4 d-flex flex-column">
        <img src={image} alt={title} className="mb-4 mx-auto" style={{ width: "100px", height: "auto" }} />
        <h5 className="fw-bold">{title}</h5>
        <p className="small text-muted">{desc}</p>
        <button className="btn btn-outline-primary mt-auto" onClick={onClick}>
          {useTranslation().t("user.bookNow")}
        </button>
      </div>
    </div>
  </div>
);

export default UserHome;
