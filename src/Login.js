import axios from 'axios'
import React, { useContext, useState} from 'react'
import { useNavigate , Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Ct from './Ct'
import './App.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [data, setData] = useState({ email: '', pwd: '' })
  const [msg, setMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const obj = useContext(Ct)

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  const validatePassword = (pwd) => pwd.length >= 6

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const handleLogin = () => {
    if (!validateEmail(data.email)) {
      setMsg('Invalid email format')
      return
    }
    if (!validatePassword(data.pwd)) {
      setMsg('Password must be at least 6 characters long')
      return
    }

    axios.post('http://localhost:5001/login', data)
      .then((res) => {
        if (!res.data.token) {
          setMsg(res.data.msg)
        } else {
          Cookies.set('logincrd', JSON.stringify(res.data))
          obj.updfun({ f: true })
          navigate('/Dashboard')
          obj.updfun({ f: !obj.f })
        }
      })
      .catch(() => setMsg('Login failed. Please try again.'))
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
          src="https://s3-alpha-sig.figma.com/img/d59b/e01f/869311531ee26032e175620e2d0b5059?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lN6F3aW5xc-v8I9ezuxOJiyap~2uva5340aiW7nv7kBgl6UBKwVYK58ZGpezIktHEfc346S-K5ov9~W-HYqW0YOsC4HzfYEvfgjt0Jal~fZB~xg6gN2LVnfYZyxjM3zW3YjjYOL6V3Uzxru7HS9KD3S5vxC6fiQMfzc7z~-6VyuTNY6ecrQHYIm-h6~Z1X~E2Bc3pxavn5eqH2XilROa4fdSNWpiccN0HHWC1go6JdKZB0ntredzGrGMsxk0nOm6Djx4fNIVmIdffvbYRuwLk99nXGeo~~R4UK-f4B-FKw8~91jO86jwlhLSisOOqNpFc5ckTKfD~uW6u02D-0m1Nw__" 
          alt="TableSprint Logo" className="logo-img" 
        />
        <p className="login-header">Welcome to TableSprint Admin</p>
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          onChange={handleChange}
          value={data.email}
          className="login-input"
        />
        
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="pwd"
            placeholder="Password"
            onChange={handleChange}
            value={data.pwd}
            className="login-input password-input"
          />
          <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="forgot-password"><Link to="/reg">You don't have an account? Register now!</Link></p>
        <button onClick={handleLogin} className="login-button">Log In</button>
        {msg && <p className="error-message">{msg}</p>}
      </div>
    </div>
  )
}

export default Login
