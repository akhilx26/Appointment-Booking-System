import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "./Loginpage/Dashboard";
import {timeSlot} from "/Users/Akhil Ben Thomas/Desktop/ONESHOT.AI/Assignment/appointment-booking-system/src/services/Apis"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// const userbooking = require("../models/userBooking");
import "./dash.css";

const time = [
  {id:0,time: "08:00AM - 09:00AM"},
  {id:1,time: "09:00AM - 10:00AM"},
  {id:2,time: "10:00AM - 11:00AM"},
  {id:3,time: "11:00AM - 12:00PM"},
  {id:4,time: "12:00PM - 01:00PM"},
  {id:5,time: "01:00PM - 02:00PM"},
  {id:6,time: "02:00PM - 03:00PM"},
  {id:7,time: "03:00PM - 04:00PM"},
  {id:8,time: "04:00PM - 05:00PM"},
  {id:9,time: "05:00PM - 06:00PM"},
  {id:10,time: "Cancel Appointment"}
];

function Times(props) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [t, setT] = useState(false);
  const displayInfo = async(e) => {
    if(e.target.innerText==="Cancel Appointment"){
      toast.success("Appointment Cancelled Successfully!");
    } else{
      const inputdata = {
          time: e.target.innerText,
          date: props.date.toDateString()
      }
      setT(e.target.innerText);
      const response = await timeSlot(inputdata);
      if(response.status===200){
          toast.success("Slot Booked Successfully!");
          setT(true);
      }else if(response.status===201){
          toast.error("Selected Slot is Unavailable");
      }else{
          alert("error");
      }
    }
  }
  
  return (
    <div className="times">
      {time.map((times) => {
        return (
          
            <div key={times.id} className={times.id}>
                <button  
                    onClick={displayInfo}
                    className="button"
                >
                    {" "}
                    {times.time}{" "}
                </button>
            </div>
            
        );
      })}
      <ToastContainer/>
    </div>
  );
}



export default Times;
