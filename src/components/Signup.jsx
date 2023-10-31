/* eslint-disable no-empty */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Input, Button, Logo } from "./index";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";

function Signup() {
  
  const { register, handleSubmit } = useForm();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
      </div>

      <h2 className="text-center text-2xl font-bold leading-tight">Create Your Account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account ? &nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {
        error && <p className="text-red-600 text-center mt-8">{error}</p>
      }

      <form onSubmit={handleSubmit(create)} className="mt-8">
        <div className="space-y-5">
            <Input
                label="Full Name: "
                placeholder="Enter your Full Name"
                type="text"
                {
                    ...register("name", {
                        required: true,
                    } )
                }
            />
            <Input 
                label="Email: "
                placeholder="Enter your Email"
                type="email"
                {
                    ...register('email', {
                        required: true,
                        validate:{
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    }) // unique name to write
                }
            />
            <Input 
                label="Password: "
                placeholder="Enter your Password"
                type="password"
                {
                    ...register('password', {
                        required: true,
                    })
                }
            />
            <Button type="submit" className='w-full'>
                Create Account
            </Button>
        </div>
        
      </form>
    </div>
  );
}

export default Signup;