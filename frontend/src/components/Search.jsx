import  {useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation()
  const searchText = params.search.slice(3)



  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value
     
    const url = `/search?q=${value}`
    navigate(url)
    
  }


  return (
    <div className="w-full min-w-[320px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-gray-100 group focus-within:border-yellow-400">
      <div>
        {isMobile && isSearchPage ? (
          <Link to={'/'} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-yellow-400 text-yellow-400 bg-gray-50 rounded-full shadow-md">
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 text-neutral-600 group-focus-within:text-yellow-400">
            <FaSearch size={22} />
          </button>
        )}
      </div>

      <div className="w-full">
        {!isSearchPage ? (
          // not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
                'Search "egg"',
                1000,
                'Search "rice"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "chips"',
                1000,
                'Search "biskit"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "15px", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          // when i was search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more"
              className="bg-transparent w-full h-full outline-none"
              defaultValue={searchText}
              onChange={handleOnChange}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
