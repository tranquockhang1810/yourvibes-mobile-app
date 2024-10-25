import { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
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

  const fetchComments = async () => {
    const response = await defaultCommentRepo.getComments({
      PostId: postId,
      page: 1,
      limit: 10,
    });
    if (response && response?.data) {
      setComments(response?.data);
    }
  };

  useEffect(() => {
    fetchComments();
    handleLike(0);
  }, [postId]);

  const handleLike = (likeCount: number) => {
    setUserLikes((prevUserLikes) => {
      const currentlyLiked = prevUserLikes[likeCount];
      const newLikeCount = currentlyLiked ? -1 : 1;

      setLikeCount((prevLikes) => ({
        ...prevLikes,
        [likeCount]: (prevLikes[likeCount] || 0) + newLikeCount,
      }));

      return { ...prevUserLikes, [likeCount]: !currentlyLiked };
    });
  };

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [currentCommentId, setCurrentCommentId] = useState("");

  const handleAction = (commentId: string) => {
    const options = [
      "Báo cáo bình luận",
      "Chỉnh sửa bình luận",
      "Xóa bình luận",
      "Hủy",
    ];
    showActionSheetWithOptions(
      {
        title: "Chọn hành động",
        options: options,
        cancelButtonIndex: options.length - 1,
        cancelButtonTintColor: "#F95454",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            const commentToReport = comments.find(
              (comment) => comment.id === commentId
            );
            if (commentToReport) {
              Toast.show({
                text1: "Báo cáo bình luận thành công",
                text2: commentToReport.content,
              });
              console.log(
                `Báo cáo bình luận được chọn: } "${commentToReport.content}"`
              );
            }
            break;

          case 1:
            const commentToEdit = comments.find(
              (comment) => comment.id === commentId
            );
            if (commentToEdit) {
              setEditCommentContent(commentToEdit.content);
              setCurrentCommentId(commentId);
              setEditModalVisible(true);
            }
            break;

          case 2:
            handleDelete(commentId);
            break;

          default:
            break;
        }
      }
    );
  };

  const handleEditComment = async () => {
    await handleUpdate(currentCommentId, editCommentContent);
    setEditModalVisible(false);
    setEditCommentContent("");
    setCurrentCommentId("");
  };
  const handleUpdate = async (commentId: string, updatedContent: string) => {
    try {
      const response = await defaultCommentRepo.updateComment({
        commentId,
        content: updatedContent,
      } as { commentId: string; content: string });
      if (response && response.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: updatedContent }
              : comment
          )
        );
        Toast.show({
          type: "success",
          text1: "Cập nhật bình luận thành công",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Cập nhật bình luận thất bại",
      });
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await defaultCommentRepo.deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      Toast.show({
        type: "success",
        text1: "Xóa bình luận thành công",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Xóa bình luận thất bại",
      });
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
        const commentData: CreateCommentsRequestModel = {
            post_id: postId,
            content: newComment,
            parent_id: replyToReplyId?.toString() || replyToCommentId?.toString(),
        };

        // Đảm bảo bạn đã truyền đúng parent_id
        console.log("Comment Data:", commentData);

        try {
            const response = await defaultCommentRepo.createComment(commentData);
            if (!response.error) {
                Toast.show({
                    type: "success",
                    text1: "Comment thành công",
                });
                
                // Logic để thêm bình luận vào đúng parent
                const newComment = { ...response.data, replies: [] }; // Đảm bảo replies array có mặt
                if (commentData.parent_id) {
                    // Thêm bình luận vào replies của bình luận cha
                    setComments(prev => 
                        prev.map(comment => 
                            comment.id === commentData.parent_id
                                ? { ...comment, replies: [...(comment.replies || []), newComment] }
                                : comment
                        )
                    );
                } else {
                    // Nếu là bình luận cấp 1
                    setComments(prev => [...prev, newComment]);
                }
                
                // Không cần gọi lại fetchComments() nữa vì đã cập nhật ở trên
            } else {
                Toast.show({
                    type: "error",
                    text1: "Comment thất bại",
                });
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            Toast.show({
                type: "error",
                text1: "Comment thất bại",
            });
        } finally {
            setNewComment("");
            setReplyToCommentId(null);
            setReplyToReplyId(null);
            textInputRef.current?.blur();
        }
    }
};

// const handleReplyToComment = (commentId: string) => {
//   setReplyToCommentId(commentId);
//   setReplyToReplyId(undefined); // Đặt lại replyToReplyId nếu đang trả lời bình luận cha
//   textInputRef.current?.focus();
// };

// const handleReplyToReply = (parent_id: string,) => {
//   setReplyToReplyId(replyId);
//   textInputRef.current?.focus();
// };

  

  return {
    comments,
    likeCount,
    userLikes,
    newComment,
    replyToCommentId,
    replyToReplyId,
    textInputRef,
    handleLike,
    handleAddComment,
    setNewComment,
    setReplyToCommentId,
    setReplyToReplyId,
    handleUpdate,
    handleDelete,
    handleAction,
    isEditModalVisible,
    setEditModalVisible,
    editCommentContent,
    setEditCommentContent,
    handleEditComment, 
  };
};

export default usePostDetailsViewModel;