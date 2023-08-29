import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";
const Error = () => {
  return (
    <div>
      <h2>You are not Authorised to access this Application!</h2>
      <h3>Please <NavLink to="/">Login</NavLink> or <NavLink to="/register">Sign Up</NavLink></h3>
    </div>
  )
}

export default Error