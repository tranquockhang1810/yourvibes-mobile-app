import { Image } from 'react-native'
import React from 'react'
import { Carousel } from '@ant-design/react-native';
import { Video } from 'expo-av';
import useColor from '@/src/hooks/useColor';
import { PostMediaModel } from '@/src/api/features/post/models/PostResponseModel';

const MediaView = ({ mediaItems }: { mediaItems: PostMediaModel[] }) => {
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
      selectedIndex={0}
    >
      {mediaItems?.map((media, index) => {
        const isVideo = media?.mediaUrl?.endsWith('.mp4'); // Check if media is a video
        return isVideo ? (
          <Video
            key={index}
            source={{ uri: media?.mediaUrl || "" }}
            style={{
              height: 250,
              width: '100%',
            }}
            useNativeControls
            isLooping
          />
        ) : (
          <Image
            key={index}
            source={{ uri: media?.mediaUrl }}
            style={{
              height: 250,
              objectFit: 'cover',
            }}
          />
        );
      })}
    </Carousel>
  )
}

export default MediaView