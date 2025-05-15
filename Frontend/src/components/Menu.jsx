import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import { BeatLoader, GridLoader } from 'react-spinners';
import { useAuth } from '../context/AuthProvider';
import apiRequest from '../utils/Service';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [itemsPerPage] = useState(8);
  const [authUser] = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const response = await axios.get("https://restaurantweb-q5fl.onrender.com/api/food");

        const data = response.data;

        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false)
      }
    };

    fetchData();
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    if(authUser){
      try {
        const res = await apiRequest({
          method: 'GET',
          url: '/cart/get'
        });
        if(res.status === 200){
          setCartItemsCount(res.data.length);
        }
      } catch (error) {
        console.log("Error fetching cart items")
      }
    }
  }




  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-col text-center ">
        <div className='max-w-screen-xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center overflow-hidden md:mt-0 mt-10'>
          <div className="w-full mt-12 md:mt-32">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold">Love Of Delectable <span className="text-orange-500">Food</span></h1>
              <p className="text-xl ">
                Come with family & feel the joy of delicious food such as Greek Salad, Butternut, Indian Special Thali, Olivias Relienas and more for a moderate
              </p>
              <button className="btn btn-active bg-orange-500 hover:bg-orange-400 text-orange-50 text-[18px] rounded-full ">Order Now</button>
            </div>
          </div>
        </div>

        {
          loader ? (
            <>
            <div style={{textAlign: "center"}}>
              <GridLoader loading={loader} color='#ec9c54' cssOverride={{marginTop: "10%"}} />
            </div>
            </>
          ) : (
            <>
              <div className="ms:mx-5 mx-5 mt-10">
                <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
                  {/* Category buttons */}
                  <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
                    <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                    <button onClick={() => filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
                    <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
                    <button onClick={() => filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soups</button>
                    <button onClick={() => filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</button>
                    <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
                  </div>

                  {/* Shopping cart and filter options */}
                  <Link to="/cart" className="flex justify-end mb-4 rounded-sm">
                    <div className="p-2">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle flex items-center justify-center mr-3"
                      >
                        <div className="indicator">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span className="badge badge-sm indicator-item">{cartItemsCount}</span>
                        </div>
                      </label>
                    </div>
                  </Link>
                </div>

                {/* Product cards */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
                  {currentItems.map((item, index) => (
                    <Cards key={`${item._id}-${index}`} item={item} apiCallRequest={fetchCartItems} />
                  ))}

                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center my-8 dark:text-black">
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default Menu;
