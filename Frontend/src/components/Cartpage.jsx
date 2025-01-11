import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { useAuth } from '../context/AuthProvider';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [authUser] = useAuth(); // Get the authenticated user's info

    useEffect(() => {
        const fetchCartItems = async () => {
            if (authUser) {
                try {
                    const response = await axios.get(`/api/cart?userEmail=${authUser.email}`);
                    if (response.status === 200) {
                        setCartItems(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [authUser]);

    return (
        <>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
                <div className=" bg-gradient-to-t">
                    <div className="py-36 flex flex-col  items-center justify-center gap-8">
                        <div className="px-4 space-y-7">
                            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                                Add your favourites <span className="text-orange-500">Food</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="overflow-x-auto">
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
                                        <td>
                                            {/* Add remove or update buttons if needed */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
