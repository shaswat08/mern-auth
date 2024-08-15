import React, { useState } from "react";
import Input from "../components/Input";
import { FaEnvelope, FaEye, FaLock, FaEyeSlash, FaUser } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
import Password from "../components/Password";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // connect to the backend api
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (response?.data) {
        setLoading(false);
        setError("");
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        setLoading(false);
        setError(error?.response?.data?.message);
      } else {
        setLoading(false);
        setError("Something went wrong");
      }
    }
  };
  return (
    <div className="min-h-[70vh] p-10">
      <div className="mx-auto w-[50%] flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-300 text-transparent bg-clip-text">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[80%] gap-5 py-3"
        >
          <Input
            icon={FaUser}
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                username: e.target.value,
              }))
            }
          />
          <Input
            icon={FaEnvelope}
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
          />
          <Password
            icon={FaLock}
            eye={FaEye}
            slash={FaEyeSlash}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
          {loading ? (
            <Circles width="465" height="30" color="#3498db" />
          ) : (
            <button
              type="submit"
              className="p-3 rounded-md bg-slate-500 text-white"
            >
              SIGN UP
            </button>
          )}
          <button className="p-3 rounded-md bg-red-500 text-white">
            CONTINUE WITH GOOGLE
          </button>
        </form>
        {error && <p className="w-[80%] text-red-600 text-sm">{error}</p>}
        <p className="w-[80%] font-bold">
          Have an account?{" "}
          <Link to="/login">
            <span className="font-semibold text-blue-500 hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
