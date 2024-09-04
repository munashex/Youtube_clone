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

const SearchedVideos: React.FC<VideoProps> = ({ video }) => {
  const thumbnailUrl = video.thumbnail?.[1]?.url || video.thumbnail?.[0]?.url;
  const channelThumbnailUrl = video.channelThumbnail?.[0]?.url;

  return (
    <div className="flex flex-col">
      <Link to={`/video/${video.videoId}`} className="relative">
        <img 
          src={thumbnailUrl} 
          alt={video.title} 
          className="w-full aspect-video object-cover rounded-xl"
        />
        <span className="absolute bottom-1 right-1 bg-black text-white text-xs font-semibold px-1 py-0.5 rounded">
          {video.lengthText}
        </span>
      </Link>
      <div className="flex mt-3 space-x-3">
        <img 
          src={channelThumbnailUrl} 
          alt={video.channelTitle} 
          className="w-9 h-9 rounded-full flex-shrink-0"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold line-clamp-2 leading-5">
            {video.title}
          </h3>
          <Link to={`/channel/${video.channelId}`} className="text-gray-600  mt-1">
            {video.channelTitle}
          </Link>
          <p className="text-gray-600">
            {formatViewCount(video.viewCount) || 13} views • {video.publishedTimeText || '2 days ago'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchedVideos;