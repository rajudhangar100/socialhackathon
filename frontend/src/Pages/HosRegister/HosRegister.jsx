import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import '../HosRegister/HosRegister.css';

const HospitalRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    role:'hospital'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/v1/auth/register', formData);
      alert('Hospital registered successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        role: 'hospital',
      });
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10} md={11}>
          <Card className="shadow-lg p-4 border-0 rounded-4">
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold text-primary">Hospital Registration</h2>
              <Form onSubmit={handleSubmit}>

                {/* Basic Information */}
                <h5 className="mt-4 text-secondary fw-semibold">Basic Information</h5>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Hospital Name</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Sunshine Medical Center"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Email</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="email"
                      placeholder="example@hospital.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Password</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="password"
                      placeholder="********"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Phone Number</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="+91-XXXXXXXXXX"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                {/* Address Information */}
                <h5 className="mt-4 text-secondary fw-semibold">Address Information</h5>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Street</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="street"
                      placeholder="123, Main Street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">City</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="e.g., Chennai"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">State</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="e.g., Tamil Nadu"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Country</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="e.g., India"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col md={4}>
                    <Form.Label className="form-label-left">Pin Code</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="pinCode"
                      placeholder="e.g., 600001"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                      className="stylish-input"
                    />
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <Button variant="primary" type="submit" size="lg">
                    Register Hospital
                  </Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HospitalRegister;
