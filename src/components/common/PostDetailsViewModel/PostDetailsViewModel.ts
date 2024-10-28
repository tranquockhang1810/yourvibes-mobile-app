import { useState, useRef, useEffect } from "react";
import { TextInput, Modal, LogBox } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import { defaultCommentRepo } from "@/src/api/features/comment/CommentRepo";
import { CreateCommentsRequestModel } from "@/src/api/features/comment/models/CreateCommentsModel";
import { UpdateCommentsRequestModel } from "@/src/api/features/comment/models/UpdateCommentsModel";
import Toast from "react-native-toast-message";

const usePostDetailsViewModel = (
  postId: string,
  replyToCommentId: string | null
) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [comments, setComments] = useState<CommentsResponseModel[]>([]);

  const [likeCount, setLikeCount] = useState<{ [key: string]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: string]: boolean }>({});
  const [newComment, setNewComment] = useState("");
  const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);
  const [setReplyToCommentId] = useState<string | null>(null);

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

  const fetchRepliesToReply = async (postId: string, parentId: string): Promise<CommentsResponseModel[]> => {
    try {
      const response = await defaultCommentRepo.getReplies(postId, parentId);
      console.log("replies to reply:", response);
      if (response && Array.isArray(response.data)) {
        return response.data;
      } else {
        return [];
      }
      
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi tải phản hồi",
      });
      console.error("Error fetching replies to reply:", error);
      return [];
    }
  };

  const fetchReplies = async (postId: string, parentId: string) => {
    try {
      const response = await defaultCommentRepo.getReplies(postId, parentId);
      console.log("replies TS:", response);
  
      if (response && response.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === parentId
              ? { ...comment, replies: response.data }
              : comment
          )
        );
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi tải phản hồi",
      });
      console.error("Error fetching replies:", error);
    }
  };
  

  useEffect(() => {
    fetchComments();
    handleLike(postId);
  }, [postId]);
  

  const handleLike = (commentOrReplyId: string) => {
    setUserLikes((prevUserLikes) => {
      const currentlyLiked = prevUserLikes[commentOrReplyId];
      const newLikeCount = currentlyLiked ? -1 : 1;

      setLikeCount((prevLikes) => ({
        ...prevLikes,
        [commentOrReplyId]: (prevLikes[commentOrReplyId] || 0) + newLikeCount,
      }));

      return { ...prevUserLikes, [commentOrReplyId]: !currentlyLiked };
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
                `Báo cáo bình luận với nội dung: "${commentToReport.content}" có id: ${commentId} "tại bài viết ${postId}"`
              );
            }
            break;

            case 1:
              const commentToEdit = comments.find(
                (comment) => comment.id === commentId
              );
              if (commentToEdit) {
                console.log("Comment Được Chọn để Sửa:", commentToEdit);
                setEditCommentContent(commentToEdit.content);
                setCurrentCommentId(commentId);
                console.log(
                  "Setting edit modal to visible for comment ID:",
                  commentId
                );
                setEditModalVisible(true);
                console.log("Edit modal visible status:", isEditModalVisible);
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

  useEffect(() => {
    if (isEditModalVisible) {
      console.log("Edit modal is now visible.");
    }
  }, [isEditModalVisible]);
  
  const handleEditComment = async () => {
    await handleUpdate(currentCommentId, editCommentContent);
    setEditModalVisible(false); // Close modal
    setEditCommentContent("");
    setCurrentCommentId("");
    console.log("Edit comment saved and modal closed.");
  };
  

  const handleUpdate = async (commentId: string, updatedContent: string) => {
    try {
      const updateCommentData: UpdateCommentsRequestModel = {
        post_id: postId,
        comments_id: commentId,
        content: updatedContent,
      };

      const response = await defaultCommentRepo.updateComment(
        updateCommentData
      );

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

  const handleAddComment = async (comment: string) => {
    if (comment.trim()) {
      // Xác định parentId
      const parentId = replyToReplyId
        ? String(replyToReplyId)
        : replyToCommentId
        ? String(replyToCommentId)
        : null;

      console.log("replyToReplyId:", replyToReplyId);
      console.log("replyToCommentId:", replyToCommentId);
      console.log("parentId:", parentId); // Kiểm tra giá trị parentId

      const commentData: CreateCommentsRequestModel = {
        post_id: postId,
        content: comment,
        parent_id: parentId, // Sử dụng parentId ở đây
      };
      console.log("parentId trước khi gửi:", parentId);

      console.log("Comment Data:", commentData);

      try {
        const response = await defaultCommentRepo.createComment(commentData);
        if (!response.error) {
          Toast.show({
            type: "success",
            text1: "Comment thành công",
          });

          const newComment = { ...response.data, replies: [] };
          if (commentData.parent_id) {
            // Nếu có parent_id, thêm bình luận vào replies của bình luận cha
            setComments((prev) =>
              prev.map((comment) =>
                comment.id === commentData.parent_id
                  ? {
                      ...comment,
                      replies: [...(comment.replies || []), newComment],
                    }
                  : comment
              )
            );
          } else {
            // Nếu là bình luận cấp 1
            setComments((prev) => [...prev, newComment]);
          }
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
        replyToCommentId = null;
        setReplyToReplyId(null);
        textInputRef.current?.blur();
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
    handleAddComment,
    setNewComment,
    setReplyToCommentId,
    setReplyToReplyId,
    fetchReplies,
    handleUpdate,
    handleDelete,
    handleAction,
    isEditModalVisible,
    setEditModalVisible,
    editCommentContent,
    setEditCommentContent,
    handleEditComment,
    currentCommentId,
    fetchRepliesToReply,
  };
};

export default usePostDetailsViewModel;