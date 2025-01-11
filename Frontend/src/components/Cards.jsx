import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import axios from 'axios'; 
import { useAuth } from '../context/AuthProvider';

const Cards = ({ item }) => {
    const [heartfill, setHeartfill] = useState(false);
    const [ authUser ] = useAuth(); 

    // const { name, image, price, recipe, _id } = item;

    const handleHeart = () => {
        setHeartfill(!heartfill);
    };

    const handleBuy = async (item) => {
        if (authUser) {
            
            const cartItem = {
                menuItemId: item._id,
                name: item.name,
                quantity: 1,
                image: item.image,
                price: item.price
            };
            console.log("Added items are : ", cartItem);
            
            try{

                const token = localStorage.getItem("token");

                const res = await axios.post("http://localhost:5000/api/cart/add", cartItem, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(res.status==200){
                    console.log('Item added to cart successfully:');
                } else {
                    console.log("Not Added");
                    
                }

            } catch (error) {
                console.log("Error encountered is ",error);
                
            }

            
            // const cartItem = {
            //     menuItemId: _id,
            //     name,
            //     quantity: 1,
            //     image,
            //     price,
            // };
    
            // console.log(`Sending request to ${'http://localhost:5000/api/cart/add'}`);
            
            // try {
            //     const response = await axios.post("http://localhost:5000/api/cart/add", cartItem);
                
            //     if (response.status === 200) {
            //         console.log('Item added to cart successfully:', response.data);
            //     }
            // } catch (error) {
            //     console.error('Error adding item to cart:', error);
            // }
        } else {
            alert("Please log in to add items to the cart.");
        }   
    };
    

    return (
        <div className="flex justify-center p-4"> 
            <div className="card bg-base-100 w-full max-w-xs shadow-xl md:py-5 relative dark:bg-slate-900 dark:text-white dark:border">
                <div
                    className={`rating gap-1 absolute z-49 rounded-full right-3 top-3 p-2 bg-orange-500 cursor-pointer transition-all
                        ${heartfill ? "text-red-600" : "text-white"}
                    `}
                    onClick={handleHeart}
                >
                    <FaHeart className="h-5 w-5" />
                </div>
                <figure className="overflow-hidden rounded-t-xl"> 
                    <img
                        src={item.image}
                        alt=""
                        className="w-full h-48 object-cover md:h-72 transition-all duration-200 hover:scale-105"
                    />
                </figure>
                <div className="card-body p-4 md:p-6">
                    <h2 className="card-title text-lg md:text-xl">{item.name}</h2> 
                    <p className="text-sm md:text-base">{item.recipe}</p> 
                    <div className="card-actions justify-between items-center mt-4">
                        <h5 className="font-semibold text-lg"><span className="text-sm text-red-600">₹</span>{item.price}</h5>
                        <button className="btn bg-orange-500 text-white hover:bg-orange-400 py-2 px-4" onClick={()=>handleBuy(item)}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
