import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Reg = () => {
    const [data, setData] = useState({ email: "", name: "", pwd: "" })
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email.trim()) // Trim spaces before validation
    }

    const validatePassword = (pwd) => pwd.length >= 6

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const register = () => {
        const { email, name, pwd } = data

        if (!validateEmail(email)) {
            setMsg("Invalid email format")
            return
        }
        if (name.trim() === "") {
            setMsg("Name cannot be empty")
            return
        }
        if (!validatePassword(pwd)) {
            setMsg("Password must be at least 6 characters long")
            return
        }

        axios.post("http://localhost:5001/reguser", data)
            .then((res) => {
                if (res.data.msg === "Registration successful") {
                    navigate("/login")
                } else {
                    setMsg(res.data.msg)
                }
            })
            .catch(() => {
                setMsg("Registration failed. Please check your network and try again.")
            })
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="https://s3-alpha-sig.figma.com/img/d59b/e01f/869311531ee26032e175620e2d0b5059?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lN6F3aW5xc-v8I9ezuxOJiyap~2uva5340aiW7nv7kBgl6UBKwVYK58ZGpezIktHEfc346S-K5ov9~W-HYqW0YOsC4HzfYEvfgjt0Jal~fZB~xg6gN2LVnfYZyxjM3zW3YjjYOL6V3Uzxru7HS9KD3S5vxC6fiQMfzc7z~-6VyuTNY6ecrQHYIm-h6~Z1X~E2Bc3pxavn5eqH2XilROa4fdSNWpiccN0HHWC1go6JdKZB0ntredzGrGMsxk0nOm6Djx4fNIVmIdffvbYRuwLk99nXGeo~~R4UK-f4B-FKw8~91jO86jwlhLSisOOqNpFc5ckTKfD~uW6u02D-0m1Nw__" 
                    alt="Register"
                />
                <p className="login-header">Register to TableSprint</p>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} value={data.email} className="login-input" />
                <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} value={data.name} className="login-input" />
                <input type="password" name="pwd" placeholder="Enter Password" onChange={handleChange} value={data.pwd} className="login-input" />
                <button type="submit" onClick={register} className="login-button">Register</button>
                {msg && <p className="error-message">{msg}</p>}
            </div>
        </div>
    )
}

export default Reg
