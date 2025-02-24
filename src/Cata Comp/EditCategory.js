import React, { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation, Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import { ArrowLeft28Regular } from "@fluentui/react-icons"

const EditCategory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = location.state

  const [formData, setFormData] = useState({
    categoryname: category.categoryname,
    sequence: category.sequence,
    image: null,
    previewImage: category.image,
    status: category.status || "Active"
  })

  useEffect(() => {
    if (!Cookies.get("logincrd")) navigate("/login")
  }, [navigate])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("categoryname", formData.categoryname)
    data.append("sequence", formData.sequence)
    data.append("status", formData.status)
    if (formData.image) {
      data.append("image", formData.image)
    }

    try {
      await axios.put(`http://localhost:5001/category/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      navigate("/Category")
    } catch (error) {
      console.error("Error updating Category:", error)
    }
  }

  return (
    <div className="edit-category-container">
      <div className="edit-category-header">
        <Link to="/Category" className="edit-back-link">
          <ArrowLeft28Regular />
        </Link>
        <h3 className="edit-category-title">Edit Category</h3>
      </div>
      <form className="edit-category-form" onSubmit={handleSave}>
        <div className="edit-input-row">
          <div className="edit-input-container">
            <input
              type="text"
              name="categoryname"
              id="name"
              value={formData.categoryname}
              onChange={handleInputChange}
              placeholder="Category Name"
              required
            />
            <label htmlFor="name">Category Name</label>
          </div>
          <div className="edit-input-container">
            <input
              type="number"
              name="sequence"
              id="sequence"
              value={formData.sequence}
              onChange={handleInputChange}
              placeholder="Category Sequence"
              required
            />
            <label htmlFor="sequence">Category Sequence</label>
          </div>
          <select name="status" id="status" value={formData.status} onChange={handleStatusChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="edit-upload-image-section">
          <label htmlFor="image" className="edit-upload-image-label">
            {formData.previewImage ? (
              <img src={formData.previewImage} alt="Preview" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-image"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>
                <p>Upload Maximum allowed file size is 10MB</p>
              </>
            )}
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="edit-button-group">
          <Link to="/Category">
            <button type="edit-button" className="edit-cancel-btn">
              Cancel
            </button>
          </Link>
          <button type="submit" className="edit-save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCategory
