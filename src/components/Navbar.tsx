import { HiBars3 } from "react-icons/hi2";
import Logo from '../images/youtube.png';
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import SideLinks from "./SideLinks";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (search.length > 1) {
      navigate(`/search/${search}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-40 bg-white">
        <div className="mx-3 lg:mx-9 my-5">
          {/* Navbar on small screens */}
          {showSearch ? (
            <div className="flex md:hidden flex-row items-center">
              <button className="w-[20%]" onClick={() => setShowSearch(!showSearch)}>
                <FaArrowLeftLong size={30} color="black" />
              </button>
              <form className="flex w-[80%]" onSubmit={handleSubmit}>
                <input
                  placeholder="Search"
                  onChange={handleInputChange}
                  className="border outline-none w-full py-1 placeholder:text-center text-center rounded-l-full border-blue-500"
                />
                <button
                  type="submit"
                  className="border cursor-pointer py-1 px-2 rounded-r-full"
                  disabled={search.length < 1}
                >
                  <IoSearchOutline size={30} />
                </button>
              </form>
            </div>
          ) : (
            <div className='flex md:hidden flex-row items-center justify-between'>
              <div className="flex flex-row gap-5">
                <button onClick={handleShowLinks}>
                  {showLinks ? <MdClose size={36} /> : <HiBars3 size={36} />}
                </button>
                <Link to="/">
                  <img src={Logo} alt="youtube_clone" className="w-24" />
                </Link>
              </div>
              <button onClick={() => setShowSearch(!showSearch)}>
                <IoSearchOutline size={36} />
              </button>
            </div>
          )}

          {/* Navbar on medium and large screens */}
          <div className="hidden md:flex flex-row justify-between">
            <div className="flex flex-row gap-x-5 items-center w-[20%]">
              <button onClick={handleShowLinks}>
                {showLinks ? <MdClose size={38} /> : <HiBars3 size={38} />}
              </button>
              <Link to="/">
                <img src={Logo} alt="youtube_clone" className="w-24" />
              </Link>
            </div>
            <form className="flex w-[60%] lg:w-[30%]" onSubmit={handleSubmit}>
              <input
                placeholder="Search"
                onChange={handleInputChange}
                className="border outline-none w-full placeholder:text-center text-center rounded-l-full border-black"
              />
              <button
                type="submit"
                className="border cursor-pointer py-1 px-2 rounded-r-full"
                disabled={search.length < 1}
              >
                <IoSearchOutline size={30}/>
              </button>
            </form>
          </div>
        </div>
      </div>
      {showLinks ? <SideLinks onClick={handleShowLinks}/> : null}
    </div>
  );
}

export default Navbar;
