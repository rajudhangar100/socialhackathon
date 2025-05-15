import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/HomePage/Homepage';
import Login from './Pages/Login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocRegister from './Pages/DocRegister/DocRegister';
import HosRegister from './Pages/HosRegister/HosRegister';
import UserRegister from './Pages/UserRegister/UserRegister';
import UserProfile from './Pages/User/UserProfile/UserProfile';
import UserHome from './Pages/User/UserHome/UserHome';
import DoctorHome from './Pages/Doctor/DocHome';
import HospitalHome from './Pages/Hospital/HosHome';
import DocProfile from './Pages/Doctor/DocProfile';
import DocView from './Pages/Doctor/DocView';
import DocTreat from './Pages/Doctor/DocTreat';
import UserDocCon from './Pages/User/UserDocCon/UserDocCon';
import UserHosCon from './Pages/User/UserHosCon/UserHosCon';
import HosPat from './Pages/Hospital/HosPat';
import HosDocList from './Pages/HosDocList/HosDocList';
import HosPatView from './Pages/Hospital/HosPatView';
import DocList from './Pages/Hospital/DocList';
import ConsultationForm from "./Pages/User/UserDocCon/ConsultationForm";
import ConForm from './Pages/User/UserHosCon/ConsForm';
import UserMedicRec from './Pages/User/UserMedicalRecords/UserMedicRec';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import Footer from './Components/Footer/Footer';
import Talk from './Pages/Talk/Talk';

import i18n from './i18n'; // 🟢 Your i18n config
import Analysis from './Pages/Analysis/Analysis';

// 🔍 Optional: Force Hindi for testing (remove in production)
// i18n.changeLanguage('hi');

// // 🔍 Console debug
// console.log("Current language is:", i18n.language);

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/analysis" element={<Analysis/>} />
            <Route path="/talk" element={<Talk/>} />
            <Route path="/doc-home" element={<DoctorHome />} />
            <Route path="/doctor-profile" element={<DocProfile />} />
            <Route path="/hos-home" element={<HospitalHome />} />
            <Route path="/careers/doctor-reg" element={<DocRegister />} />
            <Route path="/careers/hospitals-reg" element={<HosRegister />} />
            <Route path="/doctor/view/:consultId" element={<DocView />} />
            <Route path="/doctor/treat/:consultId" element={<DocTreat />} />
            <Route path="/consultation/doctor" element={<UserDocCon />} />
            <Route path="/consultation/hospital" element={<UserHosCon />} />
            <Route path="/hospital/:id/doctors" element={<HosDocList />} />
            <Route path="/hospital/patients" element={<HosPat />} />
            <Route path="/patient/:PatientId" element={<HosPatView />} />
            <Route path="/hospital/doctors" element={<DocList />} />
            <Route path="/consultation/:doctorId" element={<ConsultationForm />} />
            <Route path="/consult/:doctorId" element={<ConForm />} />
            <Route path="/doctor/register" element={<DocRegister />} />
            <Route path="/patient/consults" element={<UserMedicRec />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
