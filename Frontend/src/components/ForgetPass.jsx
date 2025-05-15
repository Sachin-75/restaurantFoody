import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const ForgetPass = () => {
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        let email = data.email
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgetpass",{email})
            console.log(response.data)
        } catch (error) {
            console.log("error",error)
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                <div className="modal-box md:p-10 dark:bg-slate-900 dark:text-white dark:border rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                        <h3 className="font-bold text-2xl mb-4 md:mb-6">Forget Password</h3>

                        <div className="mt-4 space-y-2">
                            <label className="text-base md:text-lg" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full px-4 py-2 md:py-3 outline-none border rounded-md text-black dark:text-black text-base md:text-lg bg-white"
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-6 py-2 text-lg rounded-md hover:bg-orange-700 duration-200 mb-4 md:mb-0"
                            >
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;
