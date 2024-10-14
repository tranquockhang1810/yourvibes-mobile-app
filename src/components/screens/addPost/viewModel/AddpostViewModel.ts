import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { useState } from "react";

const AddPostViewModel = (repo: PostRepo) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostResponseModel | null>(null);
  const createPost = async (data: PostResponseModel) => {
    try {
      setLoading(true);
      console.log("data:", data);

      const response = await repo.createPost(data);
      console.log(response);
      if (response?.data) {
        setPost(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    post,
    createPost,
  };
};
export default AddPostViewModel;
