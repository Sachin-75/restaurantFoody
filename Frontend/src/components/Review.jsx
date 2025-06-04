import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import apiRequest from '../utils/Service';
import toast from 'react-hot-toast';

const Review = ({ item, apiCallRequest, onClose }) => {
    const [authUser] = useAuth();

    useEffect(() => {
        const modal = document.getElementById('my_modal_4');
        if (modal) modal.showModal(); // Show dialog when component mounts
    }, []);

    const handleBuy = async (item) => {
        if (!authUser) {
            alert("Please log in to add items to the cart.");
            return;
        }

        const cartItem = {
            menuItemId: item._id,
            name: item.name,
            quantity: 1,
            image: item.image,
            price: item.price
        };

        try {
            const res = await apiRequest({
                method: 'POST',
                url: '/cart/add',
                data: cartItem
            });

            if (res.status === 200) {
                toast.success('Item added to cart successfully');
                const modal = document.getElementById('my_modal_4');
                if (modal) modal.close();  // Visually close modal
                if (onClose) onClose();     // Update Cards' state
                apiCallRequest();
            } else {
                toast.error("Failed to add item.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const dummyReviews = [
        { id: 1, name: "John", text: "Delicious and fresh!", rating: 4.5 },
        { id: 2, name: "Emma", text: "Could be better.", rating: 3 },
        { id: 3, name: "Liam", text: "Absolutely loved it!", rating: 5 },
        { id: 4, name: "Olivia", text: "Too spicy for me.", rating: 2.5 },
        { id: 5, name: "Noah", text: "Great portion size.", rating: 4 },
        { id: 6, name: "Ava", text: "Nice presentation.", rating: 4 },
        { id: 7, name: "Elijah", text: "Not worth the price.", rating: 2 },
        { id: 8, name: "Sophia", text: "Kids loved it!", rating: 5 },
        { id: 9, name: "James", text: "Will order again.", rating: 4.5 },
        { id: 10, name: "Isabella", text: "A bit oily.", rating: 3.5 }
    ]

    return (
        <dialog id="my_modal_4" className="modal dark:bg-slate-900 dark:text-white">
            <div className="modal-box w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
                <div className="flex flex-col justify-between md:flex-row gap-4">
                    {/* Left Side (Image & Description) */}
                    <div className="w-full md:w-1/2">
                        <figure className="overflow-hidden rounded-xl">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover md:h-72 transition-all duration-200 hover:scale-105"
                            />
                        </figure>
                        <div className="card-body p-0 pt-4">
                            <h2 className="card-title text-lg md:text-xl mb-2">{item.name}</h2>
                            <p className="text-sm md:text-base">{item.recipe}</p>
                            <div className="card-actions justify-between items-center mt-4">
                                <h5 className="font-semibold text-lg">
                                    <span className="text-sm text-red-600">₹</span>{item.price}
                                </h5>
                                <button
                                    className="btn bg-orange-500 text-white hover:bg-orange-400 py-2 px-4"
                                    onClick={() => handleBuy(item)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side (Review/Other Content) */}
                    <div className="w-full md:w-1/3 flex flex-col p-3 justify-between">
                        {/* Reviews Section */}
                        <div className="overflow-y-auto max-h-96 space-y-3">
                            {dummyReviews.map(review => (
                                <div key={review.id} className="border-b pb-2">
                                    <p className="font-semibold">{review.name}</p>
                                    <p className="text-sm">{review.text}</p>
                                    <div className="rating rating-sm">
                                        {Array.from({ length: 5 }, (_, i) => {
                                            const full = i + 1 <= Math.floor(review.rating);
                                            const half = review.rating - i === 0.5;
                                            return (
                                                <input
                                                    key={i}
                                                    type="radio"
                                                    name={`rating-${review.id}`}
                                                    className={`mask mask-star-2 ${half ? "mask-half-2" : ""} bg-red-500`}
                                                    checked
                                                    disabled={true}
                                                    readOnly
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* New Review Input Section */}
                        <div className="mt-4 pt-4 border-t">
                            <input
                                type="text"
                                placeholder="Write your review..."
                                className="input input-bordered w-full mb-2"
                            />
                            <div className="rating rating-md rating-half">
                                <input type="radio" name="rating-11" className="rating-hidden" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-red-500" aria-label="0.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-red-500" aria-label="1 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-red-500" aria-label="1.5 star" defaultChecked />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-red-500" aria-label="2 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-red-500" aria-label="2.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-red-500" aria-label="3 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-red-500" aria-label="3.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-red-500" aria-label="4 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-red-500" aria-label="4.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-red-500" aria-label="5 star" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Close Action */}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={onClose}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>

    );
};

export default Review;
