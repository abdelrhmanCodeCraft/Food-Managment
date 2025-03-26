import React, { useEffect, useState } from "react";
import Header from "../../shared/Header/Header";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import NoData from "../../shared/NoData/NoData";
import another from "../../../assets/images/another.png";
import group from "../../../assets/images/Group 48102290.png";
import {IMAGE_URL} from "../../../Services/api/apiConfig"
import { privateApiInstance } from "../../../Services/api/apiInstance";
import {RECIPES_URL} from '../../../Services/api/apiConfig'
import noImage from '../../../assets/images/Group 48102290.png'
import { FaSearch } from "react-icons/fa";
import { TAGS_URL, CATEGORIES_URL } from "../../../Services/api/apiConfig";
import {
  InputGroup,
  FormControl,
} from "react-bootstrap";



const RecipeList = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [name, setName] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const fetchRecipes = async (pageSize, pageNumber, name, tag, cat) => {
    try {
      const response = await privateApiInstance.get(
        RECIPES_URL.GET_RECIPES,
        {
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            name: name,
            tagId: tag,
            categoryId: cat,
          },
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log("recopeee", response);
      setRecipeList(response.data.data || []);
      setArrayOfPages(
        [...Array(response?.data.totalNumberOfPages).keys()].map((i) => i + 1)
      );
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async () => {
    try {
      await privateApiInstance.delete(RECIPES_URL.DELETE_RECIPE(selectedId), {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setRecipeList((prevList) =>
        prevList.filter((recipe) => recipe.id !== selectedId)
      );
      handleClose();
      toast.success("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const fetchCategories = async () => {
    console.log("Fetching categories...");
    try {
      const response = await privateApiInstance.get(
        CATEGORIES_URL.GET_CATEGORY,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Response received:", response);
      setCategories(response.data.data || []);
    } catch (error) {
      toast.error("Error fetching categories");
      console.error("Fetching Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTage = async () => {
    try {
      const response = await privateApiInstance.get(TAGS_URL.GET_TAG);
      console.log("Response receiveeee:", response.data);
      setTags(response.data);
    } catch (error) {
      toast.error("Error fetching categories");
      console.error("Fetching Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(3, 1, name); 
    fetchCategories();
    fetchTage();
  }, []); 

  const getNameValue = (e) => {
    setName(e.target.value);
    console.log("Searching for:", e.target.value);
  };


  return (
    <div className="recipes-container">
      <Header
        title="Recipes List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        img={another}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ position: "relative" }}>
          <div className="text-center">
            <div
              onClick={handleClose}
              className="icon"
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "1rem",
                color: "red",
                border: "2px solid red",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IoCloseSharp />
            </div>
            <img className="w-25 mb-3" src={group} alt="no data" />
            <h5>Delete this recipe?</h5>
            <p>
              Are you sure you want to delete this recipe? Click delete to
              confirm.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="d-flex align-items-center  gap-3 mb-4"
        style={{ width: "95%", margin: "auto", marginTop: "4rem" }}
      >
        <InputGroup style={{ width: "60rem", height: "3rem" }}>
          <FormControl
            type="text"
            placeholder="Search..."
            // value={searchTerm}
            onChange={getNameValue}
          />
          <InputGroup.Text onClick={handleSearch} style={{ cursor: "pointer" }}>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>

        <div className="col md-3 select-tag">
          <select className="form-select">
            {tags.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="col md-3 select-category">
          <select className="form-select">
            {categories.map(({ id, name }) => (
              <option value="id" key={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="title d-flex justify-content-between p-4"
        style={{ width: "99%", margin: "auto" }}
      >
        <div className="left">
          <h1>Recipes Table Details</h1>
          <span>You can check all details</span>
        </div>
        <div className="right">
          <button className="btn btn-success">Add New Recipe</button>
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr className="head-table color-black">
              <th style={{ padding: "1rem", background: "#EEE" }}>#</th>
              <th style={{ padding: "1rem", background: "#EEE" }}>Name</th>
              <th style={{ padding: "1rem", background: "#EEE" }}>Image</th>
              <th style={{ padding: "1rem", background: "#EEE" }}>Price</th>
              <th style={{ padding: "1rem", background: "#EEE" }}>
                Description
              </th>
              <th style={{ padding: "1rem", background: "#EEE" }}>teg</th>
              <th style={{ padding: "1rem", background: "#EEE" }}>category</th>
              <th style={{ padding: "1rem", background: "#EEE" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipeList.length > 0 ? (
              recipeList.map((recipe) => (
                <tr key={recipe.id}>
                  <th>{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    <img
                      src={
                        recipe.imagePath
                          ? `${IMAGE_URL}/${recipe.imagePath}`
                          : noImage
                      }
                      style={{ width: "90px", height: "auto" }}
                      alt="Recipe"
                    />
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>
                  <td>{recipe.category.map((cat) => `${cat.name}`)}</td>
                  <td className="position-relative">
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setOpenMenu(openMenu === recipe.id ? null : recipe.id)
                      }
                    >
                      <BsThreeDots size={24} />
                    </span>
                    {openMenu === recipe.id && (
                      <div
                        className="dropdown-menu show position-absolute"
                        style={{ right: "6rem" }}
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("View", recipe.id)}
                        >
                          <AiOutlineEye className="text-warning me-2" /> View
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("Edit", recipe.id)}
                        >
                          <FaEdit className="text-warning me-2" /> Edit
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleShow(recipe.id)}
                        >
                          <MdDelete className="text-danger me-2" /> Delete this
                          item
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      )}

      <nav
        aria-label="Page navigation example"
        className="pagination-container "
      >
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((page) => (
            <li
              className="page-item"
              key={page}
              onClick={() => {
                fetchRecipes(3, page);
              }}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => fetchRecipes(10, page)}
              >
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default RecipeList;
