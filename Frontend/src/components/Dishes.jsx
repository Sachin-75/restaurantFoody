import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

const Dishes = () => {
  const [recipes, setRecipes] = useState([]);
  // const slider = React.useRef(null);

  useEffect(() => {
    const getFood = async () => {
      try {
        // Fetch data using axios
        const res = await axios.get("http://localhost:5000/api/food");
        
        // Access the response data
        const data = res.data;

        // Filter the dishes that are popular
        const popularDishes = data.filter((item) => item.category === "popular");
        
        // Set the filtered data to recipes state
        setRecipes(popularDishes);
        
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };


    // useEffect(() => {
  //   fetch("/dishes_menu.json")
  //     .then(res => res.json())
  //     .then(data => {
  //       const dishes = data.filter((item) => item.category === "popular");
  //       setRecipes(dishes);
  //     });
  // }, []);

    getFood();
  }, []); // Dependency array ensures this runs only once

  const settings = {
    dots: true,
    infinite: true, 
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1, 
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <>
      <div className="section-container my-20 max-w-screen-2xl mx-auto px-4">
        <div className="text-center flex flex-col items-center">
          <p className="text-red-500 uppercase tracking-wide font-medium text-lg">Special Dishes</p>
          <h2 className="text-4xl md:text-5xl font-bold my-2 md:leading-snug text-center">Standout Dishes</h2>
        </div>

        <Slider {...settings}>
          {recipes.map((item, i) => (
            <Cards key={i} item={item} /> 
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Dishes;
