import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import {
  FaUserMd,
  FaGraduationCap,
  FaClock,
  FaStethoscope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";
import "./HosDocList.css";

const HosDocList = () => {
  const { id: hospitalId } = useParams();
  const navigate = useNavigate(); // 👈 Add this line
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(`http://localhost:5000/v1/hospital/${hospitalId}/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched doctor data:", res.data);

        const fetchedDoctors = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.doctors)
          ? res.data.doctors
          : [];

        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors, using demo data instead.");

        const demoDoctors = [
          {
            id: 1,
            specialization: "Cardiology",
            education: "MBBS, MD",
            experience: 10,
            details: {
              name: "John Doe",
              phone: "1234567890",
              city: "New York",
              state: "NY",
            },
          },
          {
            id: 2,
            specialization: "Neurology",
            education: "MBBS, DM",
            experience: 8,
            details: {
              name: "Jane Smith",
              phone: "0987654321",
              city: "Los Angeles",
              state: "CA",
            },
          },
        ];

        setDoctors(demoDoctors);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  const handleConsult = (doctorId) => {
    console.log(`Redirecting to consult doctor with ID: ${doctorId}`);
    navigate(`/consult/${doctorId}`); // 👈 Redirect to ConForm page
  };

  return (
    <div className="hospital-doc-bg py-5">
      <Container>
        <h2 className="text-center mb-5 text-primary fw-bold">Our Hospital Doctors</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-center text-muted">No doctors found for this hospital.</p>
        ) : (
          <Row className="g-4 justify-content-center">
            {doctors.map((doc, index) => {
              const { details } = doc;
              return (
                <Col md={6} lg={4} key={index}>
                  <Card className="doctor-card shadow-lg glass-card text-dark">
                    <Card.Body>
                      <Card.Title className="mb-3">
                        <FaUserMd className="me-2 text-primary" />
                        Dr. {details?.name || "Unknown"}
                      </Card.Title>

                      <Card.Text>
                        <FaStethoscope className="me-2 text-muted" />
                        <strong>Specialization:</strong> {doc.specialization || "N/A"}
                      </Card.Text>

                      <Card.Text>
                        <FaGraduationCap className="me-2 text-muted" />
                        <strong>Education:</strong> {doc.education || "N/A"}
                      </Card.Text>

                      <Card.Text>
                        <FaClock className="me-2 text-muted" />
                        <strong>Experience:</strong> {doc.experience || "N/A"} years
                      </Card.Text>

                      <Card.Text>
                        <FaPhone className="me-2 text-muted" />
                        <strong>Phone:</strong> {details?.phone || "N/A"}
                      </Card.Text>

                      <Card.Text>
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        <strong>Location:</strong> {details?.city || "N/A"}, {details?.state || "N/A"}
                      </Card.Text>

                      <Button
                        variant="outline-primary"
                        className="w-100 mt-3"
                        onClick={() => handleConsult(doc.id)} // 👈 Navigate on click
                      >
                        Consult
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HosDocList;
