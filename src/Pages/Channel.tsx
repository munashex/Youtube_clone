import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { VideoTypes } from '../types/Video';
import ChannelVideos from '../components/ChannelVideos';
import { ShortsTypes } from '../types/Shorts';
import Shorts from '../components/Shorts';
import banner from '../images/banner.png'; 
import { FeaturedTypes } from '../types/Featured';

interface ChannelMeta {
  avatar: { url: string }[];
  banner: { url: string }[];
  title: string;
  subscriberCount: number;
  subscriberCountText: string;
  videosCountText: string;
  channelHandle: string;
}

interface ChannelData {
  meta: ChannelMeta;
}

type TabType = 'videos' | 'shorts' | 'featured';

function Channel() {
  const [channel, setChannel] = useState<ChannelData | null>(null);
  const [videos, setVideos] = useState<VideoTypes[]>([]);
  const [shorts, setShorts] = useState<ShortsTypes[]>([]);
  const [featured, setFeatured] = useState<FeaturedTypes[]>([]);
  const [tab, setTab] = useState<TabType>('videos');
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  const getChannelInfo = async (channelId: string | undefined) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://yt-api.p.rapidapi.com/channel/home?id=${channelId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      });
      setChannel(response.data);
    } catch (err) {
      console.log(err);
      setChannel(null);
    } finally {
      setLoading(false);
    }
  };

  const getChannelVideo = async (videoId: string | undefined) => {
    try {
      const response = await axios.get(`https://yt-api.p.rapidapi.com/channel/videos?id=${videoId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      });
      setVideos(response.data.data || []);
    } catch (err) {
      console.log(err);
      setVideos([]);
    }
  };

  const getChannelShorts = async (shortId: string | undefined) => {
    try {
      const response = await axios.get(`https://yt-api.p.rapidapi.com/channel/shorts?id=${shortId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      });
      setShorts(response.data.data || []);
    } catch (err) {
      console.log(err);
      setShorts([]);
    }
  };

  const getFeaturedChannel = async (channelId: string | undefined) => {
    try {
      const response = await axios.get(`https://yt-api.p.rapidapi.com/channel/channels?id=${channelId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      });
      setFeatured(response.data.data || []);
    } catch (err) {
      console.log(err);
      setFeatured([]);
    }
  };

  useEffect(() => {
    if (id) {
      getChannelInfo(id);
      getChannelVideo(id);
      getChannelShorts(id);
      getFeaturedChannel(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!channel) {
    return <div>No channel data available.</div>;
  }

  const bannerUrl = channel.meta.banner[0]?.url || channel.meta.banner[1]?.url || banner;

  const renderTabContent = () => {
    switch (tab) {
      case 'videos':
        return (
          <div className="grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.videoId}>
                  <ChannelVideos video={video} />
                </div>
              ))
            ) : (
              <div>No videos available.</div>
            )}
          </div>
        );
      case 'shorts':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-4 my-8 justify-items-center">
            {shorts.length > 0 ? (
              shorts.map((short) => (
                <div key={short.videoId}>
                  <Shorts short={short} />
                </div>
              ))
            ) : (
              <div>No shorts available.</div>
            )}
          </div>
        );
      case 'featured':
        return (
          <div className="my-8 flex flex-row flex-wrap gap-4">
            {featured.length > 0 ? (
              featured.map((channel) => (
                <div key={channel.channelId} className="space-y-1.5">
                  <img src={channel.thumbnail[0]?.url} alt={channel.title} />
                  <h1 className="text-lg font-semibold">{channel.title}</h1>
                  <h1 className="font-semibold">{channel.subscriberCount}</h1>
                </div>
              ))
            ) : (
              <div>No featured channels available.</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <img
          src={bannerUrl}
          alt={channel.meta.title}
          className="w-full h-32 md:h-48 object-cover rounded-lg"
        />
        <div className="flex items-center mt-4">
          <img
            src={channel.meta.avatar[0]?.url}
            alt={`${channel.meta.title} avatar`}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">{channel.meta.title}</h1>
            <p className="text-gray-600 text-sm md:text-lg">{channel.meta.channelHandle}</p>
            <p className="inline-flex items-center md:text-lg gap-x-2 text-gray-600 text-sm">
              <span>{channel.meta.subscriberCountText} subscribers</span> •
              <span>{channel.meta.videosCountText}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row items-center gap-x-3 md:gap-x-5 mb-4">
          <button
            onClick={() => setTab('videos')}
            className={`md:text-lg ${tab === 'videos' ? 'font-bold underline' : 'text-gray-600'}`}
          >
            Videos
          </button>
          <button
            onClick={() => setTab('shorts')}
            className={`md:text-lg ${tab === 'shorts' ? 'font-bold underline' : 'text-gray-600'}`}
          >
            Shorts
          </button>
          <button
            onClick={() => setTab('featured')}
            className={`md:text-lg ${tab === 'featured' ? 'font-bold underline' : 'text-gray-600'}`}
          >
            Featured
          </button>
        </div>

        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default Channel;
