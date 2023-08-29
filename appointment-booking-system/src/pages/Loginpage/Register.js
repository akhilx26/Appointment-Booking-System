import React, {useState} from "react";
import "/Users/Akhil Ben Thomas/Desktop/ONESHOT.AI/Assignment/appointment-booking-system/src/styles/styles.css";
import {NavLink} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {registerfunction} from "/Users/Akhil Ben Thomas/Desktop/ONESHOT.AI/Assignment/appointment-booking-system/src/services/Apis"
import {useNavigate} from "react-router-dom";

const Register = () => {

  const [passshow,setPassShow] = useState(false);
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: ""
  });
  // console.log(inputdata);
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const{name,value} = e.target;
    setInputdata({...inputdata,[name]:value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {fname,email,password} = inputdata; //Destructuring
    if(fname===""){
      toast.error("Enter your Name");
    }else if(email===""){
      toast.error("Enter your Email");
    }else if(!email.includes("@")){
      toast.error("Enter valid Email Address");
    }else if(password===""){
      toast.error("Enter Password");
    }else if(password.length<6){
      toast.error("Password must contain more than 6 characters");
    }else{
      // toast.success("User Registered Successfully")
      const response = await registerfunction(inputdata);
      if(response.status===200){
        setInputdata({...inputdata,fname:"",email:"",password:""});
        navigate("/");
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
            <h1>Sign Up</h1>
            <p style={{textAlign:"center"}}>Welcome to Appointment Booking System! We hope you enjoy using this application. Please sign up by entering your details.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input type="text" name="fname" id="" onChange={handleChange} placeholder="Enter your Name"></input>
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="" onChange={handleChange} placeholder="Enter your Email Address"></input>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passshow ? "password" : "text"} name="password" id="" onChange={handleChange} placeholder="Enter your Password"></input>
                <div className="showpass" onClick={()=>setPassShow(!passshow)}>
                  {!passshow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
            <p>
              Already have an account? <NavLink to="/">Login</NavLink> 
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Register;
