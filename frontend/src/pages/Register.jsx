import React from "react";
import Input from "../components/Input";
import { FaEnvelope, FaEye, FaLock, FaEyeSlash, FaUser } from "react-icons/fa";
import Password from "../components/Password";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-[70vh] p-10">
      <div className="mx-auto w-[50%] flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-300 text-transparent bg-clip-text">
          Sign Up
        </h1>
        <form className="flex flex-col w-[80%] gap-5 py-3">
          <Input icon={FaUser} placeholder="Username" />
          <Input icon={FaEnvelope} placeholder="Email" />
          <Password
            icon={FaLock}
            eye={FaEye}
            slash={FaEyeSlash}
            placeholder="Password"
          />
          <button className="p-3 rounded-md bg-slate-500 text-white">
            SIGN UP
          </button>
          <button className="p-3 rounded-md bg-red-500 text-white">
            CONTINUE WITH GOOGLE
          </button>
        </form>
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
