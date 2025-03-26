import { Outlet } from "react-router-dom";
import logo from '../../../assets/images/logo.svg'
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
    return (
        <div>
            <div className="auth-container">
                <div className="container-fluid bg-overlay">
                    <div className="row vh-100 justify-content-center align-items-center">
                        <div className="col-md-5 bg-white rounded-3 px-5 py-4">
                            <div>
                                <div className="logo-container text-center mb-3">
                                    <img src={logo} alt="Logo" className="w-20" />
                                </div>
                                <Outlet />
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
