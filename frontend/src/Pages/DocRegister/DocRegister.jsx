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

import specializations from "../../config/doctors";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DocRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
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

      const payload = { ...formData };

      await axios.post(
        `http://localhost:5000/v1/doctors/${hospitalId}`,
        payload
      );

      alert(t("doctorRegister.success"));
      navigate(role === "hospital" ? "/hos-home" : "/");
    } catch (err) {
      console.error(err);
      alert(t("doctorRegister.error"));
    }
  };

  return (
    <Container className="form-container shadow-lg rounded-4 p-5 mt-5 bg-white">
      <h2 className="text-center mb-4 text-primary fw-bold">
        {t("doctorRegister.title")}
      </h2>
      <Form onSubmit={handleSubmit}>
        <h4 className="section-heading">{t("doctorRegister.personalInfo")}</h4>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaUserMd /></InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            placeholder={t("doctorRegister.fullName")}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaEnvelope /></InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            placeholder={t("doctorRegister.email")}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaLock /></InputGroup.Text>
          <Form.Control
            type="password"
            name="password"
            placeholder={t("doctorRegister.password")}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaPhone /></InputGroup.Text>
          <Form.Control
            type="text"
            name="phone"
            placeholder={t("doctorRegister.phone")}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>{t("doctorRegister.gender")}</InputGroup.Text>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">{t("doctorRegister.gender")}</option>
            <option value="male">{t("doctorRegister.male")}</option>
            <option value="female">{t("doctorRegister.female")}</option>
            <option value="other">{t("doctorRegister.other")}</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>{t("doctorRegister.age")}</InputGroup.Text>
          <Form.Control
            type="number"
            name="age"
            placeholder={t("doctorRegister.age")}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <h4 className="section-heading">{t("doctorRegister.address")}</h4>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="street"
            placeholder={t("doctorRegister.street")}
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
                placeholder={t("doctorRegister.city")}
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
                placeholder={t("doctorRegister.state")}
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
                placeholder={t("doctorRegister.country")}
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
                placeholder={t("doctorRegister.pinCode")}
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h4 className="section-heading">{t("doctorRegister.doctorInfo")}</h4>

        <Form.Group className="mb-3">
          <Form.Select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">{t("doctorRegister.specialization")}</option>
            {specializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text><FaStethoscope /></InputGroup.Text>
              <Form.Control
                type="number"
                name="experience"
                placeholder={t("doctorRegister.experience")}
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text><FaGraduationCap /></InputGroup.Text>
              <Form.Control
                type="text"
                name="education"
                placeholder={t("doctorRegister.education")}
                value={formData.education}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroup.Text><FaMoneyBill /></InputGroup.Text>
          <Form.Control
            type="number"
            name="fees"
            placeholder={t("doctorRegister.fees")}
            value={formData.fees}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
          {t("doctorRegister.register")}
        </Button>
      </Form>
    </Container>
  );
};

export default DocRegister;