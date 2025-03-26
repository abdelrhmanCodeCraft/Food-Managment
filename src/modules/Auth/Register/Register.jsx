import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiInstance } from "../../../Services/api/apiInstance";
import { USER_URL } from "../../../Services/api/apiConfig";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prevState => !prevState);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prevState => !prevState);

    const onSubmit = async (data) => {
        try {
            const response = await apiInstance.post(USER_URL.REGISTER, data);
            toast.success("Registered successfully!", { position: "top-center" });
            setTimeout(() => navigate("/dashboard"), 5000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed", { position: "top-center" });
        }
    };

    return (
        <>
        <div className="title mb-3 text-start mb-5">
                            <h5 className="mb-1 text-start">Register</h5>
                            <p className="text-muted text-start">Create a new account</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input type="text" className="form-control mb-2" placeholder="Username" {...register("userName", { required: "Username is required" })} />
                                    {errors.userName && <p className="text-danger">{errors.userName.message}</p>}
                                    <input type="email" className="form-control mb-2" placeholder="Email" {...register("email", { required: "Email is required" })} />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                    <input type="text" className="form-control" placeholder="Country" {...register("country", { required: "Country is required" })} />
                                    {errors.country && <p className="text-danger">{errors.country.message}</p>}
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control mb-2" placeholder="Phone" {...register("phoneNumber", { required: "Phone number is required" })} />
                                    {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
                                    <div className="input-group mb-2">
                                        <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })} />
                                        <span className="input-group-text" onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                    </div>
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                    <div className="input-group">
                                        <input type={showConfirmPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" {...register("confirmPassword", { required: "Confirm password is required" })} />
                                        <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                    </div>
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-success w-100">Register</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>Already have an account? <Link to="/" className="text-success">Login</Link></p>
                        </div>
        </>
    );
};

export default Register;
