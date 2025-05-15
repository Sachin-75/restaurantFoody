import React from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const ResetPass = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"
    const { token } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        let password = data.password
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/resetPass/${token}`, { password })
            console.log(response.data)
            if(response.data.reset=='0'){
                toast.success("Password updated Successfully");
                navigate(from, {replace:true});
            }
        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                <div className="modal-box md:p-10 dark:bg-slate-900 dark:text-white dark:border rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                        <h3 className="font-bold text-2xl mb-4 md:mb-6">Reset Password</h3>

                        <div className="mt-4 space-y-2">
                            <label className="text-base md:text-lg" htmlFor="email">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className="w-full px-4 py-2 md:py-3 outline-none border rounded-md text-black dark:text-black text-base md:text-lg bg-white"
                            />
                            {errors.name && (
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

export default ResetPass;
