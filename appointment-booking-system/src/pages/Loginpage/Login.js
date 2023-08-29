import React, {useState} from 'react'
import "/Users/Akhil Ben Thomas/Desktop/ONESHOT.AI/Assignment/appointment-booking-system/src/styles/styles.css";
import {NavLink, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {sendOtpFunction} from "/Users/Akhil Ben Thomas/Desktop/ONESHOT.AI/Assignment/appointment-booking-system/src/services/Apis"
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';


const Login = () => {

  const [email,setEmail] = useState("")
  const [spinner,setSpinner] = useState(false);
  const navigate = useNavigate();



  const sendOtp = async(e) => {
    e.preventDefault();          //prevents page reload
    if(email===""){
      toast.error("Enter your Email!");
    }else if(!email.includes("@")){
      toast.error("Enter a valid Email Address!");
    }else{
      setSpinner(true);
      // toast.success("Logged in successfully");
      const data = {
        email: email
      }
      const response = await sendOtpFunction(data);
      // console.log(response);
      alert("OTP has been sent successfully! Click Ok to continue");
      if(response.status===200){
        setSpinner(false);
        navigate("/user/otp",{state:email});
      } else{
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome</h1>
          <p>Glad to have you back. Please Login</p>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email Address"></input>
          </div>
          <button className="btn" onClick={sendOtp}>Login {spinner ? <span><Spinner animation="border" role="status"/></span>:""}</button>
          
          <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Login