import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiInstance } from "../../../Services/api/apiInstance";
import { USER_URL } from "../../../Services/api/apiConfig";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match", { position: "top-center" });
      return;
    }

    try {
      const response = await apiInstance.post(USER_URL.CHANGE_PASS, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.cofirmPaddword,
      });

      console.log(response);

      toast.success("Password changed successfully!", {
        position: "top-center",
      });
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="title mb-3 text-start">
        <h5 className="mb-1">Change Password</h5>
        <p className="text-muted">
          Update your password to keep your account secure
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {["oldPassword", "newPassword", "confirmPassword"].map(
          (field, index) => (
            <div className="input-group mb-3" key={index}>
              <span className="input-group-text bg-light border-0">
                <FaLock className="text-muted" />
              </span>
              <div className="vr"></div>
              <input
                type={showPassword[field] ? "text" : "password"}
                className="form-control bg-light border-0 shadow-none"
                placeholder={
                  field === "oldPassword"
                    ? "Old Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password"
                }
                {...register(field, {
                  required: "This field is required",
                  minLength:
                    field !== "oldPassword"
                      ? {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        }
                      : undefined,
                })}
              />
              <span
                className="input-group-text bg-light border-0"
                onClick={() => togglePasswordVisibility(field)}
                style={{ cursor: "pointer" }}
              >
                {showPassword[field] ? (
                  <FaEyeSlash className="text-muted" />
                ) : (
                  <FaEye className="text-muted" />
                )}
              </span>
            </div>
          )
        )}
        {errors.newPassword && (
          <p className="text-danger">{errors.newPassword.message}</p>
        )}
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" className="btn btn-success w-100">
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
