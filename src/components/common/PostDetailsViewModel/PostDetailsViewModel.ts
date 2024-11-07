import { useState, useRef, useEffect, useCallback } from "react";
import { TextInput, Modal, LogBox } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useAuth } from "@/src/context/auth/useAuth";
import Toast from "react-native-toast-message";
//Comments
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import { defaultCommentRepo } from "@/src/api/features/comment/CommentRepo";
import { CreateCommentsRequestModel } from "@/src/api/features/comment/models/CreateCommentsModel";
import { UpdateCommentsRequestModel } from "@/src/api/features/comment/models/UpdateCommentsModel";
//LikeComments
import { defaultLikeCommentRepo } from "@/src/api/features/likeComment/LikeCommentRepo";
import { LikeCommentResponseModel } from "@/src/api/features/likeComment/models/LikeCommentResponses";

const usePostDetailsViewModel = (
  postId: string,
  replyToCommentId: string | null
) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [comments, setComments] = useState<CommentsResponseModel[]>([]);
  const [replyMap, setReplyMap] = useState<{
    [key: string]: CommentsResponseModel[];
  }>({});
  const [likeCount, setLikeCount] = useState<{ [key: string]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: string]: boolean }>({});
  const [newComment, setNewComment] = useState("");
  const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);
  const [setReplyToCommentId] = useState<string | null>(null);
  const [likeIcon, setLikeIcon] = useState("heart-outline");
  const textInputRef = useRef<TextInput>(null);
  const [renderLikeIconState, setRenderLikeIconState] = useState(false);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [currentCommentId, setCurrentCommentId] = useState("");

  const { user, localStrings } = useAuth();

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
          };
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${localStrings.PostDetails.ErrorReplies}`,
      });
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
 
  const handleAction = (commentId: string) => {
    const options = [
      `${localStrings.PostDetails.ReportComment}`,
      `${localStrings.PostDetails.EditComment}`,
      `${localStrings.PostDetails.DeleteComment}`,
      `${localStrings.PostDetails.Cancel}`,
    ];

    const comment = comments.find((comment) => comment.id === commentId);
    const reply = replyMap[commentId];

    if (comment && comment.user?.id !== user?.id) {
      options.splice(1, 1); // Xóa tùy chọn "Chỉnh sửa bình luận" nếu comment là của người khác
    } else if (reply && reply.length > 0 && reply[0].user?.id !== user?.id) {
      options.splice(1, 1); // Xóa tùy chọn "Chỉnh sửa bình luận" nếu reply là của người khác
    }

    showActionSheetWithOptions(
      {
        title: `${localStrings.PostDetails.ActionOptions}`,
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
                text1: `${localStrings.PostDetails.ReportSusesfully}`,
                text2: commentToReport.content,
              });
              console.log(
                `Báo cáo bình luận với nội dung: "${commentToReport.content}" có id: ${commentId} "tại bài viết ${postId}"`
              );
            }
            break;

            case 1:
              const commentToEdit = comments.find((comment) => comment.id === commentId);
              if (commentToEdit) {
                setEditCommentContent(commentToEdit.content);
                console.log('editCommentContent:', editCommentContent); 
                setCurrentCommentId(commentId);
                setEditModalVisible(true);
              } else {
                const replyToEdit = replyMap[commentId];
                if (replyToEdit && replyToEdit.length > 0) {
                  setEditCommentContent(replyToEdit[0].content);
                  console.log('editCommentContent:', editCommentContent); 
                  setCurrentCommentId(replyToEdit[0].id);
                  setEditModalVisible(true);
                }
              }
              break;

          // case 1:
          //   const commentToEdit = comments.find(
          //     (comment) => comment.id === commentId
          //   );
          //   if (commentToEdit && commentToEdit.user?.id === user?.id) {
          //     console.log("Comment Được Chọn để Sửa:", commentToEdit);
          //     setEditCommentContent(
          //       comments.find((comment) => comment.id === commentId)?.content ||
          //         ""
          //     );
          //     setCurrentCommentId(commentId);
          //     console.log(
          //       "Setting edit modal to visible for comment ID:",
          //       commentId
          //     );
          //     setEditModalVisible(true);
          //     console.log("Edit modal visible status:", isEditModalVisible);
          //   } else {
          //     const replyToEdit = replyMap[commentId];
          //     if (
          //       replyToEdit &&
          //       replyToEdit.length > 0 &&
          //       replyToEdit[0].user?.id === user?.id
          //     ) {
          //       console.log("Reply Được Chọn để Sửa:", replyToEdit[0]);
          //       setEditCommentContent(replyToEdit[0].content || "");
          //       setCurrentCommentId(commentId);
          //       setEditModalVisible(true);
          //       handleEditReply(commentId, editCommentContent);
          //     }
          //   }
          //   break;

          case 2:
            handleDelete(commentId);
            break;

          default:
            break;
        }
      }
    );
  };

  const handleLike = async (commentOrReplyId: string) => {
    const isLike =
      userLikes[commentOrReplyId] === undefined
        ? true
        : !userLikes[commentOrReplyId];

    try {
      const response = await defaultLikeCommentRepo.postLikeComment({
        commentId: commentOrReplyId,
        isLike,
      });

      if (response && response.data) {
        const likeCommentResponse: LikeCommentResponseModel = response.data;
        // Cập nhật trạng thái like dựa trên response trả về
        setUserLikes((prevUserLikes) => ({
          ...prevUserLikes,
          [commentOrReplyId]: likeCommentResponse.is_liked ?? false,
        }));
        setLikeCount((prevLikes) => ({
          ...prevLikes,
          [commentOrReplyId]: likeCommentResponse.like_count,
        }));

        // Cập nhật biến renderLikeIconState
        setRenderLikeIconState(Boolean(likeCommentResponse.is_liked));
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
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
  }; 

  useEffect(() => {
    console.log('editCommentContent:', editCommentContent);
  }, [editCommentContent]);

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

      const response = await defaultCommentRepo.updateComment(
        commentId,
        updateCommentData
      );

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
          text1: `${localStrings.PostDetails.EditCommentSuccess}`,
        });
        fetchComments();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${localStrings.PostDetails.EditCommentFailed}`,
      });  
    }
  };

  const handleEditReply = async (replyId: string, updatedContent: string) => {
    console.log('handleEditReply được gọi');
    try {
      const updateReplyData: UpdateCommentsRequestModel = {
        comments_id: replyId,
        content: updatedContent,
      };
  
      const response = await defaultCommentRepo.updateComment(
        replyId,
        updateReplyData
      );
  
      if (response && response.data) {
        const updatedReplies = replyMap[replyId].map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, content: updatedContent };
          }
          return reply;
        });
        setReplyMap((prevReplyMap) => ({
          ...prevReplyMap,
          [replyId]: updatedReplies,
        }));
        Toast.show({
          type: "success",
          text1: `${localStrings.PostDetails.EditReplySuccess}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${localStrings.PostDetails.EditReplyFailed}`,
      });
    } 
    console.log('isEditModalVisible REPLY:', isEditModalVisible);
  };
  
  useEffect(() => {
    if (isEditModalVisible) {
      console.log("Edit modal is now visible.");
    }
  }, [isEditModalVisible]);

  // const handleDelete = (commentId: string) => {
  //   showActionSheetWithOptions(
  //     {
  //       title: `${localStrings.PostDetails.DeleteComment}`,
  //       options: [
  //         `${localStrings.PostDetails.Yes}`,
  //         `${localStrings.PostDetails.No}`,
  //       ],
  //       cancelButtonIndex: 1,
  //       cancelButtonTintColor: "#F95454",
  //     },
  //     (buttonIndex) => {
  //       if (buttonIndex === 0) {
  //         defaultCommentRepo
  //           .deleteComment(commentId)
  //           .then(() => {
  //             // Cập nhật trạng thái comments
  //             setComments((prevComments) =>
  //               prevComments.filter((comment) => comment.id !== commentId)
  //             );
  //             // Cập nhật trạng thái replyMap
  //             if (replyMap[commentId]) {
  //               setReplyMap((prevReplyMap) => {
  //                 const updatedReplies = prevReplyMap[commentId].filter(
  //                   (reply) => reply.id !== commentId
  //                 );
  //                 return { ...prevReplyMap, [commentId]: updatedReplies };
  //               });
  //             } else {
  //               // Nếu không có replies, cập nhật trạng thái replyMap để xóa commentId
  //               setReplyMap((prevReplyMap) => {
  //                 const updatedReplyMap = { ...prevReplyMap };
  //                 delete updatedReplyMap[commentId];
  //                 return updatedReplyMap;
  //               });
  //             }
  //             // Cập nhật lại danh sách replies của comment
  //             const parentId = replyToCommentId || replyToReplyId;
  //             if (parentId) {
  //               const updatedReplies = replyMap[parentId].filter(
  //                 (reply) => reply.id !== commentId
  //               );
  //               setReplyMap((prevReplyMap) => ({
  //                 ...prevReplyMap,
  //                 [parentId]: updatedReplies,
  //               }));
  //               fetchReplies(postId, parentId);
  //             }

  //             Toast.show({
  //               type: "success",
  //               text1: `${localStrings.PostDetails.DeteleReplySuccess}`,
  //             });
  //           })
  //           .catch((error) => {
  //             Toast.show({
  //               type: "error",
  //               text1: `${localStrings.PostDetails.DeteleReplyFailed}`,
  //             });
  //           });
  //       }
  //     }
  //   );
  // };


  const handleDelete = (commentId: string) => {
    showActionSheetWithOptions(
      {
        title: `${localStrings.PostDetails.DeleteComment}`,
        options: [
          `${localStrings.PostDetails.Yes}`,
          `${localStrings.PostDetails.No}`,
        ],
        cancelButtonIndex: 1,
        cancelButtonTintColor: "#F95454",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          defaultCommentRepo
            .deleteComment(commentId).then(() => {
              // Cập nhật trạng thái comments
              setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
              );
  
              // Cập nhật trạng thái replyMap
              if (replyMap[commentId]) {
                setReplyMap((prevReplyMap) => {
                  const updatedReplies = prevReplyMap[commentId].filter(
                    (reply) => reply.id !== commentId
                  );
                  return { ...prevReplyMap, [commentId]: updatedReplies };
                });
              } else {
                // Nếu không có replies, cập nhật trạng thái replyMap để xóa commentId
                setReplyMap((prevReplyMap) => {
                  const updatedReplyMap = { ...prevReplyMap };
                  delete updatedReplyMap[commentId];
                  return updatedReplyMap;
                });
              }
  
              // Cập nhật lại danh sách replies của comment
              const parentId = replyToCommentId || replyToReplyId;
              if (parentId) {
                const updatedReplies = replyMap[parentId].filter(
                  (reply) => reply.id !== commentId
                );
                setReplyMap((prevReplyMap) => ({
                  ...prevReplyMap,
                  [parentId]: updatedReplies,
                }));
                fetchReplies(postId, parentId);
              }
  
              Toast.show({
                type: "success",
                text1: `${localStrings.PostDetails.DeteleReplySuccess}`,
              });
            })
            .catch((error) => {
              Toast.show({
                type: "error",
                text1: `${localStrings.PostDetails.DeteleReplyFailed}`,
              });
            });
        }
      }
    );
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
            text1: `${localStrings.PostDetails.CommentSuccess}`,
          });

          const newComment = { ...response.data, replies: [] };
          setComments((prev) => [...prev, newComment]); // Cập nhật lại state comments
          fetchComments(); // Gọi lại hàm fetchComments để cập nhật lại danh sách comment
        } else {
          Toast.show({
            type: "error",
            text1: `${localStrings.PostDetails.CommentFailed}`,
          });
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        Toast.show({
          type: "error",
          text1: `${localStrings.PostDetails.CommentFailed}`,
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
            text1: `${localStrings.PostDetails.ReplySuccess}`,
          });

          const newComment = { ...response.data, replies: [] };
          setComments((prev) => {
            const parentComment = prev.find(
              (comment) => comment.id === parentId
            );
            return [...prev];
          });
          fetchComments(); // Gọi lại hàm fetchComments để cập nhật lại danh sách comment
        } else {
          Toast.show({
            type: "error",
            text1: `${localStrings.PostDetails.ReplyFailed}`,
          });
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        Toast.show({
          type: "error",
          text1: `${localStrings.PostDetails.ReplyFailed}`,
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
    handleEditReply,
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
    replyMap,
    likeIcon,
    fetchComments,
  };
};

export default usePostDetailsViewModel;
