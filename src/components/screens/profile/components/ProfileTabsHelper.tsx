import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';

export const defaultPosts: PostResponseModel[] = [
  {
    id: '1',
    user: { id: '1', name: 'Trần Quốc Khang', avatar: 'https://example.com/avatar1.jpg' },
    content: "Post nè hehehehe",
    likeCount: 50,
    commentCount: 1,
    createdAt: '10 phút trước',
    privacy: 'Public',
    status: true,
    mediaUrl: [
      { postID: '1', mediaUrl: 'https://example.com/image1.jpg', status: true },
    ],
  },
  // Thêm các bài viết khác ở đây...
];

export const loadPostsFromStorage = async (): Promise<PostResponseModel[] | null> => {
  try {
    const storedPosts = await AsyncStorage.getItem('posts');
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
    return null;
  } catch (error) {
    console.error("Failed to load posts from storage:", error);
    return null;
  }
};
