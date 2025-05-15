import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {
    const location=useLocation();
    const navigate=useNavigate()
    const from = location.state?.from?.pathname || "/"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password
        };
        //http://localhost:5000/api/auth/register
        await axios.post("https://restaurantweb-q5fl.onrender.com/api/auth/register", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    toast.success("Registered Successfully");
                    localStorage.setItem("token", JSON.stringify(res.data.token));

                    navigate(from, {replace:true});
                } else {
                    toast.error("Error: " + res.data.message);
                }
            }).catch((err) => {
                if (err.response && err.response.data.message) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                } 
            });


    };



    return (
        <>
            <div className="flex h-screen items-center justify-center p-4"> {/* Added responsive padding */}
                <div id="my_modal_3" className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"> {/* Adjusted max width for different screen sizes */}
                    <div className="modal-box  md:p-10  dark:bg-slate-900 dark:text-white dark:border rounded-lg shadow-lg"> {/* Responsive padding */}
                        <form onSubmit={handleSubmit(onSubmit)} method="div">
                            {/* Close button */}
                            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                            <h3 className="font-bold text-2xl mb-4 md:mb-6">SignUp</h3> {/* Responsive margin bottom */}
                            <div className="mt-4 space-y-2">
                                <span className="text-base md:text-lg">Name</span> {/* Adjusted text size */}
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", { required: true })}
                                    className="w-full px-4 py-2 md:py-3 outline-none border text-black dark:text-black rounded-md text-base md:text-lg" />
                                <br />
                                {errors.name && (
                                    <span className="text-sm text-red-500">This field required</span>
                                )}
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className="text-base md:text-lg">Email</span> {/* Adjusted text size */}
                                <br />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", { required: true })}
                                    className="w-full px-4 py-2 md:py-3 outline-none text-black dark:text-black border rounded-md text-base md:text-lg" />
                                <br />
                                {errors.email && (
                                    <span className="text-sm text-red-500">This field required</span>
                                )}
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className="text-base md:text-lg">Password</span> {/* Adjusted text size */}
                                <br />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", { required: true })}
                                    className="w-full px-4 py-2 md:py-3 outline-none text-black dark:text-black border rounded-md text-base md:text-lg" /> {/* Responsive text size and padding */}
                                <br />
                                {errors.name && (
                                    <span className="text-sm text-red-500">This field required</span>
                                )}
                            </div>
                            <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center">
                                <button className="bg-orange-500 text-white px-6 py-2 text-lg rounded-md hover:bg-orange-700 duration-200 mb-4 md:mb-0">SignUp</button> {/* Responsive margin bottom */}
                                <p className="text-base md:text-lg">Registered?{" "} <Link to="/" className="underline text-red-600 cursor-pointer">Login</Link></p> {/* Adjusted text size */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
