import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!Cookies.get("logincrd")) navigate("/login")
  }, [navigate])

  return (
    <div className="main-content">
      <div className="dashboard">
        <img 
          src="https://s3-alpha-sig.figma.com/img/d59b/e01f/869311531ee26032e175620e2d0b5059?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lN6F3aW5xc-v8I9ezuxOJiyap~2uva5340aiW7nv7kBgl6UBKwVYK58ZGpezIktHEfc346S-K5ov9~W-HYqW0YOsC4HzfYEvfgjt0Jal~fZB~xg6gN2LVnfYZyxjM3zW3YjjYOL6V3Uzxru7HS9KD3S5vxC6fiQMfzc7z~-6VyuTNY6ecrQHYIm-h6~Z1X~E2Bc3pxavn5eqH2XilROa4fdSNWpiccN0HHWC1go6JdKZB0ntredzGrGMsxk0nOm6Djx4fNIVmIdffvbYRuwLk99nXGeo~~R4UK-f4B-FKw8~91jO86jwlhLSisOOqNpFc5ckTKfD~uW6u02D-0m1Nw__" 
          alt="TableSprint Logo" 
          className="logo-img" 
        />
        <h3 className="welcome-text">Welcome to TableSprint Admin</h3>
      </div>
    </div>
  )
}

export default Dashboard
