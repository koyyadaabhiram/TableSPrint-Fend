import React, { useEffect, useState, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { Grid20Regular, Edit20Regular, Delete20Regular, TriangleUpFilled, TriangleDownFilled, List20Regular, List24Filled, List24Regular, AppsList24Filled, AppsList24Regular } from "@fluentui/react-icons"

const SubCategory = () => {  
  const navigate = useNavigate()
  const [subCategories, setSubCategories] = useState([])  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  useEffect(() => {
    if (!Cookies.get("logincrd")) navigate("/login")
  }, [navigate])

  useEffect(() => {
    axios
      .get("http://localhost:5001/subcategories")  
      .then((response) => setSubCategories(response.data))  
      .catch((error) => console.error("Error fetching subcategories:", error))
  }, [])

  const deleteSubCategory = (id) => {
    return axios
      .delete(`http://localhost:5001/subcategories/${id}`)  
      .then(() => setSubCategories((prev) => prev.filter((subCategory) => subCategory.id !== id)))  
      .catch((error) => console.error("Error deleting subcategory:", error))
  }

  const handleEditClick = (subCategory) => {
    navigate(`/edit-subcategory/${subCategory.id}`, { state: { subCategory } })  
  }

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedSubCategories = useMemo(() => {
    let sortableSubCategories = [...subCategories]
    if (sortConfig.key) {
      sortableSubCategories.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1
        return 0
      })
    }
    return sortableSubCategories
  }, [subCategories, sortConfig])

  const filteredSubCategories = useMemo(() => {
    return sortedSubCategories.filter((subCategory) => {
      const searchLower = searchTerm.toLowerCase().trim()
      return (
        String(subCategory.id).includes(searchLower) ||
        subCategory.name.toLowerCase().includes(searchLower) ||
        (subCategory.categoryName && subCategory.categoryName.toLowerCase().includes(searchLower)) ||  
        String(subCategory.sequence).includes(searchLower) ||
        (subCategory.status && subCategory.status.toLowerCase().includes(searchLower))
      )
    })
  }, [sortedSubCategories, searchTerm])

  const handleDeleteClick = (id) => setDeleteConfirmation(id)

  const confirmDelete = async () => {
    try {
      await deleteSubCategory(deleteConfirmation)
      setDeleteConfirmation(null)
    } catch (error) {
      console.error("Error deleting subcategory:", error)
    }
  }

  const cancelDelete = () => setDeleteConfirmation(null)

  return (
    <div className="main-content1">
      {deleteConfirmation && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <p>
              <i style={{ color: "red", fontSize: "20px", marginRight: "10px" }} className="fa-solid fa-triangle-exclamation"></i>
              <l className="mn">Delete</l>
            </p>
            <p className="lop" style={{ marginBottom: "10px", fontSize: "12px" }}>Are you sure you want to Delete</p>
            <div className="delete-confirmation-buttons">
              <button className="cancel" onClick={cancelDelete}>Cancel</button>
              <button className="confirm" onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="category-container1">
        <div className="dashboard-header1">
          <p className="section-title">
            <AppsList24Regular className="grid-icon" style={{ marginRight: "10px", width: "30px", height: "30px" }} />
            Sub Category 
            <input
              type="text"
              placeholder="Search by ID, Name, Category, Sequence, or Status..."  
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </p>
          <div className="header-right">
            <Link to="/AddSubCategory">  
              <button className="add-btn">Add Sub Category</button>  
            </Link>
          </div>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              {["id", "name", "categoryName", "status", "sequence"].map((column) => (  
                <th key={column} onClick={() => requestSort(column)} className="sortable-column">
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  <div className="sort-icons">
                    <TriangleUpFilled
                      className={`sort-icon ${sortConfig.key === column && sortConfig.direction === "ascending" ? "active" : ""}`}
                    />
                    <TriangleDownFilled
                      className={`sort-icon ${sortConfig.key === column && sortConfig.direction === "descending" ? "active" : ""}`}
                    />
                  </div>
                </th>
              ))}
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubCategories.length > 0 ? (
              filteredSubCategories.map((subCategory) => (
                <tr key={subCategory.id}>
                  <td>{subCategory.id}</td>
                  <td>{subCategory.name}</td>
                  <td>{subCategory.categoryName}</td>  
                  <td>
                    <span className={subCategory.status?.toLowerCase() === "active" ? "status-active" : "status-inactive"}>
                      {subCategory.status || "Inactive"}
                    </span>
                  </td>
                  <td>{subCategory.sequence}</td>
                  <td>
                    {subCategory.image ? (
                      <img src={subCategory.image} alt={subCategory.name} className="table-product-image" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(subCategory)}>
                      <Edit20Regular />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(subCategory.id)}>
                      <Delete20Regular />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Sub Category available</td>  
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default SubCategory
