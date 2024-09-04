import { ShortsTypes } from "../types/Shorts"
import React from 'react'
import { Link } from "react-router-dom"

interface ShortProps {
    short: ShortsTypes
}

const Shorts: React.FC<ShortProps> = ({short}) => {

    if(!short) {
        return (
            <div className="my-8">
                <h1 className="text-lg">Zero Shorts</h1>
            </div>
        )
    }


    return (
        <div className="">
            <Link to={`/short/${short.videoId}`}>
           <img 
             src={short.thumbnail[0].url} 
             alt={short.title} 
             className=" h-[340px] rounded-md"
           /> 
           </Link>
           <div className="mt-2 flex flex-col space-y-2">
             <h1 className="text-xs font-semibold">
               {short.title.length < 27 ? short.title : short.title.slice(0, 27)+"..."}
             </h1> 
             <p className="text-xs text-gray-600">{short.viewCountText}</p>
           </div>
        </div>
    )
}

export default Shorts