import { Image } from 'expo-image';
import React from 'react'
import { Carousel } from '@ant-design/react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import useColor from '@/src/hooks/useColor';
import { PostMediaModel } from '@/src/api/features/post/models/PostResponseModel';

interface MediaViewProps {
  mediaItems: PostMediaModel[];
}

const MediaView: React.FC<MediaViewProps> = React.memo(({ mediaItems }) => {
  const { brandPrimary, lightGray } = useColor();
  return (
    <Carousel
      style={{
        backgroundColor: '#fff',
        width: '100%',
        minHeight: 280,
      }}
      dotActiveStyle={{ backgroundColor: brandPrimary }}
      dotStyle={{
        backgroundColor: lightGray,
      }}
      //selectedIndex={0}
    >
      {mediaItems?.map((media, index) => {
        const isVideo = media?.media_url?.endsWith('.mp4') || media?.media_url?.endsWith('.mov'); // Check if media is a video
        const player = useVideoPlayer({ uri: media?.media_url || "" }, player => {
          player.loop = true;
        });
        return isVideo ? (
          <VideoView
            key={index}
            style={{
              height: 250,
              width: '100%',
            }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : (
          <Image
            key={index}
            source={{ uri: media?.media_url }}
            style={{
              height: 250,
              objectFit: 'cover',
            }}
          />
        );
      })}
    </Carousel>
  )
})

export default MediaView