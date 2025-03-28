import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from "../../../Services/api/apiInstance";
import { USER_URL } from "../../../Services/api/apiConfig";

const Forgot = () => {


    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        
        try{
            const response = await apiInstance.post(USER_URL.FORGOT, data);
            navigate('/reset')
            console.log(response);
        }

        catch(error) {
            console.log("Error:", error.response?.data || error.message);
        }
    };

    return (
        <>
         <div className="title mb-3 text-start mb-5">
                <h5 className="mb-1">Forgot your password?</h5>
                <p className="text-muted">
                    No worries! Please enter your email and we will send a password reset link.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-5">
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
                <button className="btn btn-success w-100 mb-3">Send Reset Link</button>
            </form>
        </>
    );
};

export default Forgot;
