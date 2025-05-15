// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';
// import './UserRegister.css';

// const UserRegister = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     pinCode: '',
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;



//     if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
//     if (!passwordRegex.test(formData.password))
//       newErrors.password = 'Minimum 8 characters with at least one letter and one number';
//     Object.entries(formData).forEach(([key, value]) => {
//       if (!value.trim()) newErrors[key] = 'This field is required';
//     });

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;
  
//     try {
//       // Make sure the URL matches your backend endpoint
//       await axios.post('http://localhost:5000/v1/auth/register', formData);
//       alert('User registered successfully!');
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//         phone: '',
//         street: '',
//         city: '',
//         state: '',
//         country: '',
//         pinCode: '',
//       });
//     } catch (err) {
//       console.error(err);
//       alert('Registration failed. Please try again.');
//     }
//   };
  

//   return (
//     <Container className="user-register-container">
//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <Card className="p-4 shadow-lg user-register-card border-0 rounded-4">
//             <Card.Body>
//               <h2 className="text-center mb-4 text-primary">User Registration</h2>
//               <Form onSubmit={handleSubmit}>

//                 {[
//                   { label: 'Full Name', name: 'name', type: 'text', placeholder: 'e.g., John Doe' },
//                   { label: 'Email Address', name: 'email', type: 'email', placeholder: 'e.g., john@example.com' },
//                   { label: 'Password', name: 'password', type: 'password', placeholder: '********' },
//                   { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'e.g., +91-9876543210' },
//                   { label: 'Street', name: 'street', type: 'text', placeholder: '123 Street Name' },
//                   { label: 'City', name: 'city', type: 'text', placeholder: 'e.g., Mumbai' },
//                   { label: 'State', name: 'state', type: 'text', placeholder: 'e.g., Maharashtra' },
//                   { label: 'Country', name: 'country', type: 'text', placeholder: 'e.g., India' },
//                   { label: 'Pin Code', name: 'pinCode', type: 'text', placeholder: 'e.g., 400001' },
//                 ].map((field) => (
//                   <Form.Group as={Row} className="mb-3 align-items-center" key={field.name}>
//                     <Form.Label column md={4} className="text-md-end form-label-custom">
//                       {field.label}
//                     </Form.Label>
//                     <Col md={8}>
//                       <Form.Control
//                         type={field.type}
//                         name={field.name}
//                         placeholder={field.placeholder}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         className="stylish-input"
//                         isInvalid={!!errors[field.name]}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors[field.name]}
//                       </Form.Control.Feedback>
//                     </Col>
//                   </Form.Group>
//                 ))}

//                 <div className="d-grid mt-4">
//                   <Button type="submit" variant="primary" size="lg">
//                     Register
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserRegister;
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './UserRegister.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    age: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!passwordRegex.test(formData.password))
      newErrors.password = 'Minimum 8 characters with at least one letter and one number';

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim() && key !== 'gender' && key !== 'age') {
        newErrors[key] = 'This field is required';
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post('http://localhost:5000/v1/auth/register', formData);
      alert('User registered successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        age: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
      });
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="user-register-container">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4 shadow-lg user-register-card border-0 rounded-4">
            <Card.Body>
              <h2 className="text-center mb-4 text-primary">User Registration</h2>
              <Form onSubmit={handleSubmit}>

                {[
                  { label: 'Full Name', name: 'name', type: 'text', placeholder: 'e.g., John Doe' },
                  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'e.g., john@example.com' },
                  { label: 'Password', name: 'password', type: 'password', placeholder: '********' },
                  { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'e.g., +91-9876543210' },
                ].map((field) => (
                  <Form.Group as={Row} className="mb-3 align-items-center" key={field.name}>
                    <Form.Label column md={4} className="text-md-end form-label-custom">
                      {field.label}
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="stylish-input"
                        isInvalid={!!errors[field.name]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[field.name]}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                ))}

                {/* Gender Dropdown */}
                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column md={4} className="text-md-end form-label-custom">
                    Gender
                  </Form.Label>
                  <Col md={8}>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="stylish-input"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Age Input */}
                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column md={4} className="text-md-end form-label-custom">
                    Age
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="e.g., 30"
                      value={formData.age}
                      onChange={handleChange}
                      className="stylish-input"
                    />
                  </Col>
                </Form.Group>

                {[
                  { label: 'Street', name: 'street', type: 'text', placeholder: '123 Street Name' },
                  { label: 'City', name: 'city', type: 'text', placeholder: 'e.g., Mumbai' },
                  { label: 'State', name: 'state', type: 'text', placeholder: 'e.g., Maharashtra' },
                  { label: 'Country', name: 'country', type: 'text', placeholder: 'e.g., India' },
                  { label: 'Pin Code', name: 'pinCode', type: 'text', placeholder: 'e.g., 400001' },
                ].map((field) => (
                  <Form.Group as={Row} className="mb-3 align-items-center" key={field.name}>
                    <Form.Label column md={4} className="text-md-end form-label-custom">
                      {field.label}
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="stylish-input"
                        isInvalid={!!errors[field.name]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[field.name]}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                ))}

                <div className="d-grid mt-4">
                  <Button type="submit" variant="primary" size="lg">
                    Register
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

export default UserRegister;
