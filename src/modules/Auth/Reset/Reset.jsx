import React, { useState } from 'react';
import { FaEnvelope, FaKey, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from "../../../Services/api/apiInstance";
import { USER_URL } from "../../../Services/api/apiConfig";import { EMAIL_VALIDATION } from '../../../Services/Validation/Validation';

const Reset = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

    const onSubmit = async (data) => {
        const requestData = {
            email: data.email,
            password: data.newPassword, 
            confirmPassword: data.confirmPassword,
            seed: data.otp 
        };

        try {
            const response = await apiInstance.post(USER_URL.RESET, requestData, {
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
        <>
        <div className="text-center mb-3">
                    <h5 className="mb-1">Reset Your Password</h5>
                    <p className="text-muted">Enter your email, OTP, and a new password.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-light border-0">
                            <FaEnvelope className="text-muted" />
                        </span>
                        <input
                            type="email"
                            className="form-control bg-light border-0 shadow-none"
                            placeholder="Email"
                            {...register("email", EMAIL_VALIDATION)}
                        />
                    </div>
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}

                    <div className="input-group mb-3">
                        <span className="input-group-text bg-light border-0">
                            <FaKey className="text-muted" />
                        </span>
                        <input
                            type="text"
                            className="form-control bg-light border-0 shadow-none"
                            placeholder="OTP"
                            {...register("otp", { required: "OTP is required" })}
                        />
                    </div>
                    {errors.otp && <p className="text-danger">{errors.otp.message}</p>}

                    <div className="input-group mb-3">
                        <span className="input-group-text bg-light border-0">
                            <FaLock className="text-muted" />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control bg-light border-0 shadow-none"
                            placeholder="New Password"
                            {...register("newPassword", { required: "New password is required" })}
                        />
                        <span className="input-group-text bg-light border-0" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                            {showPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                        </span>
                    </div>
                    {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}

                    <div className="input-group mb-4">
                        <span className="input-group-text bg-light border-0">
                            <FaLock className="text-muted" />
                        </span>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control bg-light border-0 shadow-none"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", { required: "Confirm password is required" })}
                        />
                        <span className="input-group-text bg-light border-0" onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }}>
                            {showConfirmPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                    <button type="submit" className="btn btn-success w-100">Reset Password</button>
                </form>
        </>
    );
};

export default Reset;
