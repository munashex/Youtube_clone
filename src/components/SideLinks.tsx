import { HiBars3 } from 'react-icons/hi2';
import Logo from '../images/youtube.png';
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si"; 
import {Link, useLocation} from 'react-router-dom' 
import { FaFire } from "react-icons/fa"; 
import { LuMusic2 } from "react-icons/lu";
import { GrGamepad } from "react-icons/gr";
import { RiNewsLine } from "react-icons/ri";
import { MdPodcasts } from "react-icons/md";


interface SideLinksProps {
  handleShowLinks: () => void;
}

const navLinks = [
  {
  name: "Trending", 
  icon: <FaFire size={28}/>,
  link: "/trending",
  }, 
  {
  name: "Music", 
  icon: <LuMusic2 size={28}/>,
  link: "/music"
  }, 
  {
  name: "Gaming", 
  icon: <GrGamepad size={28}/>,
  link: "/gaming"
  }, 
  {
  name: "News", 
  icon: <RiNewsLine size={28}/>, 
  link: "/news"
  }, 
  {
  name: "Podcasts", 
  icon: <MdPodcasts size={28}/>, 
  link: "/podcast"
  }
]

const SideLinks = ({ handleShowLinks }: SideLinksProps) => {

    const location = useLocation()

  return (
    <div className="fixed z-30 top-0 bottom-0 w-44 md:w-48 bg-[#F5F5F5] border shadow-xl">
       
       <div className="flex flex-row items-center gap-x-4 justify-between px-2 py-6">
        <button onClick={handleShowLinks}><HiBars3 size={40} /></button>
        <img src={Logo} alt="Logo" className="w-16 md:w-20" />
      </div> 

    

      <div className="my-9 space-y-6">
        <Link to="/" className={`flex items-center gap-x-5 px-2 ${location.pathname === '/' ? 'border py-2 bg-gray-200' : ''}`}>
        <IoMdHome size={28}/> 
         <span className="text-lg">Home</span>
        </Link> 

        <Link to="/shorts"  className={`flex items-center gap-x-5 px-2 ${location.pathname === '/shorts' ? 'border py-2 bg-gray-200' : ''}`}> 
          <SiYoutubeshorts size={28}/> 
          <span className="text-lg">Shorts</span>
        </Link>
      </div>  
 
      {/* divider here  */}  
      <div className="border"/> 

      <div className="my-6 px-2">
       <h1 className="text-lg font-bold px-3">Explore</h1> 
        <div className="space-y-6 my-6">
       {navLinks.map((nav) => (
        <Link key={nav.name} to={nav.link} className={`flex items-center gap-x-5 px-2 ${location.pathname === nav.link ? 'border py-2 bg-gray-200' : ''}`}> 
         <span>{nav.icon}</span> 
         <span className="text-lg">{nav.name}</span>
        </Link>
       ))}
       </div>
      </div>

    </div>
  );
};

export default SideLinks;
