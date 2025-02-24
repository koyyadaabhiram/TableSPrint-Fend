import React, { useEffect, useState, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import {
  Grid20Regular,
  Edit20Regular,
  Delete20Regular,
  TriangleUpFilled,
  TriangleDownFilled
} from "@fluentui/react-icons"
import "./table.css"

const Category = () => {
  const navigate = useNavigate()
  const [category, setcategory] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  useEffect(() => {
    if (!Cookies.get("logincrd")) navigate("/login")
  }, [navigate])

  useEffect(() => {
    axios
      .get("http://localhost:5001/category")
      .then((response) => setcategory(response.data))
      .catch((error) => console.error("Error fetching Category:", error))
  }, [])

  const deletecategory = (id) => {
    return axios
      .delete(`http://localhost:5001/category/${id}`)
      .then(() => setcategory((prev) => prev.filter((category) => category.id !== id)))
      .catch((error) => console.error("Error deleting Category:", error))
  }

  const handleEditClick = (category) => {
    navigate(`/edit-category/${category.id}`, { state: { category } })
  }

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedcategory = useMemo(() => {
    let sortablecategory = [...category]
    if (sortConfig.key) {
      sortablecategory.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1
        return 0
      })
    }
    return sortablecategory
  }, [category, sortConfig])

  const filteredcategory = useMemo(() => {
    return sortedcategory.filter((category) => {
      const searchLower = searchTerm.toLowerCase().trim()
      return (
        String(category.id).includes(searchLower) ||
        category.categoryname.toLowerCase().includes(searchLower) ||
        String(category.sequence).includes(searchLower) ||
        (category.status && category.status.toLowerCase().includes(searchLower))
      )
    })
  }, [sortedcategory, searchTerm])

  const handleDeleteClick = (id) => setDeleteConfirmation(id)

  const confirmDelete = async () => {
    try {
      await deletecategory (deleteConfirmation)
      setDeleteConfirmation(null)
    } catch (error) {
      console.error("Error deleting Category:", error)
    }
  }

  const cancelDelete = () => setDeleteConfirmation(null)

  return (
    <div className="main-content1">
      {deleteConfirmation && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <p>
              <i
                style={{ color: "red", fontSize: "20px", marginRight: "10px" }}
                className="fa-solid fa-triangle-exclamation"
              ></i>
              <l className="mn">Delete</l>
            </p>
            <p className="lop" style={{ marginBottom: "10px", fontSize: "12px" }}>
              Are you sure you want to Delete
            </p>
            <div className="delete-confirmation-buttons">
              <button className="cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="confirm" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="category-container1">
        <div className="dashboard-header1">
          <p className="section-title">
            <Grid20Regular
              className="grid-icon"
              style={{ marginRight: "10px", width: "30px", height: "30px" }}
            />
            Category
            <input
              type="text"
              placeholder="Search by ID, categoryname, Sequence, or Status..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </p>
          <div className="header-right">
            <Link to="/AddCategory">
              <button className="add-btn">Add Category</button>
            </Link>
          </div>
        </div>

        <table className="category-table">
          <thead>
            <tr>
              {["id", "categoryname", "sequence", "status"].map((column) => (
                <th
                  key={column}
                  onClick={() => requestSort(column)}
                  className="sortable-column"
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  <div className="sort-icons">
                    <TriangleUpFilled
                      className={`sort-icon ${
                        sortConfig.key === column && sortConfig.direction === "ascending"
                          ? "active"
                          : ""
                      }`}
                    />
                    <TriangleDownFilled
                      className={`sort-icon ${
                        sortConfig.key === column && sortConfig.direction === "descending"
                          ? "active"
                          : ""
                      }`}
                    />
                  </div>
                </th>
              ))}
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredcategory.length > 0 ? (
              filteredcategory.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.categoryname}</td>
                  <td>{category.sequence}</td>
                  <td>
                    <span
                      className={
                        category.status?.toLowerCase() === "active"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {category.status || "Inactive"}
                    </span>
                  </td>
                  <td>
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="table-category-image" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(category)}>
                      <Edit20Regular />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(category.id)}>
                      <Delete20Regular />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Category available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category
