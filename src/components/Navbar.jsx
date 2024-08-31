import { HiBars3 } from "react-icons/hi2";  
import Logo from '../images/youtube.png' 
import { IoSearchOutline } from "react-icons/io5"; 
import { useState } from "react"; 
import { FaArrowLeftLong } from "react-icons/fa6";



const Navbar = () => { 
  const [showSearch, setShowSearch] = useState(false) 


    return (
        <div className="mx-3 lg:mx-9 my-5">
          {/* navbar on sm screens */}
            {showSearch ? 
            (
            <div className="flex md:hidden  flex-row items-center"> 
              <button className="w-[20%]" onClick={() => setShowSearch(!showSearch)}><FaArrowLeftLong size={30} color="black"/></button> 
              <div className="flex w-[80%]"> 
                <input placeholder="Search" className="border outline-none w-full py-1 placeholder:text-center text-center rounded-l-full border-blue-500"/>  
                <button className="border py-1 px-2 rounded-r-full"><IoSearchOutline size={30}/></button>
              </div>
            </div>
            ) :  
            (
            <div className='flex md:hidden flex-row items-center justify-between'> 
             <div className="flex flex-row gap-5">
            <button><HiBars3 size={36}/></button>  
             <img src={Logo} alt="youtube_clone"  
             className="w-24"
             />  
             </div>
             
             <button onClick={() => setShowSearch(!showSearch)}><IoSearchOutline size={36}/></button>
            </div>
            )
            } 

            {/* navbar on md and lg screens */} 
            <div className="hidden md:flex flex-row justify-between">  

             <div className="flex flex-row gap-x-5 items-center w-[20%]">
               <button><HiBars3 size={38}/></button> 
               <img src={Logo} alt="youtube_clone"  
               className="w-24" 
               />
             </div>  

             <div className="flex w-[60%] lg:w-[30%]"> 
                <input placeholder="Search" className="border outline-none w-full  placeholder:text-center text-center rounded-l-full border-black"/>  
                <button className="border py-1 px-2 rounded-r-full"><IoSearchOutline size={30}/></button>
              </div>

            </div> 

           </div>
    )
}

export default Navbar