import React from 'react';
import hero from "/Images/hero.png";

const Banner = () => {
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col-reverse md:flex-row items-center overflow-hidden md:mt-0 mt-10'>
                {/* Added items-center for vertical centering and overflow-hidden to prevent horizontal overflow */}
                <div className="w-full md:w-1/2 mt-12 md:mt-32">
                    <div className="space-y-12">
                        <h1 className="text-4xl font-bold">Divide into Delights Of Delectable <span className="text-orange-500">Food</span></h1>

                        <p className="text-xl ">
                            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
                        </p>
                        <button className="btn btn-active bg-orange-500 hover:bg-orange-400 text-orange-50 text-[18px] rounded-full ">Order Now</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img src={hero} className="w-auto h-auto mt-5 mx-auto rounded-lg md:w-[20rem]" alt="Hero" />
                    
                </div>
            </div>
        </>
    )
}

export default Banner;
