// AddCategory.js
import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { ArrowLeft28Regular } from "@fluentui/react-icons"

const AddCategory = () => {
  let navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({ name: "", image: null, sequence: "" })

  useEffect(() => {
    let x = Cookies.get("logincrd")
    if (!x) navigate("/login")
  }, [navigate])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    axios
      .get("http://localhost:5001/products")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error))
  }

  const addCategory = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.image || !formData.sequence) {
      alert("All fields are required!")
      return
    }
    const data = new FormData()
    data.append("name", formData.name)
    data.append("image", formData.image)
    data.append("sequence", formData.sequence)

    axios
      .post("http://localhost:5001/products", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        fetchCategories()
        setFormData({ name: "", image: null, sequence: "" })
        navigate("/Category")
      })
      .catch((error) => console.error("Error adding category:", error))
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  return (
    <div className="add-category-page">
      <div className="add-category-page-header">
        <Link to="/Category" className="add-category-back-link">
          <ArrowLeft28Regular />
        </Link>
        <h3 className="add-category-page-title">Add Category</h3>
      </div>
      <form className="add-category-page-form" onSubmit={addCategory}>
        <div className="add-category-input-row">
          <div className="add-category-input-container">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Category Name"
              required
            />
            <label htmlFor="name">Category Name</label>
          </div>
          <div className="add-category-input-container">
            <input
              type="number"
              name="sequence"
              id="sequence"
              value={formData.sequence}
              onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
              placeholder="Category Sequence"
              required
            />
            <label htmlFor="sequence">Category Sequence</label>
          </div>
        </div>
        <div className="add-category-upload-section">
          <label htmlFor="image" className="add-category-upload-label">
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="Preview" />
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
        <div className="add-category-button-group">
          <Link to="/Category">
            <button type="button" className="add-category-cancel-btn">
              Cancel
            </button>
          </Link>
          <button type="submit" className="add-category-save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
