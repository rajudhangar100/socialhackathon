// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HospitalPatients = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const id=JSON.parse(localStorage.getItem('user')).id;
//   useEffect(() => {
//     const fetchPatients = async () => {
//         try {
//             const token = localStorage.getItem("accessToken");
//             const response = await axios.get(`http://localhost:5000/v1/hospital/${id}/patients`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//         setPatients(response.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load patients. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatients();
//   }, [id]);

//   if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status" /></div>;

//   if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

//   return (
//     <div className="container mt-5">
//       <h2 className="text-primary text-center mb-4">Registered Patients</h2>
//       {patients.length === 0 ? (
//         <p className="text-muted text-center">No patients registered for this hospital yet.</p>
//       ) : (
//         <div className="table-responsive shadow-sm rounded-4">
//           <table className="table table-hover">
//             <thead className="table-primary">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((patient, index) => (
//                 <tr key={patient.id}>
//                   <td>{index + 1}</td>
//                   <td>{patient.name}</td>
//                   <td>{patient.email}</td>
//                   <td>{patient.phone}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HospitalPatients;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HospitalPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 👈 used for navigation

  const id = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`http://localhost:5000/v1/hospital/${id}/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load patients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [id]);

  // 🔹 Function to navigate to a specific patient’s profile
  const handleViewProfile = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status" /></div>;

  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-primary text-center mb-4">Registered Patients</h2>
      {patients.length === 0 ? (
        <p className="text-muted text-center">No patients registered for this hospital yet.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded-4">
          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{index + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill"
                      onClick={() => handleViewProfile(patient.id)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HospitalPatients;
