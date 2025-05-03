import { Link } from "react-router-dom";
import React from 'react'

function Navbar() {
  
    return (
    <div>
        <nav>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="dashboard" >Dashboard</Link></li>
        </nav>
    </div>
  )
}

export default Navbar