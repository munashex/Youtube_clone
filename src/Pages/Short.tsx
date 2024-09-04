import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Loader from '../components/Loader'; // Make sure this path is correct

interface ShortTypes {
  title: string;
  channelHandle: string;
  channelId: string;
  channelThumbnail: { url: string }[]; 
  videoId: string
}

const Short: React.FC = () => {
  const [short, setShort] = useState<ShortTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchShort = async (shortId: string | undefined) => {
      try {
        setLoading(true)
        const response = await axios.get(`https://yt-api.p.rapidapi.com/shorts/info?id=${shortId}`, {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
          }
        });
        setShort(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching short:', error);
        setLoading(false);
      }
    };

    fetchShort(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!short) {
    return <div className="flex items-center justify-center h-screen text-white">Short not found</div>;
  }

  return (
    <div className="relative"> 
      <iframe 
        src={`https://www.youtube.com/embed/${short.videoId}?controls=0`} 
        className="w-full h-[85vh]"
        title={short.title}
      />
      <div className="absolute bottom-5 left-3"> 
        <div className="flex flex-row items-center gap-x-1">
          <img src={short.channelThumbnail[0].url} className="w-12 rounded-full" alt={`${short.channelHandle} thumbnail`}/>
          <Link to={`/channel/${short.channelId}`} className="text-white bg-black bg-opacity-50 p-1 text-lg">{short.channelHandle}</Link>
        </div>
        <h1 className="mt-4 text-white font-bold text-lg bg-black inline-flex p-1 bg-opacity-50">{short.title}</h1>
      </div>
    </div>
  );
};

export default Short;