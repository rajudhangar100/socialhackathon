import React, { useState,useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DocTreat = () => {
  const navigate = useNavigate();
  const { consultId } = useParams();
  const [patientDetails, setPatientDetails] = useState([]);
  
  // const location = useLocation();
  // const patientDetails = location.state?.patientDetails;

  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [mlResults, setMlResults] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const [Doctor,setDoctor]=useState("");

  useEffect(() => {
    const fetchConsults = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");

      if (!user || !token) {
        console.error("No user or token found");
        navigate("/login");
        return;
      }

      setDoctor(user);

      try {
        const response = await axios.get("http://localhost:5000/v1/consult", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const consults = response.data;

        console.log("Fetched Consults:", consults);

        // Map all consults to extract patient data
        const extractedPatients = consults.map((consult) => ({
          id: consult._id || consult.id, // fallback
          name: consult.patient?.name,
          age: consult.patient?.age,
          gender: consult.patient?.gender,
          problemSummary: consult.description,
          fullDetails: consult.patient,
        }));

        console.log("Extracted Patients: ", extractedPatients[0]);
        setPatientDetails(extractedPatients[0]);
      } catch (err) {
        console.error("Failed to fetch consults:", err);
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchConsults();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:5000/v1/prescription/consultations/${consultId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Prescription created successfully!");
      navigate("/doc-home");
    } catch (err) {
      console.error("Failed to create prescription:", err);
      alert("An error occurred while creating the prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setImageFile(file);
  // };

  const formatPredictionText = (pred) => {
    const diagnosis = pred.prediction?.prediction || "Unknown";
    const confidence = (pred.prediction?.confidence * 100 || 0).toFixed(2);
    return `Diagnosis: ${diagnosis}\nConfidence: ${confidence}%`;
  };

  const handleCopy = () => {
    const fullText = mlResults
      .filter((r) => r.success)
      .map((r, i) => `Image ${i + 1}\n${formatPredictionText(r)}\n`)
      .join("\n");

    navigator.clipboard.writeText(fullText).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const handleImageAnalysis = async () => {
    try {

      const res = await fetch('http://localhost:8000/doctor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: patientDetails.problemSummary }),
      });

      const data = await res.json();
      console.log(data);
      setDescription(data.response);
      // Split the response string into an array of questions by line breaks

    } catch (err) {
      console.error(err);
    } 
    // if (!imageFile) {
    //   alert("Please upload an image first.");
    //   return;
    // }

    // const token = localStorage.getItem("accessToken");

    // if (!token) {
    //   alert("Session expired. Please log in again.");
    //   localStorage.clear();
    //   navigate("/login");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("consultId", consultId);
    // formData.append("photos", imageFile);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/v1/ml/upload-ml",
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   const { mlResults } = response.data;
    //   setMlResults(mlResults);
    //   console.log("ML Results:", mlResults);
    // } catch (error) {
    //   console.error("Image analysis failed:", error);
    //   alert("Something went wrong while uploading or analyzing the image.");
    // }
  };

  return (
    <div className="py-5 px-3" style={{ background: "#f0f6ff", minHeight: "100vh" }}>
      <div className="container">
        <h2 className="text-primary mb-4 text-center fw-semibold">
          🩺 Doctor Treatment Panel
        </h2>

        {/* Patient Info Card */}
        <div className="card shadow-sm rounded-4 p-4 mb-5">
          <h4 className="text-secondary mb-3 fw-semibold">👤 Patient Overview</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Name:</strong> {patientDetails?.name || "N/A"}</p>
              <p><strong>Age:</strong> {patientDetails?.age || "N/A"}</p>
              <p><strong>Gender:</strong> {patientDetails?.gender || "N/A"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Problem Summary:</strong> {patientDetails.problemSummary || "Not Provided"}</p>
              <p><strong>Previous History:</strong> {patientDetails.history || "No history provided"}</p>
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="card shadow-sm rounded-4 p-4 mb-5">
          <h4 className="text-secondary mb-3 fw-semibold">🧠 Early Diagnosis For Fast Care</h4>
          <div className="row g-3 align-items-center">
            {/* <div className="col-md-8 col-sm-12">
              <input
                type="file"
                className="form-control form-control-sm rounded-pill"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div> */}
            <div className="col-md-4 col-sm-12 mx-auto">
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={handleImageAnalysis}
              >
                🔍 Analyze Symptoms provided by patient using AI
              </button>
            </div>
          </div>

          {/* Display ML Results */}
          {mlResults.length > 0 && (
            <div className="mt-4">
              <h5 className="text-success fw-semibold mb-3">📊 ML Analysis Result</h5>
              {mlResults.map((res, index) => (
                <div key={index} className="alert alert-light border rounded-3 shadow-sm p-3 mb-3">
                  <p><strong>Image {index + 1}</strong></p>
                  {res.success ? (
                    <>
                      <pre className="mb-0">{formatPredictionText(res)}</pre>
                      {(!res.prediction?.prediction || res.prediction?.prediction === "Unknown") && (
                        <p className="text-warning mt-2">
                          ⚠️ The system could not confidently determine a diagnosis.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-danger">❌ Analysis failed</p>
                  )}
                </div>
              ))}

              <button className="btn btn-outline-secondary mt-2" onClick={handleCopy}>
                📋 Copy Results
              </button>
              {copySuccess && <span className="ms-2 text-success">{copySuccess}</span>}
            </div>
          )}
        </div>

        {/* Prescription Form Card */}
        <div className="card shadow-sm rounded-4 p-4">
          <h4 className="text-secondary mb-3 fw-semibold">📄 Prescription Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Treatment Plan / Medicines
              </label>
              <textarea
                id="description"
                className="form-control rounded-3"
                rows="4"
                style={{ maxWidth: "100%", minWidth: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include diagnosis, tests, medications, suggestions..."
                required
              ></textarea>
            </div>

            

            <div className="d-flex justify-content-end gap-3">
              <button
                type="submit"
                className="btn btn-primary px-4 rounded-pill"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 rounded-pill"
                onClick={() => navigate("/doc-home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocTreat;
