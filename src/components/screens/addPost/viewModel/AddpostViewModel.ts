import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { CreatePostRequestModel } from "@/src/api/features/post/models/CreatePostRequestModel";
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { useState } from "react";

const AddPostViewModel = (repo: PostRepo) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<PostResponseModel | null>(null);
    const [error, setError] = useState<string | null>(null); // For better error handling

    const createPost = async (data: CreatePostRequestModel) => {
        try {
            setLoading(true);
            console.log("Creating post with data:", data);

            const response = await repo.createPost(data);
            console.log("Post created:", response);

            if (response?.data) {
                setPost(response.data);
            } else {
                throw new Error("Post creation failed. No response data.");
            }
        } catch (err: any) {
            console.error("Error creating post:", err);
            setError(err.message || "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        post,
        error,
        createPost,
    };
};

export default AddPostViewModel;
