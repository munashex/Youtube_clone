export interface Thumbnail {
    url: string;
    height: number;
    width: number;
  }
  
  export interface VideoTypes {
    channelHandle: string;
    channelId: string;
    channelThumbnail: Thumbnail[];
    channelTitle: string;
    description: string;
    lengthText: string;
    publishDate: string;
    publishedAt: string;
    publishedTimeText: string;
    richThumbnail: Thumbnail[];
    thumbnail: Thumbnail[];
    title: string;
    videoId: string;
    viewCount: string;
  }
  