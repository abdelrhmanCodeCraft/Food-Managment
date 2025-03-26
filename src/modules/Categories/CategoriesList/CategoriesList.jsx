import React, { useEffect, useState } from "react";
import Header from "../../shared/Header/Header";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import NoData from "../../shared/NoData/NoData";
import anthor from "../../../assets/images/another.png";
import { AiOutlineEye } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import group from "../../../assets/images/Group 48102290.png";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { privateApiInstance } from "../../../Services/api/apiInstance";
import { CATEGORIES_URL } from "../../../Services/api/apiConfig";
import { useForm } from "react-hook-form";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CategoriesList = () => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelectedId(id);
        setShow(true);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(); 

    const onSubmit = async (data) => {
        try {
            const response = await privateApiInstance.post(CATEGORIES_URL.POST_CATEGORY, data);
            console.log(response);
            toast.success("Category created successfully");
            handleCloseAdd(); 
            fetchCategories(); 
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
            toast.error("Failed to create category");
        }
    };

    const fetchCategories = async (page = 1) => { 
    try {
        const response = await privateApiInstance.get(
            CATEGORIES_URL.GET_CATEGORY,
            {
                params: { pageSize: 3, pageNumber: page },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        setCategoriesList(response.data.data || []);
        setTotalPages(response.data.totalNumberOfPages || 0);
        setCurrentPage(page);
    } catch (error) {
        toast.error("Error fetching categories");
        console.error("Fetching Error:", error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
};


    const deleteCategory = async () => {
    if (!selectedId) return;
    setDeleting(true);
    try {
        await privateApiInstance.delete(CATEGORIES_URL.DELETE_CATEGORY(selectedId), {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setCategoriesList((prevList) => prevList.filter((category) => category.id !== selectedId));
        toast.success("Category deleted successfully");
    } catch (error) {
        toast.error("Failed to delete category");
        console.error("Error:", error.response?.data || error.message);
    } finally {
        setDeleting(false);
        handleClose();
    }
};



    useEffect(() => {
        fetchCategories(1);
    }, []);

    const toggleMenu = (id) => {
        setOpenMenu((prev) => (prev === id ? null : id));
    };

    return (
        <div className="category-container">
            <Header title="Category List" description="You can now add your items that any user can order it from the Application and you can edit" img={anthor} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Body style={{ position: "relative" }}>
                    <div className="text-center">
                        <div onClick={handleClose} className="icon" style={{ position: "absolute", top: "0.5rem", right: "1rem", color: "red", border: "2px solid red", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IoCloseSharp />
                        </div>
                        <img className="w-25 mb-3" src={group} alt="no data" />
                        <h5>Delete this item?</h5>
                        <p>Are you sure you want to delete this item? If you are sure, just click on delete it.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteCategory} disabled={deleting}>
                        {deleting ? "Deleting..." : "Delete this item"}
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header>
                    <Modal.Title>Add New Category</Modal.Title>
                    <div onClick={handleCloseAdd} className="icon" style={{ position: "absolute", top: "0.5rem", right: "1rem", color: "red", border: "2px solid red", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IoCloseSharp />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mb-5">
                                <div className="vr"></div> 
                                <input
                                    {...register("name", { required: "Category name is required" })}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter category"
                                />
                            </div>
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                            <Button type="submit" disabled={isSubmitting} variant="success">
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            <div className="title d-flex justify-content-between p-4" style={{ width: "99%", margin: "auto" }}>
                <div className="left">
                    <h1>Categories Table Details</h1>
                    <span>You can check all details</span>
                </div>
                <div className="right">
                    <button onClick={handleShowAdd} className="btn btn-success">Add New Category</button>
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
                            <th style={{ padding: "1rem", background: "#EEE" }} scope="col">#</th>
                            <th style={{ padding: "1rem", background: "#EEE" }} scope="col">Name</th>
                            <th style={{ padding: "1rem", background: "#EEE" }} scope="col">Description</th>
                            <th style={{ padding: "1rem", background: "#EEE" }} scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {categoriesList.length > 0 ? (
                            categoriesList.map((category) => (
                                <tr key={category.id}>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.name}</td>
                                    <td>{category.creationDate}</td>
                                    <td className="position-relative">
                                        <span className="cursor-pointer" onClick={() => toggleMenu(category.id)}>
                                            <BsThreeDots size={24} />
                                        </span>
                                        {openMenu === category.id && (
                                            <div className="dropdown-menu show position-absolute" style={{ right: "6rem" }}>
                                                <button className="dropdown-item"><AiOutlineEye className="text-warning me-2" /> View</button>
                                                <button className="dropdown-item"><FaEdit className="text-warning me-2" /> Edit</button>
                                                <button className="dropdown-item" onClick={() => handleShow(category.id)}>
                                                    <MdDelete className="text-danger me-2" /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <NoData key="no-data" />
                        )}
                    </tbody>
                    <nav className="pagination-container " style={{marginTop:"6rem"}}>
                        <ul className="pagination">
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                onClick={() => currentPage > 1 && fetchCategories(currentPage - 1)}
                            >
                                <IoIosArrowBack className="page-arrow" />
                            </li>
                            {[...Array(totalPages).keys()].map((page) => (
                                <li
                                key={page + 1}
                                className={`page-item ${
                                    currentPage === page + 1 ? "active" : ""
                                }`}
                                onClick={() => fetchCategories(page + 1)}
                                >
                                {page + 1}
                                </li>
                            ))}
                            <li
                                className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                                }`}
                                onClick={() =>
                                currentPage < totalPages && fetchCategories(currentPage + 1)
                                }
                            >
                                <IoIosArrowForward className="page-arrow" />
                            </li>
                        </ul>
                    </nav>
                </table>
            )}
            <ToastContainer />
        </div>
    );
};

export default CategoriesList;
