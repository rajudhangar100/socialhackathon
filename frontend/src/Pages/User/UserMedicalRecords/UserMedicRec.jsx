import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import {
  FaTimesCircle,
  FaSyncAlt,
  FaFilePrescription,
  FaDownload,
} from "react-icons/fa";
import "./UserMedicRec.css"; // Custom CSS

const placeholderImage = "https://picsum.photos/150?grayscale";

const UserMedicRec = () => {
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/v1/consult", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch consultations");

      const consults = await response.json();

      setConsultations(consults);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleCancelConsult = async (consultId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/v1/consult/${consultId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "cancelled" }),
        }
      );

      if (!response.ok) throw new Error("Cancellation failed");

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultId ? { ...c, status: "cancelled" } : c
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPrescription = async (consultationId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:5000/v1/prescription/consultations/${consultationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch prescription");

      const [data] = await res.json();

      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultationId ? { ...c, prescription: data.description } : c
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading medical records...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Your Medical Records</h2>
        <Button variant="primary" onClick={fetchConsultations}>
          <FaSyncAlt className="me-2" />
          Refresh
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {consultations.length === 0 ? (
        <p className="text-center text-muted">No medical records found</p>
      ) : (
        <Row className="g-4">
          {consultations.map((consult) => (
            <Col md={6} lg={4} key={consult.id}>
              <Card className="h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-primary">
                    Consultation #{consult.id.slice(-6)}
                  </span>
                  <Badge
                    bg={
                      consult.status === "complete"
                        ? "success"
                        : consult.status === "cancelled"
                        ? "secondary"
                        : "warning"
                    }
                  >
                    {consult.status}
                  </Badge>
                </Card.Header>

                <Card.Body className="d-flex flex-column">
                  <Card.Text className="mb-3">
                    <strong>Description:</strong> <br />
                    {consult.description || "No description provided."}
                  </Card.Text>

                  <div className="mb-3">
                    <strong>Photos:</strong>
                    <Row className="mt-2 g-2 justify-content-center">
                      {(consult.photos?.length
                        ? consult.photos
                        : [placeholderImage]
                      ).map((photo, index) => (
                        <Col xs={4} key={index}>
                          <img
                            src={photo}
                            alt={`Consultation pics ${index + 1}`}
                            className="img-fluid rounded border"
                            style={{ height: "80px", objectFit: "cover" }}
                            onError={(e) => (e.target.src = placeholderImage)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="mb-2">
                    <strong>Doctor:</strong>
                    <p>Name: {consult.doctor?.details?.name || "N/A"}</p>
                    <p>
                      Specialization: {consult.doctor?.specialization || "N/A"}
                    </p>
                  </div>

                  <div className="mb-2">
                    <strong>Patient:</strong>
                    <p>Name: {consult.patient?.name || "N/A"}</p>
                    <p>
                      Location: {consult.patient?.city},{" "}
                      {consult.patient?.state}
                    </p>
                  </div>

                  <small className="text-muted">
                    Created on:{" "}
                    {new Date(consult.createdAt).toLocaleDateString()}
                  </small>

                  <div className="mt-3 d-grid gap-2">
                    {consult.status === "completed" && (
                      <>
                        {consult.prescription ? (
                          <Alert
                            variant="light"
                            className="p-2 border-start border-success border-4"
                          >
                            <FaFilePrescription className="me-2 text-success" />
                            <strong>Prescription:</strong>
                            <p className="mb-0">{consult.prescription}</p>
                          </Alert>
                        ) : (
                          <Button
                            variant="outline-success"
                            onClick={() => fetchPrescription(consult.id)}
                          >
                            <FaDownload className="me-2" />
                            Fetch Prescription
                          </Button>
                        )}
                      </>
                    )}
                    {consult.status === "pending" && (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCancelConsult(consult.id)}
                      >
                        <FaTimesCircle className="me-2" />
                        Cancel Consult
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default UserMedicRec;
