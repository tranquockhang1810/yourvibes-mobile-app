import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';

export const defaultPosts: PostResponseModel[] = [
 
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
