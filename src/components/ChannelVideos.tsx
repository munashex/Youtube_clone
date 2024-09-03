import React from 'react';
import { VideoTypes } from '../types/Video'; 
import { Link } from 'react-router-dom';


interface VideoProps {
  video: VideoTypes;
}

const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount, 10);
  if (isNaN(count)) return viewCount;
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return `${count}`;
};

const ChannelVideos: React.FC<VideoProps> = ({ video }) => {
  const thumbnailUrl = video.thumbnail?.[2]?.url || video.thumbnail?.[0]?.url;
  

  return (
  <Link to={`/video/${video.videoId}`} className="flex flex-col gap-x-2">
    <img src={thumbnailUrl} alt={video.title} 
    className="w-full h-56 rounded-md"
    />
    <div className="flex flex-col gap-x-1"> 
      <h1 className="font-bold">{video.title.length < 58 ? video.title : video.title.slice(0, 58) + '....'}</h1> 
      <p className=" text-gray-500 inline-flex items-center gap-x-2">
        <span>{formatViewCount(video.viewCount)}  views • </span> 
        <span>{video.publishedTimeText}</span>
      </p>
    </div>
  </Link>
  );
};

export default ChannelVideos;


