import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { ArrowLeft28Regular } from "@fluentui/react-icons"

const AddSubCategory = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    categoryName: "",
    image: null,
    sequence: "",
    status: "Active"
  })

  useEffect(() => {
    if (!Cookies.get("logincrd")) {
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/products")
      setCategories(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const addSubCategory = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.image || !formData.sequence || !formData.categoryName) {
      alert("All fields are required!")
      return
    }

    const data = new FormData()
    data.append("name", formData.name)
    data.append("categoryName", formData.categoryName)
    data.append("image", formData.image)
    data.append("sequence", formData.sequence)
    data.append("status", formData.status)

    try {
      await axios.post("http://localhost:5001/subcategories", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setFormData({
        name: "",
        categoryName: "",
        image: null,
        sequence: "",
        status: "Active"
      })
      navigate("/SubCategory")
    } catch (error) {
      console.error("Error adding subcategory:", error)
    }
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  return (
    <div className="subcategory-container">
      <div className="subcategory-header">
        <Link to="/SubCategory" className="back-button">
          <ArrowLeft28Regular />
        </Link>
        <h3>Add Sub Category</h3>
      </div>

      <form onSubmit={addSubCategory} className="subcategory-form">
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Sub Category Name"
              required
            />
            <label>Sub Category Name</label>
          </div>

          <div className="input-container">
            <select
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <label>Category</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="number"
              value={formData.sequence}
              onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
              placeholder="Sub Category Sequence"
              required
            />
            <label>Sequence</label>
          </div>

          <div className="input-container">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <label>Status</label>
          </div>
        </div>

        <div className="upload-section">
          <label className="upload-label">
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="Preview" />
            ) : (
              <p>Upload Image (Max 10MB)</p>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <div className="button-group">
          <Link to="/SubCategory">
            <button type="button" className="cancel-button">Cancel</button>
          </Link>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddSubCategory
