import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaRegIdCard, FaBirthdayCake, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const DocProfile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const loggedInDoctor = JSON.parse(localStorage.getItem("user"));
    if (!loggedInDoctor) {
      alert("No user logged in!");
      navigate("/login");
    } else {
      setDoctor(loggedInDoctor);
    }
  }, [navigate]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded">
            <Card.Body>
              <div className="d-flex flex-column align-items-center">
                <div className="text-center mb-4">
                  <h2 className="text-primary">
                    <FaUserMd size={50} /> Dr. {doctor?.name}
                  </h2>
                  <p className="text-muted">Specialty: {doctor?.specialty || "Not Available"}</p>
                </div>
                <div className="mb-3">
                  <h5 className="text-secondary">
                    <FaRegIdCard className="me-2" />
                    ID: {doctor?.id}
                  </h5>
                </div>

                <div className="mb-3">
                  <h5 className="text-secondary">
                    <FaBirthdayCake className="me-2" />
                    Date of Birth: {doctor?.dob ? new Date(doctor.dob).toLocaleDateString() : "Not Available"}
                  </h5>
                </div>

                <div className="mb-3">
                  <h5 className="text-secondary">
                    <FaPhoneAlt className="me-2" />
                    Phone: {doctor?.phone || "Not Available"}
                  </h5>
                </div>

                <div className="mb-3">
                  <h5 className="text-secondary">
                    <MdEmail className="me-2" />
                    Email: {doctor?.email || "Not Available"}
                  </h5>
                </div>

                <div className="mb-3">
                  <h5 className="text-secondary">
                    <FaMapMarkerAlt className="me-2" />
                    Location: {doctor?.location || "Not Available"}
                  </h5>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" onClick={() => navigate("/doc-home")} className="w-100">
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DocProfile;
