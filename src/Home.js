import React, { useEffect, useState } from "react"
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import { AppsList20Regular, Box20Regular, Grid20Regular, Home24Regular, PersonCircle32Regular, Play16Filled } from "@fluentui/react-icons"
import Logo from './Logo.png'

const Home = () => {
  let navigate = useNavigate()
  const location = useLocation()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    if (!Cookies.get("logincrd")) navigate("/login")
  }, [navigate])

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    Cookies.remove("logincrd")
    navigate("/login")
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <div className="home-container">
      <div className="topbar">
        <div className="top">
          <img className="lp logo" src={Logo} alt="Logo" />
          <h2 className="title">TableSprint</h2>
        </div>

        <span className="user-icon">
          <button onClick={handleLogoutClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <PersonCircle32Regular style={{ marginRight: "15px", color: "white" }} />
          </button>
        </span>
      </div>

      <div className="content-wrapper">
        <div className="sidebar">
          <ul className="menu">
            <Link to="/Dashboard">
              <li className={location.pathname === "/Dashboard" ? "active" : ""}>
                <Home24Regular style={{ marginLeft: "10px", marginRight: "12px" }} />
                Dashboard
                <Play16Filled style={{ marginLeft: "70px" }} />
              </li>
            </Link>
            <Link to="/Category">
              <li className={location.pathname === "/Category" ? "active" : ""}>
                <Grid20Regular style={{ marginLeft: "10px", marginRight: "12px" }} />
                Category
                <Play16Filled style={{ marginLeft: "87.5px" }} />
              </li>
            </Link>
            <Link to="/Subcategory">
              <li className={location.pathname === "/Subcategory" ? "active" : ""}>
                <AppsList20Regular style={{ marginLeft: "10px", marginRight: "12px" }} />
                Subcategory
                <Play16Filled style={{ marginLeft: "62.5px" }} />
              </li>
            </Link>
            <Link to="/Products">
              <li className={location.pathname === "/Products" ? "active" : ""}>
                <Box20Regular style={{ marginLeft: "10px", marginRight: "12px" }} />
                Products
                <Play16Filled style={{ marginLeft: "89.3px" }} />
              </li>
            </Link>
          </ul>
        </div>

        <div className="main-content">
          <Outlet />
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-modal">
            <p> <i style={{color:"red", fontSize:"20px", marginRight:"10px"}} class="fa-solid fa-triangle-exclamation"></i><l className="mn">Log Out</l></p>
            <p className="lop">Are you sure you want to log out?</p>
            <div className="logout-confirm-buttons">
              <button onClick={cancelLogout} className="cancel-btn">Cancel</button>
              <button onClick={confirmLogout} className="confirm-btn">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
