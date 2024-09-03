import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; 

interface Video {
  channelId: string;
  channelTitle: string; 
  description: string; 
  title: string; 
  viewCount: string; 
  id: string;
}

interface RelatedVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  viewCount: string;
  thumbnail: Array<{ url: string }>;
  publishedTimeText: string
}

const Video = () => {
  const [video, setVideo] = useState<Video>();   
  const [related, setRelated] = useState<RelatedVideo[]>([]);
  const [loading, setLoading] = useState(true); 
  const { id } = useParams<{ id: string }>();   
  const [loadingRelated, setLoadingRelated] = useState(true);

  const getVideo = async (videoId: string | undefined) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://yt-api.p.rapidapi.com/video/info?id=${videoId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      });
      setVideo(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }; 

  const getRelatedVideos = async (videoId: string | undefined) => {
    try {
      setLoadingRelated(true);
      const response = await axios.get(`https://yt-api.p.rapidapi.com/related?id=${videoId}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        }
      });
      setRelated(response.data.data);
      setLoadingRelated(false);
    } catch (err) {
      console.log(err);
      setLoadingRelated(false);
    }
  };
  
  useEffect(() => {
    getVideo(id);
    getRelatedVideos(id);
  }, [id]);  

  const formatViewCount = (viewCount: string | any): string => {
    const count = parseInt(viewCount, 10);
    if (isNaN(count)) return viewCount;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return `${count}`;
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-y-8 gap-x-4">
      {/* video from youtube */}
      <div className="flex flex-col gap-2 lg:w-[70%]">
        <iframe 
          src={`https://www.youtube.com/embed/${video?.id}?controls=1`} 
          className="w-full h-96 lg:h-[500px] rounded-md" 
          title="YouTube video player"
        ></iframe>

        <div className="space-y-2">
          <h1 className="text-gray-600">{formatViewCount(video?.viewCount)} views</h1>
          <h1 className="text-lg md:text-xl font-semibold">{video?.title}</h1>
          <Link to={`/channel/${video?.channelId}`} className="flex flex-row gap-2.5 items-center">
            <span className="w-11 cursor-pointer text-center rounded-full py-2 px-3 text-xl text-white bg-cyan-700">
              {video?.channelTitle.split('')[0]}
            </span>
            <h1 className="font-semibold text-lg">{video?.channelTitle}</h1>
          </Link>
        </div>
      </div>

      {/* related videos */}
      <div className="lg:w-[30%]">
        <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
        {loadingRelated ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            {related?.map((relatedVideo: RelatedVideo) => (
              <Link to={`/video/${relatedVideo.videoId}`}  key={relatedVideo.videoId} className="flex space-x-2">
                <img 
                  src={relatedVideo.thumbnail[0].url} 
                  alt={relatedVideo.title} 
                  className="w-40 h-24 object-cover rounded shadow"
                />

                <div>
                  <h3 className="font-semibold text-sm">
                    {relatedVideo.title.length < 59 ? relatedVideo.title : relatedVideo.title.slice(0, 58) + '...'}
                  </h3>
                  <p className="text-sm text-gray-500">{relatedVideo.channelTitle}</p>
                  <p className="text-sm text-gray-500 inline-flex items-center gap-x-2">
                    <span>{formatViewCount(relatedVideo.viewCount)} views</span>
                    <span>{relatedVideo.publishedTimeText}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
