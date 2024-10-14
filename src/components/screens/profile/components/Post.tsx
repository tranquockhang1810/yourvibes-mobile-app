import React from 'react';
import { View, Text, Image } from 'react-native';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';

interface PostProps {
  post: PostResponseModel;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.user?.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        <Text style={{ marginLeft: 10 }}>{post.user?.name}</Text>
      </View>
      <Text>{post.content}</Text>
      {post.mediaUrl?.map((media, index) => (
        <Image key={index} source={{ uri: media.mediaUrl }} style={{ width: '100%', height: 200, marginTop: 10 }} />
      ))}
    </View>
  );
};

export default Post;