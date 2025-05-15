import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                token: null
            });
            Cookies.remove('token');
            toast.success("Logout Successfully");
            window.location.reload();
            navigate('/')
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
