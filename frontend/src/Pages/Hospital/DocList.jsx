import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import {
  FaUserMd,
  FaGraduationCap,
  FaClock,
  FaStethoscope,
  FaPhone,
  FaMapMarkerAlt,
  FaPlusCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Hospital/DocList";

const DocList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user"));
        const hospitalId = user?.id;

        if (!hospitalId) {
          throw new Error("Hospital ID not found in local storage");
        }

        const response = await axios.get(
          `http://localhost:5000/v1/hospital/${hospitalId}/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data;
        let doctorsData = [];

        if (Array.isArray(responseData)) {
          doctorsData = responseData;
        } else if (responseData?.doctors) {
          doctorsData = responseData.doctors;
        } else if (responseData?.data) {
          doctorsData = responseData.data;
        }

        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
        setDoctors([
          {
            id: 1,
            specialization: "Cardiology",
            education: "MBBS, MD (Cardiology)",
            experience: 10,
            details: {
              name: "John Doe",
              phone: "1234567890",
              city: "Mumbai",
              state: "Maharashtra",
            },
          },
          {
            id: 2,
            specialization: "Neurology",
            education: "MBBS, DM (Neurology)",
            experience: 8,
            details: {
              name: "Jane Smith",
              phone: "0987654321",
              city: "Delhi",
              state: "Delhi",
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAddDoctor = () => {
    navigate("/doctor/register");
  };

  const handleDeleteDoctor = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        alert("Authentication required. Please login again.");
        return;
      }
  
      const response = await axios.delete(
        `http://localhost:5000/v1/doctors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Doctor deleted successfully");
  
        // Instead of reloading the page, just update the state
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.id !== id)
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(
        `Deletion failed: ${error.response?.data?.message || error.message}`
      );
    }
  };
  

  if (loading) {
    return (
      <div className="hospital-doc-bg py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading doctors...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="hospital-doc-bg py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary fw-bold">Our Hospital Doctors</h2>
          <Button variant="outline-primary" onClick={handleAddDoctor}>
            <FaPlusCircle className="me-2" />
            Add Doctor
          </Button>
        </div>

        {doctors.length === 0 ? (
          <Alert variant="warning" className="text-center">
            No doctors found in this hospital.
          </Alert>
        ) : (
          <Row className="g-4">
            {doctors.map((doctor) => (
              <Col md={6} lg={4} key={doctor.id}>
                <Card className="shadow-lg border-0 h-100 doctor-card-style">
                  <div className="position-relative">
                    <div className="bg-primary text-white text-center py-3">
                      <FaUserMd size={40} />
                      <h5 className="mt-2">Dr. {doctor.details.name}</h5>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2 rounded-circle"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                  <Card.Body>
                    <Card.Text>
                      <FaStethoscope className="me-2 text-muted" />
                      <strong>Specialization:</strong> {doctor.specialization}
                    </Card.Text>
                    <Card.Text>
                      <FaGraduationCap className="me-2 text-muted" />
                      <strong>Education:</strong> {doctor.education}
                    </Card.Text>
                    <Card.Text>
                      <FaClock className="me-2 text-muted" />
                      <strong>Experience:</strong> {doctor.experience} years
                    </Card.Text>
                    <Card.Text>
                      <FaPhone className="me-2 text-muted" />
                      <strong>Phone:</strong> {doctor.details.phone}
                    </Card.Text>
                    <Card.Text>
                      <FaMapMarkerAlt className="me-2 text-muted" />
                      <strong>Location:</strong> {doctor.details.city},{" "}
                      {doctor.details.state}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DocList;
