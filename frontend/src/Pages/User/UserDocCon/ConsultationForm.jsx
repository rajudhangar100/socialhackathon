import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Card, Spinner, Image } from "react-bootstrap";
import axios from "axios";

// Doctor data defined globally (could be fetched from API in real-world apps)
const dummyDoctors = {
  1: "Dr. John Smith",
  2: "Dr. Emily Watson",
  3: "Dr. Raj Patel",
  4: "Dr. Aisha Khan"
};

const ConsultationForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDoctorName(dummyDoctors[doctorId] || "Your Selected Doctor");
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (image) formData.append("photos", image); // backend expects 'photos' array
    formData.append("description", description);

    try {
      await axios.post(
        `http://localhost:5000/v1/consult/${doctorId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubmitted(true);
      setLoading(false);

      setTimeout(() => {
        alert(`✅ Your consultation has been sent to ${doctorName}.`);
        navigate("/user-home");
      }, 1000);
    } catch (err) {
      console.error("Submission failed:", err);
      setError(err.response?.data?.message || "Failed to send consultation. Please try again.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setDescription("");
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="consult-form-bg py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container>
        <Card className="shadow-lg p-4 rounded-4 border-0 glassy-form">
          <h3 className="text-primary fw-bold mb-3 text-center">📝 Describe Your Symptoms</h3>
          <p className="text-muted text-center mb-4">
            You're consulting <strong>{doctorName}</strong>
          </p>

          {submitted && (
            <Alert variant="success" className="text-center">
              ✅ Submitted successfully!
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="text-center">
              ❌ {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Upload an Image (optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image && (
                <div className="mt-3 text-center">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Uploaded Preview"
                    thumbnail
                    width={150}
                    height={150}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Describe your symptoms</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Describe your issues in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between flex-wrap gap-2 mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Sending...
                  </>
                ) : (
                  "Send to Doctor"
                )}
              </Button>

              <Button variant="secondary" onClick={handleReset} disabled={loading}>
                Reset
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => navigate("/user-home")}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default ConsultationForm;
