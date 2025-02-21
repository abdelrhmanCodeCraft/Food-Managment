import React from 'react';
import { FaEnvelope, FaKey, FaLock } from 'react-icons/fa'; 
import logo from '../../../assets/images/logo.svg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const requestData = {
            email: data.email,
            password: data.newPassword, 
            confirmPassword: data.confirmPassword,
            seed: data.otp 
        };

        try {
            const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', requestData, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(response.data);
            toast.success("Reset password successfully!", { position: "top-center" });

            setTimeout(() => {
                navigate('/');
            }, 5000);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Reset failed",
                { position: "top-center" }
            );
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
                                <h5 className="mb-1">Reset Your Password</h5>
                                <p className="text-muted">
                                    Enter your email, OTP, and a new password to reset your account.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mb-4">
                                    <span className="input-group-text bg-light border-0">
                                        <FaEnvelope className="text-muted" />
                                    </span>
                                    <div className="vr"></div> 
                                    <input
                                        type="email"
                                        className="form-control bg-light border-0 shadow-none"
                                        placeholder="Email"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                <div className="input-group mb-4">
                                    <span className="input-group-text bg-light border-0">
                                        <FaKey className="text-muted" />
                                    </span>
                                    <div className="vr"></div> 
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 shadow-none"
                                        placeholder="OTP"
                                        {...register("otp", { required: "OTP is required" })}
                                    />
                                </div>
                                {errors.otp && <p className="text-danger">{errors.otp.message}</p>}

                                <div className="input-group mb-4">
                                    <span className="input-group-text bg-light border-0">
                                        <FaLock className="text-muted" />
                                    </span>
                                    <div className="vr"></div> 
                                    <input
                                        type="password"
                                        className="form-control bg-light border-0 shadow-none"
                                        placeholder="New Password"
                                        {...register("newPassword", { required: "New password is required" })}
                                    />
                                </div>
                                {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}

                                <div className="input-group mb-5">
                                    <span className="input-group-text bg-light border-0">
                                        <FaLock className="text-muted" />
                                    </span>
                                    <div className="vr"></div> 
                                    <input
                                        type="password"
                                        className="form-control bg-light border-0 shadow-none"
                                        placeholder="Confirm Password"
                                        {...register("confirmPassword", { required: "Confirm password is required" })}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                                <button type="submit" className="btn btn-success w-100 mb-3">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reset;
