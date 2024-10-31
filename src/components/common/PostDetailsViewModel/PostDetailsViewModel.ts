import { useState, useRef, useEffect } from "react";
import { TextInput, Modal, LogBox } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
//Comments
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import { defaultCommentRepo } from "@/src/api/features/comment/CommentRepo";
import { CreateCommentsRequestModel } from "@/src/api/features/comment/models/CreateCommentsModel";
import { UpdateCommentsRequestModel } from "@/src/api/features/comment/models/UpdateCommentsModel";
import Toast from "react-native-toast-message";
//LikeComments
import { PostLikeCommentRequestModel } from "@/src/api/features/likeComment/models/PostLikeComment";
import { GetLikeCommentModel } from "@/src/api/features/likeComment/models/GetLikeCommentRequestModel";
import { defaultLikeCommentRepo } from "@/src/api/features/likeComment/LikeCommentRepo";

const usePostDetailsViewModel = (
  postId: string,
  replyToCommentId: string | null
) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [comments, setComments] = useState<CommentsResponseModel[]>([]);
  const [replyMap, setReplyMap] = useState<{ [key: string]: CommentsResponseModel[] }>({});
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

  const fetchReplies = async (postId: string, parentId: string) => {
    try {
      const replies = await defaultCommentRepo.getReplies(postId, parentId);
      if (replies && replies.data) {
        console.log("Data vừa lấy: ", replies.data);
        setReplyMap((prevReplyMap) => {
          console.log("replyMap updated: ", {
            ...prevReplyMap,
            [parentId]: replies.data,
          });
          
          return {
            ...prevReplyMap,
            [parentId]: replies.data,
          }
        })
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
              setEditCommentContent(comments.find((comment) => comment.id === commentId)?.content || "");
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

  const handleEditComment = async (commentId: string) => {
    if (!currentCommentId || !editCommentContent) {
      console.error("Invalid comment ID or content");
      return;
    }
  
    await handleUpdate(currentCommentId, editCommentContent);
    setEditModalVisible(false); // Close modal
    setEditCommentContent("");
    setCurrentCommentId("");
    console.log("Edit comment saved and modal closed.");
  };
  
  const handleUpdate = async (commentId: string, updatedContent: string) => {
    if (!defaultCommentRepo) {
      console.error("Default comment repo is not defined");
      throw new Error("Default comment repo is not defined");
    }
    try {
      const updateCommentData: UpdateCommentsRequestModel = {
        comments_id: commentId,
        content: updatedContent,
      };
  
      // Removed unnecessary check for defaultCommentRepo here
  
      const response = await defaultCommentRepo.updateComment(commentId, updateCommentData);
  
      if (response && response.data) {
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content: updatedContent };
          }
          return comment;
        });
        setComments(updatedComments);
        Toast.show({
          type: "success",
          text1: "Cập nhật bình luận thành công",
        });
        fetchComments();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Cập nhật bình luận thất bại",
      });
    }
  };

  useEffect(() => {
    if (isEditModalVisible) {
      console.log("Edit modal is now visible.");
    }
  }, [isEditModalVisible]);


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
      const commentData: CreateCommentsRequestModel = {
        post_id: postId,
        content: comment,
      };
  
      try {
        const response = await defaultCommentRepo.createComment(commentData);
        if (!response.error) {
          Toast.show({
            type: "success",
            text1: "Comment thành công",
          });
  
          const newComment = { ...response.data, replies: [] };
          setComments((prev) => [...prev, newComment]); // Cập nhật lại state comments
          fetchComments(); // Gọi lại hàm fetchComments để cập nhật lại danh sách comment
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
        textInputRef.current?.blur();
      }
    }
  };
  
  const handleAddReply = async (comment: string) => {
    if (comment.trim()) {
      const parentId = replyToReplyId || replyToCommentId;
  
      const commentData: CreateCommentsRequestModel = {
        post_id: postId,
        content: comment,
        parent_id: parentId,
      };
  
      try {
        const response = await defaultCommentRepo.createComment(commentData);
        if (!response.error) {
          Toast.show({
            type: "success",
            text1: "Comment thành công",
          });
  
          const newComment = { ...response.data, replies: [] };
          setComments((prev) => {
            const parentComment = prev.find((comment) => comment.id === parentId);
            return [...prev];
          });
          fetchComments(); // Gọi lại hàm fetchComments để cập nhật lại danh sách comment
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
    handleAddReply,
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
    replyMap
  };
};

export default usePostDetailsViewModel;