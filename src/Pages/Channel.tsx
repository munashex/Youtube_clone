import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { VideoTypes } from '../types/Video'
import ChannelVideos from '../components/ChannelVideos'


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

type TabType = 'videos' | 'shorts' | 'playlists' | 'community';

function Channel() {
  const [channel, setChannel] = useState<ChannelData | null>(null) 
  const [videos, setVideos] = useState<VideoTypes[]>([])
  const [tab, setTab] = useState<TabType>('videos')
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  const getChannelInfo = async (channelId: string | undefined) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://yt-api.p.rapidapi.com/channel/home?id=${channelId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      })
      setChannel(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const getChannelVideo = async(videoId: string | undefined) => {
  try {
   const response = await axios.get(`https://yt-api.p.rapidapi.com/channel/videos?id=${videoId}`, {
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
    }
   })
   setVideos(response.data.data)
  }catch(err) {
    console.log(err)
  }
  }

  useEffect(() => {
    if (id) {
      getChannelInfo(id)
      getChannelVideo(id)
    }
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (!channel) {
    return <div>No channel data available.</div>
  }

  const renderTabContent = () => {
    switch (tab) {
      case 'videos':
        return(
        <div className="grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center"> 
          {videos.map((video) => 
          <div>
            <ChannelVideos key={video.videoId} video={video}/> 
          </div>)}
        </div>
        )
      case 'shorts':
        return <div>Shorts content here</div>
      case 'playlists':
        return <div>Playlists content here</div>
      case 'community':
        return <div>Community content here</div>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <img
          src={channel.meta.banner[0]?.url}
          alt={`${channel.meta.title} banner`}
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
              <span>{channel.meta.subscriberCountText} subscribers</span>  •  
              <span>{channel.meta.videosCountText}</span>
            </p>
          </div>
        </div>
      </div> 
       
      {/* tabs for videos, playlist, community post & videos */}
      <div>
        {/* tabs table here  */}
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
            onClick={() => setTab('playlists')} 
            className={`md:text-lg ${tab === 'playlists' ? 'font-bold underline' : 'text-gray-600'}`}
          >
            Playlists
          </button> 
          <button 
            onClick={() => setTab('community')} 
            className={`md:text-lg ${tab === 'community' ? 'font-bold underline' : 'text-gray-600'}`}
          >
            Community
          </button>
        </div> 

        {/* tabs content here */} 
        <div>
          {renderTabContent()}
          
        </div>
      </div> 
    </div>
  )
}

export default Channel