import { Privacy } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { CreatePostRequestModel } from "@/src/api/features/post/models/CreatePostRequestModel";
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { usePostContext } from "@/src/context/post/usePostContext";
import { ImagePickerAsset } from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

const AddPostViewModel = (repo: PostRepo) => {
  const { clearSavedPost } = usePostContext();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImagePickerAsset[]>([]);
  const [privacy, setPrivacy] = useState<Privacy | undefined>(Privacy.PUBLIC);

  const createPost = async (data: CreatePostRequestModel) => {
    try {
      setCreateLoading(true);
      const response = await repo.createPost(data);
      if (response?.data) {
        setPostContent('');
        setSelectedImages([]);
        setSelectedImageFiles([]);
        clearSavedPost!();
        Toast.show({
          type: "success",
          text1: "Post created!",
          text2: "Post created successfully",
        })
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: "Post creation failed",
          text2: response?.error?.message
        })
      }
    } catch (err: any) {
      console.error( err);
      Toast.show({
        type: "error",
        text1: "Post creation failed",
        text2: err.message
      })
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    createLoading,
    createPost,
    postContent,
    setPostContent,
    selectedImages,
    setSelectedImages,
    selectedImageFiles,
    setSelectedImageFiles,
    privacy,
    setPrivacy
  };
};

export default AddPostViewModel;
