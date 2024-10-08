import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si"; 
import {Link, useLocation} from 'react-router-dom' 
import { LuMusic2 } from "react-icons/lu";
import { GrGamepad } from "react-icons/gr";
import { RiNewsLine } from "react-icons/ri";
import { MdPodcasts } from "react-icons/md";


const navLinks = [ 
  {
  name: "Music", 
  icon: <LuMusic2 size={28}/>,
  link: "search/music"
  }, 
  {
  name: "Gaming", 
  icon: <GrGamepad size={28}/>,
  link: "search/gaming"
  }, 
  {
  name: "News", 
  icon: <RiNewsLine size={28}/>, 
  link: "search/news"
  }, 
  {
  name: "Podcasts", 
  icon: <MdPodcasts size={28}/>, 
  link: "search/podcast"
  }
]

interface LinksProps {
  onClick: () => void
}

const SideLinks = ({onClick}: LinksProps) => {

    const location = useLocation()

  return (
    <div className="fixed z-30 top-20 bottom-0 w-44 md:w-48 bg-white border shadow-xl">
       
    

      <div className="my-6 space-y-6">
        <Link to="/" onClick={onClick} className={`flex items-center gap-x-5 px-2 ${location.pathname === '/' ? 'border py-2 bg-gray-200' : ''}`}>
        <IoMdHome size={28}/> 
         <span className="text-lg">Home</span>
        </Link> 

        <Link to="search/shorts" onClick={onClick} className={`flex items-center gap-x-5 px-2 ${location.pathname === '/shorts' ? 'border py-2 bg-gray-200' : ''}`}> 
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
        <Link key={nav.name} to={nav.link} onClick={onClick} className={`flex items-center gap-x-5 px-2 ${location.pathname === nav.link ? 'border py-2 bg-gray-200' : ''}`}> 
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
