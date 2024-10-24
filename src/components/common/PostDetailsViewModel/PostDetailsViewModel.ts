import { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import { useAuth } from "@/src/context/auth/useAuth";
import useColor from "@/src/hooks/useColor";
import { defaultCommentRepo } from "@/src/api/features/comment/CommentRepo";
import { CreateCommentsRequestModel } from "@/src/api/features/comment/models/CreateCommentsModel";
import Toast from "react-native-toast-message";

const usePostDetailsViewModel = (postId: string) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [comments, setComments] = useState<CommentsResponseModel[]>([]);
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyToReplyId, setReplyToReplyId] = useState<number | null>(null);
  const textInputRef = useRef<TextInput>(null);
  const limit = 10;
  const { user, localStrings } = useAuth();

  const { brandPrimary, brandPrimaryTap, backgroundColor } = useColor();

  const fetchComments = async () => {
    const response = await defaultCommentRepo.getComments({
      PostId: `${postId}`,
      page: 1,
      limit: 10,
    });
    // Cập nhật comments
    if (response && response?.data) {
      setComments(response?.data); // Giả sử response.data chứa danh sách bình luận
    }
  };

  // Lấy bình luận
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleLike = (commentId: number) => {
    setUserLikes((prevUserLikes) => {
      const currentlyLiked = prevUserLikes[commentId];
      const newLikeCount = currentlyLiked ? -1 : 1;

      setLikeCount((prevLikes) => ({
        ...prevLikes,
        [commentId]: (prevLikes[commentId] || 0) + newLikeCount,
      }));

      return { ...prevUserLikes, [commentId]: !currentlyLiked };
    });
  };

  const handleReport = () => {
    const options = ["Báo cáo bình luận", "Hủy"];
    showActionSheetWithOptions(
      {
        title: "Chọn hành động",
        options: options,
        cancelButtonIndex: options.length - 1,
        cancelButtonTintColor: "#F95454",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log("Báo cáo bình luận được chọn");
        }
      }
    );
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newCommentObject: CreateCommentsRequestModel = {
        content: newComment,
        post_id: postId,
        parent_id: replyToReplyId?.toString() || replyToCommentId?.toString(),//Comment con
      };

      const response = await defaultCommentRepo.createComment(newCommentObject);
      if (!response.error) {
        // Cập nhật danh sách bình luận sau khi tạo bình luận mới
        Toast.show({
          type: "success",
          text1: "Comment thành công",
        });
        fetchComments();
        setNewComment("");
        setReplyToCommentId(null);
        setReplyToReplyId(null);
        textInputRef.current?.blur();
      } else {
        Toast.show({
          type: "error",
          text1: "Comment thất bại",
        });
      }
    }
  };

  return {
    comments,
    likeCount,
    userLikes,
    newComment,
    replyToCommentId,
    replyToReplyId,
    textInputRef,
    handleLike,
    handleReport,
    handleAddComment,
    setNewComment,
    setReplyToCommentId,
    setReplyToReplyId,
  };
};

export default usePostDetailsViewModel;
