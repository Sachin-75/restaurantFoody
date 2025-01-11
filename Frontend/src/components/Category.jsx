import React from 'react';

const Category = () => {
    const catItems = [
        {id: 1, title: "Main Dish", des: "(78)", img: "/Images/Category/img1.png"},
        {id: 2, title: "Lunch Dish", des: "(89)", img: "/Images/Category/img2.png"},
        {id: 3, title: "Desert Dish", des: "(45)", img: "/Images/Category/img3.png"},
        {id: 4, title: "All Time", des: "(87)", img: "/Images/Category/img4.png"},
    ];
  
    return (
        <div className="section-container py-16 overflow-hidden dark:text-black"> {/* Added overflow-hidden to prevent horizontal overflow */}
            <div className='text-center'>
                <p className="text-red-500 uppercase tracking-wide font-medium text-lg">Customer Favourites</p>
                <h1 className="text-4xl md:text-5xl font-bold my-2 md:leading-snug dark:text-white">Popular Categories</h1>
            </div>
            {/* cards */}
            <div className="flex flex-wrap gap-8 justify-center items-center mt-12"> {/* Changed flex properties for better alignment */}
                {
                    catItems.map((item, i) => (
                        <div key={i} className="shadow-lg rounded-md bg-white py-5 px-4 w-full max-w-xs mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all">
                            {/* max-w-xs will ensure the card doesn't exceed the set width */}
                            <div className="flex w-full mx-auto items-center justify-center">
                                <img src={item.img} alt="" className="bg-orange-200 p-5 rounded-full w-28 h-28" />
                            </div>
                            <div className="mt-5 space-y-1">
                                <h5 className="text-xl font-semibold">{item.title}</h5>
                                <p className="text-gray-500">{item.des}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Category;
