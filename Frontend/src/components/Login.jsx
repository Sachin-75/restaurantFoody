import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password
        };

        await axios.post("https://restaurantweb-q5fl.onrender.com/api/auth/login", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) { // Check if success is true
                    toast.success("Loggedin Successfully");
                    document.getElementById("my_modal_3").close();
                    setTimeout(()=>{
                        window.location.reload();
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                    },1000);
                } 
                else {
                     toast.error("Error: "+res.data.message);
                    
                }
            }).catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                    setTimeout(()=>{

                    },2000);
                }
            });
    };

    return (
        <>
            <div className="">
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box dark:bg-slate-900 dark:text-white dark:border">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Close button for modal */}
                            <Link 
                            to="/" 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={()=> document.getElementById("my_modal_3").close()}
                            >
                            ✕</Link>
                            <h3 className="font-bold text-lg">Login</h3>
                            <div className="mt-4 space-y-2">
                                <span>Email</span>
                                <br />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", { required: true })}
                                    className="md:w-80 w-75 px-3 py-1 outline-none border rounded-md dark:text-black" />
                                <br />
                                {errors.email && (
                                    <span className="text-sm text-red-500">This field is required</span>
                                )}
                            </div>
                            <div className="mt-4 space-y-2">
                                <span>Password</span>
                                <br />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", { required: true })}
                                    className="md:w-80 w-75 px-3 py-1 outline-none border rounded-md dark:text-black" />
                                <br />
                                {errors.password && (
                                    <span className="text-sm text-red-500">This field is required</span>
                                )}
                            </div>
                            <div className="mt-4 flex justify-around">
                                <button type="submit" className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-700 duration-200">Login</button>
                                <p>Not Registered?{" "} <Link to="/signup" className="underline text-red-600 cursor-pointer">SignUp</Link>{" "} </p>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    )
}

export default Login;
