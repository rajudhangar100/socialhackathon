import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../HosRegister/HosRegister.css';

const HospitalRegister = () => {
  const { t } = useTranslation();

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
    role: 'hospital'
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
              <h2 className="text-center mb-4 fw-bold text-primary">
                {t('hospital.title')}
              </h2>

              <Form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <h5 className="mt-4 text-secondary fw-semibold">{t('hospital.basicInfo')}</h5>

                {[
                  { name: 'name', label: t('hospital.name'), placeholder: 'Sunshine Medical Center' },
                  { name: 'email', label: t('hospital.email'), placeholder: 'example@hospital.com' },
                  { name: 'password', label: t('hospital.password'), placeholder: '********' },
                  { name: 'phone', label: t('hospital.phone'), placeholder: '+91-XXXXXXXXXX' }
                ].map(({ name, label, placeholder }) => (
                  <Row key={name} className="mb-3 align-items-center">
                    <Col md={4}><Form.Label className="form-label-left">{label}</Form.Label></Col>
                    <Col md={8}>
                      <Form.Control
                        type={name === 'password' ? 'password' : 'text'}
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        className="stylish-input"
                      />
                    </Col>
                  </Row>
                ))}

                {/* Address Information */}
                <h5 className="mt-4 text-secondary fw-semibold">{t('hospital.addressInfo')}</h5>

                {[
                  { name: 'street', label: t('hospital.street'), placeholder: '123, Main Street' },
                  { name: 'city', label: t('hospital.city'), placeholder: 'Chennai' },
                  { name: 'state', label: t('hospital.state'), placeholder: 'Tamil Nadu' },
                  { name: 'country', label: t('hospital.country'), placeholder: 'India' },
                  { name: 'pinCode', label: t('hospital.pin'), placeholder: '600001' }
                ].map(({ name, label, placeholder }) => (
                  <Row key={name} className="mb-3 align-items-center">
                    <Col md={4}><Form.Label className="form-label-left">{label}</Form.Label></Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        className="stylish-input"
                      />
                    </Col>
                  </Row>
                ))}

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <Button variant="primary" type="submit" size="lg">
                    {t('hospital.submit')}
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
