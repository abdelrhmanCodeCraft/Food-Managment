import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../../assets/images/logo.svg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    toast({
        position: "top-center",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        theme: "dark",
    });


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const onSubmit = async (data) => {
    try {
        const response = await axios.post(
            "https://upskilling-egypt.com:3006/api/v1/Users/Login",
            data
        );
        console.log(response.data);
        toast.success("Logged in successfully!", { position: "top-center" });
        setTimeout(()=>{
            navigate("/dashboard");
        }, 5000)
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed", { position: "top-center" });
        console.log("Error:", error.response?.data || error.message);
    }
};



    return (
        <div className="auth-container">
            <div className="container-fluid bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-md-5 bg-white rounded-3 px-5 py-4">
                        <div>
                            <div className="logo-container text-center mb-3">
                                <img src={logo} alt="Logo" className="w-50" />
                            </div>
                            <div className="title mb-3 text-start">
                                <h5 className="mb-1">Login</h5>
                                <p className="text-muted">Welcome Back! Please enter your details</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-light border-0">
                                        <FaEnvelope className="text-muted" />
                                    </span>
                                    <div className="vr"></div>
                                    <input
                                        type="email"
                                        className="form-control bg-light border-0 shadow-none"
                                        placeholder="Email"
                                        {...register("email", { 
                                            required: "Email is required", 
                                            pattern: { 
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                                                message: "Invalid email format" 
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-light border-0">
                                        <FaLock className="text-muted" />
                                    </span>
                                    <div className="vr"></div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control bg-light border-0 shadow-none"
                                        placeholder="Password"
                                        {...register("password", { 
                                            required: "Password is required", 
                                            minLength: { 
                                                value: 6, 
                                                message: "Password must be at least 6 characters" 
                                            } 
                                        })}
                                    />
                                    <span className="input-group-text bg-light border-0" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                        {showPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                                <div className="d-flex justify-content-between mb-3">
                                    <Link to="/forgot" className="text-decoration-none text-black">Forgot password?</Link>
                                    <Link to="/register" className="text-decoration-none text-success">Register now</Link>
                                </div>

                                <button type="submit" className="btn btn-success w-100">Login</button>
                            </form>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Login;
