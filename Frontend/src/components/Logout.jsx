import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast';

const Logout = () => {
    const [authUser, setAuthUser] = useAuth();
    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                token: null
            });
            localStorage.removeItem("token")
            toast.success("Logout Successfully");
            window.location.reload();
            setTimeout(() => {
                
            }, 3000);
        } catch (error) {
            toast.error("Error :" + error);
            setTimeout(()=>{},2000);
        }
    }

    return (
        <>
            <div>
                <button className="bg-rose-500 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>

        </>
    )
}

export default Logout
