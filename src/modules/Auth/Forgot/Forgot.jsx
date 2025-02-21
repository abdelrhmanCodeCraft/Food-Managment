import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; 
import logo from '../../../assets/images/logo.svg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {


    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        
        try{
            const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)
            navigate('/reset')
            console.log(response);
        }

        catch(error) {
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
                                <img src={logo} alt="" className="w-50" />
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
