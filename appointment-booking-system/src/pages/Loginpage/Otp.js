import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import {userVerify} from "/Users/Akhil Ben Thomas/Desktop/ONESHOT.AI/Assignment/appointment-booking-system/src/services/Apis"
import Spinner from 'react-bootstrap/Spinner';

const Otp = () => {
  const [otp,setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [spinner,setSpinner] = useState(false);

  const LoginUser = async(e) => {
    e.preventDefault();
    if(otp===""){
      toast.error("Enter the OTP");
    }else if(!/[^a-zA-Z]/.test(otp)){
      toast.error("Enter a valid OTP");
    }else if(otp.length<6){
      toast.error("Enter a valid OTP");
    }else{
      setSpinner(true);
      const data = {
        otp,email: location.state
      }
      const response = await userVerify(data);
      // console.log(response);
      // if(response.status===200){
      //   navigate("/dashboard")
      // } else{
      //   toast.error(response.data.error);
      // }
      if(response.status===200){
        localStorage.setItem("userdbtoken",response.data.userToken);
        toast.success(response.data.message);
        
        navigate("/dashboard")
        
        setSpinner(false);
      }else{
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter your OTP</h1>
            <p>A One-Time Password has been sent to your email</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp"></label>
              <input
                type="otp"
                name="otp"
                id=""
                onChange={(e)=>setOtp(e.target.value)}
                placeholder="Enter your OTP"
              ></input>
            </div>
            <button className="btn" onClick={LoginUser}>
              Submit {spinner ? <span><Spinner animation="border" role="status"/></span>:""}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Otp;
