import React, { useState } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaGraduationCap,
  FaStethoscope,
  FaMoneyBill,
} from "react-icons/fa";
import axios from "axios";
import "./DocRegister.css";

// Import the specializations array
import specializations from "../../config/doctors";
import { useNavigate } from "react-router-dom";

const DocRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",   // added
    age: "",      // added
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    specialization: "",
    experience: "",
    education: "",
    fees: "",
  });
  

  // Function to handle input changes
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
      const user = JSON.parse(localStorage.getItem("user"));
      const hospitalId = user?.id || "67fb6b4daec134dda70de5ae";
      const role = user?.role;
  
      const payload = {
        ...formData,
      };
  
      await axios.post(
        `http://localhost:5000/v1/doctors/${hospitalId}`,
        payload
      );
  
      alert("Doctor registered successfully");
  
      // Redirect based on role
      if (role === "hospital") {
        navigate("/hos-home");
      } else {
        navigate("/");
      }
  
    } catch (err) {
      console.error(err);
      alert("Error registering doctor");
    }
  };
  

  return (
    <Container className="form-container shadow-lg rounded-4 p-5 mt-5 bg-white">
      <h2 className="text-center mb-4 text-primary fw-bold">
        Doctor Registration
      </h2>
      <Form onSubmit={handleSubmit}>
        {/* User Info */}
        <h4 className="section-heading">👤 Personal Information</h4>

        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaUserMd />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaEnvelope />
          </InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaLock />
          </InputGroup.Text>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaPhone />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </InputGroup>

        

        <InputGroup className="mb-3">
          <InputGroup.Text>Gender</InputGroup.Text>
          <Form.Select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Age</InputGroup.Text>
          <Form.Control
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age || ''}
            onChange={handleChange}
            required
          />
        </InputGroup>


        {/* Address */}
        <h4 className="section-heading">📍 Address</h4>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Doctor Info */}
        <h4 className="section-heading">🏥 Doctor Information</h4>

        {/* Specialization Dropdown */}
        <Form.Group className="mb-3">
          <Form.Select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Experience and Education */}
        <Row>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaStethoscope />
              </InputGroup.Text>
              <Form.Control
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaGraduationCap />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Fees */}
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaMoneyBill />
          </InputGroup.Text>
          <Form.Control
            type="number"
            name="fees"
            placeholder="Consultation Fees"
            value={formData.fees}
            onChange={handleChange}
            required
          />
        </InputGroup>

        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          className="w-100 py-2 fw-semibold"
        >
          Register Doctor
        </Button>
      </Form>
    </Container>
  );
};

export default DocRegister;
