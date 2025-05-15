import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { useAuth } from '../context/AuthProvider';
import apiRequest from '../utils/Service';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { GridLoader } from 'react-spinners';
import { FcPlus } from "react-icons/fc";
import { FaSquareMinus } from "react-icons/fa6";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [authUser] = useAuth(); // Get the authenticated user's info

    const fetchCartItems = async () => {
        if (authUser) {
            setLoader(true)
            try {
                // const response = await axios.get(`/api/cart?userEmail=${authUser.email}`);
                const res = await apiRequest({
                    method: 'GET',
                    url: '/cart/get'
                })
                if (res.status === 200) {
                    setCartItems(res.data);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoader(false)
            }
        }
    };

    const handleDelete = async (value) => {
        console.log(value)
        if (authUser) {
            try {
                const res = await apiRequest({
                    method: 'DELETE',
                    url: '/cart/delete',
                    params: { menuItemId: value.menuItemId }
                })
                if (res.status === 200) {
                    toast.success("Item deleted successfully");
                    fetchCartItems()
                }
            } catch (error) {

            }
        }
    }

    const handleIncrement = async (value) => {
        if (authUser) {
            try {
                const res = await apiRequest({
                    method: 'PUT',
                    url: '/cart/increment',
                    params: { menuItemId: value.menuItemId }
                })
                if (res.status === 200) {
                    fetchCartItems()
                }
            } catch (error) {

            }
        }
    }

    const handleDecrement = async (value) => {
        if (authUser) {
            try {
                const res = await apiRequest({
                    method: 'PUT',
                    url: '/cart/decrement',
                    params: { menuItemId: value.menuItemId }
                })
                if (res.status === 200) {
                    fetchCartItems()
                }
            } catch (error) {

            }
        }
    }

    const countquantity = () => {
        let totalquantity = 0
        cartItems.map((ele, ind) => {
            totalquantity = ind + totalquantity
            console.log("totalquantity==>", totalquantity)
        });
        setTotalQuantity(totalquantity)
    }

    const totalPriceCount = () => {
        let totalprice = 0
        cartItems.map((ele, ind) => {
            totalprice = ele.price * ele.quantity + totalprice
        });
        setTotalPrice(totalprice)
    }

    useEffect(() => {
        fetchCartItems();
    }, [authUser]);

    useEffect(() => {
        countquantity()
        totalPriceCount()
    }, [cartItems])

    return (
        <>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
                {
                    loader ? (
                        <div style={{ textAlign: "center" }}>
                            <GridLoader loading={loader} color='#ec9c54' cssOverride={{ marginTop: "10%" }} />
                        </div>
                    ) : (
                        <>
                            <div className=" bg-gradient-to-t">
                                <div className="pb-[2rem] pt-[9rem] flex flex-col  items-center justify-center gap-8">
                                    <div className="px-4 space-y-7">
                                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                                            Add your favourites <span className="text-orange-500">Food</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead className="bg-orange-600 text-white">
                                            <tr>
                                                <th>#</th>
                                                <th>Food</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle h-12 w-12">
                                                                    <img src={item.image} alt={item.name} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{item.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td><span>₹</span>{item.price}</td>
                                                    <td style={{ display: "flex", alignItems: 'center' }}>
                                                        {/* Add remove or update buttons if needed */}
                                                        <FcPlus onClick={() => handleIncrement(item)} className="text-red-500 text-[25px] cursor-pointer" />
                                                        <FaSquareMinus onClick={() => handleDecrement(item)} className="text-orange-500 text-[20px] cursor-pointer" />
                                                        <MdDelete onClick={() => handleDelete(item)} className="text-red-500 text-[30px] cursor-pointer" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='flex items-center px-2 mt-6'>
                                <div className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹ {totalPrice}</span></div>
                                <div className='text-right ml-3'><button className='btn btn-success bg-orange-500' onClick={{}} type='button'>Checkout</button></div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default CartPage;
