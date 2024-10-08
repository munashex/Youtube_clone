import { useState, useEffect } from 'react';
import axios from 'axios';
import Videos from '../components/Videos';
import { VideoTypes } from '../types/Video';
import Loader from '../components/Loader';

function Home() {
  const [feed, setFeed] = useState<VideoTypes[]>([]);  
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://yt-api.p.rapidapi.com/home', {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        },
      });

      // Filter out videos that don't have thumbnails
      const filteredData = response.data.data.filter((video: VideoTypes) => 
        video.thumbnail && video.channelId && video.thumbnail.length  > 0 && video.videoId
      );

      setFeed(filteredData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err); 
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
      {feed.map((video) => (
        <Videos key={video.videoId} video={video} />
      ))}
    </div> 
  );
}

export default Home;


