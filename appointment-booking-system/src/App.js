import Login from "./pages/Loginpage/Login";
import Dashboard from "./pages/Loginpage/Dashboard";
import Error from "./pages/Loginpage/Error";
import Otp from "./pages/Loginpage/Otp";
import Register from "./pages/Loginpage/Register"; 
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user/otp" element={<Otp/>} />
        <Route path="/*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
