import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; 
import axios from 'axios';
import SearchedVideos from "../components/SearchedVideos";
import { VideoTypes } from "../types/Video";

const Search = () => {
  const { id } = useParams<{ id: string }>();
  const [searched, setSearched] = useState<VideoTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const getSearchInfo = async (name: string | undefined) => {
    if (!name) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`https://yt-api.p.rapidapi.com/search?query=${name}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        },
      })

       // Filter out videos that don't have thumbnails
       // Filter out videos that don't have thumbnails
       const filteredData = response.data.data.filter((video: VideoTypes) => 
        video.thumbnail && video.channelId && video.thumbnail.length  > 0 && video.videoId
      );
      setSearched(filteredData); 

    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSearchInfo(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
    {searched && searched.map((video) => (
        <SearchedVideos key={video.videoId} video={video} />
      ))}
  </div> 
  );
}

export default Search;