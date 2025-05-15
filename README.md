
# CareConnect – AI-Powered Healthcare Platform 🏥🤖

CareConnect is a full-stack AI-powered healthcare platform developed during Social Hackathon at CMRIT. It integrates a modern web stack and intelligent assistants (via Groq API) to connect patients, doctors, and hospitals through a secure and intelligent interface.


## 🚀 Features

- 🔒 Role-based authentication for Patients, Doctors, and Hospitals  
- 📅 Appointment scheduling and doctor-patient assignment  
- 🧑‍⚕️ Doctor dashboard for managing appointments and patient data  
- 🏥 Hospital dashboard for viewing doctor activities and patient load  
- 🧠 Smart AI-powered language support and health assistance (Groq API)  
- 📁 Cloud storage using Cloudinary and MongoDB Atlas  
- ⚛️ Fully responsive UI built with React.js  
- 🧪 JWT-based secure authentication and session management
- 🧬 Symptom checker chatbot using NLP
- 🌍 Internationalization & language support

---

## 🛠️ Tech Stack

### 🌐 Frontend
- React.js
- React Router
- Bootstrap
- Animate.css

### 🤖 AI Integration
- Groq API (LLM interface via Python)
- FastAPI

### 🔧 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Cloudinary
- Bcrypt

---

## 📁 Project Structure

```

CareConnect/
├── backend/           # Node.js Backend API
├── frontend/          # React Frontend
├── groqapi/           # FastAPI + Groq LLM-based APIs
└── README.md          # Documentation

````

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository

git clone https://github.com/rajudhangar100/socialhackathon.git
cd socialhackathon


---

### 2️⃣ Backend Setup (Node.js + Express)


cd backend
npm install


#### Create a `.env` file in the `backend/` directory with the following content:


PORT=5000
MONGODB_URL=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret
CLOUD_API_SECRET=your_cloudinary_api_secret
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_NAME=your_cloudinary_cloud_name


#### Run the Backend Server

npm start


Server will run at: `http://localhost:5000`

---

### 3️⃣ Frontend Setup (React.js)


cd ../frontend
npm install
npm start


Frontend will run at: `http://localhost:3000`

---

### 4️⃣ Groq API Setup (FastAPI)


cd ../groqapi
python -m venv venv
source venv/bin/activate  # Or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload


Groq API will run at: `http://127.0.0.1:8000`

> Ensure you have a valid Groq API key set in your environment or code.

---

## 📦 Running All Modules Together

Open 3 terminals/tabs and run the following in parallel:

### Terminal 1 – Backend


cd backend
npm start


### Terminal 2 – Frontend


cd frontend
npm start


### Terminal 3 – Groq API Server


cd groqapi
source venv/bin/activate  # Or venv\Scripts\activate on Windows
uvicorn main:app --reload


---

## 🔮 Future Scope

* 📹 Add real-time video consultation with WebRTC
* 📲 Create a mobile app version using React Native or Flutter
* 🔐 Blockchain integration for secure medical history

---

## 🤝 Contributing

We welcome community contributions! To get started:


1. Fork the repo
2. Create your feature branch: git checkout -b feature/FeatureName
3. Commit your changes: git commit -m "Add new feature"
4. Push to the branch: git push origin feature/FeatureName
5. Open a Pull Request 🚀


---

## 🧑‍💻 Team

### 👤 Raju Dhangar

📧 Email: [rajudhangartayappa@gmail.com](mailto:rajudhangartayappa@gmail.com)
🔗 [GitHub](https://github.com/rajudhangar100)

---
### 👤 Antriksh Vats

📧 Email: [antrikshvatss@gmail.com](mailto:antrikshvatss@gmail.com)
🔗 [GitHub](https://github.com/antrikshvats)

---### 👤 Darshan Chavan

📧 Email: [darshanchavan.cs23@rvce.edu.in](mailto:darshanchavan.cs23@rvce.edu.in)
🔗 [GitHub](https://github.com/darshanup)

---### 👤 Rahul Rathod

📧 Email: [rahullaxmanr.cs23@rvce.edu.in](mailto:rahullaxmanr.cs23@rvce.edu.in)
🔗 [GitHub](https://github.com/rahulrathod64)



