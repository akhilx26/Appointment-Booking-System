import React, { useState,useEffect } from "react";
import Calendar from "react-calendar";
import "../dash.css";
import Time from "../Time.js"
import {useNavigate} from "react-router-dom"

const Dashboard = () => {


  const navigate = useNavigate();
  const userValid = () =>{
    let token = localStorage.getItem("userdbtoken");
    if(token){
      console.log("User Valid");
    }else{
      navigate("*")
    }
  }

  useEffect(()=>{
    userValid();
  },[])

  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  return (
    <div className="app">
      {/* <h1>Appointment Booking</h1> */}
      <h2 className="title">Choose a Date</h2>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={() => setShowTime(true)}
          minDate={new Date()}
        />
      </div>
      <Time showTime={showTime} date={date} />
    </div>
  );
};

export default Dashboard;
