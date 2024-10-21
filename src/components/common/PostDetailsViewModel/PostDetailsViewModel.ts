import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

// Dữ liệu cứng cho danh sách bình luận
const initialComments = [
  {
    id: 1,
    user: 'User 1',
    content: 'Bình luận 1',
    likes: 5,
    timestamp: Date.now(),
    replies: [],
  },
  {
    id: 2,
    user: 'User 2',
    content: 'Bình luận 2',
    likes: 10,
    timestamp: Date.now(),
    replies: [
      {
        id: 3,
        user: 'User 3',
        content: 'Trả lời cho Bình luận 2',
        likes: 2,
        timestamp: Date.now(),
        replies: [{
          id: 4,
          user: 'User 4',
          content: 'Bình luận 4',
          likes: 5,
          timestamp: Date.now(),
          replies: [{
            id: 5,
            user: 'User 5',
            content: 'Bình luận 5',
            likes: 5,
            timestamp: Date.now(),
            replies: [
              {
                id: 6,
                user: 'User 6',
                content: 'Bình luận 6',
                likes: 5,
                timestamp: Date.now(),
                replies: [],
              },
            ],
          }],
        },],
      },
    ],
  },
];

const usePostDetailsViewModel = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [comments, setComments] = useState(initialComments);
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({ 1: 5, 2: 10 });
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyToReplyId, setReplyToReplyId] = useState<number | null>(null);
  const textInputRef = useRef<TextInput>(null);

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
    const options = ['Báo cáo bình luận',  'Hủy'];
    showActionSheetWithOptions(
      {
        title: 'Chọn hành động',
        options: options,
        cancelButtonIndex: options.length - 1,
        cancelButtonTintColor: '#F95454',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log('Báo cáo bình luận được chọn');
        }
      }
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: Math.floor(Math.random() * 1000),  // Tạo ID ngẫu nhiên cho bình luận
        user: 'Current User',  // Người dùng hiện tại
        content: newComment,   // Nội dung bình luận
        likes: 0,
        timestamp: Date.now(),
        replies: [],  // Bình luận mới chưa có trả lời nào
      };
  
      // Hàm đệ quy để thêm trả lời vào đúng bình luận con
      const addReplyToComment = (commentsArray: any[], commentId: number): any[] => {
        return commentsArray.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, newCommentObject],  // Thêm trả lời vào bình luận
            };
          } else if (comment.replies.length > 0) {
            // Nếu comment có trả lời, gọi đệ quy để tiếp tục tìm kiếm comment cần thêm trả lời
            return {
              ...comment,
              replies: addReplyToComment(comment.replies, commentId),
            };
          }
          return comment;
        });
      };
  
      if (replyToReplyId !== null) {
        // Nếu là trả lời cho một bình luận con (replies của comment cha)
        setComments((prevComments) => addReplyToComment(prevComments, replyToReplyId));
      } else if (replyToCommentId !== null) {
        // Nếu là trả lời cho một bình luận cha
        setComments((prevComments) => addReplyToComment(prevComments, replyToCommentId));
      } else {
        // Nếu là bình luận mới
        setComments((prevComments) => [...prevComments, newCommentObject]);
      }
  
      // Xóa dữ liệu nhập sau khi thêm bình luận
      setNewComment('');
      setReplyToCommentId(null);
      setReplyToReplyId(null);
      textInputRef.current?.blur();  // Ẩn bàn phím sau khi thêm
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
