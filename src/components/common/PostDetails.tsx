import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Button,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import useColor from "@/src/hooks/useColor";
import usePostDetailsViewModel from "./PostDetailsViewModel/PostDetailsViewModel";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/auth/useAuth";
import { useLocalSearchParams } from "expo-router";
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import { ActivityIndicator, Form } from "@ant-design/react-native";
import Post from "./Post";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import dayjs from "dayjs";

function PostDetails(): React.JSX.Element {
  const {
    brandPrimary,
    brandPrimaryTap,
    backgroundColor,
    lightGray,
    grayBackground,
  } = useColor();

  const router = useRouter();
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);
  const postId = useLocalSearchParams().postId as string;
  const { user, localStrings } = useAuth();
  const [commentForm] = Form.useForm();
  const {
    comments,
    likeCount,
    userLikes,
    newComment,
    textInputRef,
    handleLike,
    handleAction,
    handleAddComment,
    setNewComment,
    setReplyToReplyId,
    handleEditComment,
    fetchReplies,
  } = usePostDetailsViewModel(postId, replyToCommentId);
  const [post, setPost] = useState<PostResponseModel | null>(null);
  const fetchPostDetails = async () => {
    const fetchedPost = await defaultPostRepo.getPostById(postId);
    setPost(fetchedPost.data);
  };
  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  const [showMoreReplies, setShowMoreReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");

  const renderReplies = (replies: CommentsResponseModel[]) => {
    return (
      <FlatList
        data={replies}
        keyExtractor={(reply) => reply.id.toString()}
        renderItem={({ item: reply }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              backgroundColor: "#f9f9f9",
              borderRadius: 5,
              marginBottom: 10,
              paddingLeft: 20, // Indentation for nested replies
            }}
          >
            {/* User Info and Reply Content */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri: user?.avatar_url || "https://i.pravatar.cc/150?img=1",
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {user?.family_name} {user?.name}
                </Text>
                <Text style={{ fontSize: 12, color: "#888" }}>
                  {dayjs(reply.created_at).format("DD/MM/YYYY")}
                </Text>
                <Text style={{ marginVertical: 5 }}>{reply.content}</Text>
              </View>
            </View>
  
            {/* Action Buttons: Like and Reply */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => handleLike(reply.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <AntDesign
                  name={userLikes[reply.id] ? "heart" : "hearto"}
                  size={16}
                  color={userLikes[reply.id] ? "red" : brandPrimary}
                />
                <Text style={{ marginLeft: 5 }}>
                  {likeCount[reply.id] || reply.likeCount}
                </Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                onPress={() => {
                  setReplyToCommentId(reply.parent_id ?? null);
                  textInputRef.current?.focus();
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <FontAwesome name="reply" size={16} color={brandPrimaryTap} />
                <Text style={{ marginLeft: 5 }}>
                  {localStrings.Public.Reply}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => handleAction(reply.id)}
              >
                <AntDesign name="bars" size={20} color={brandPrimaryTap} />
                <Text style={{ marginLeft: 5 }}>{localStrings.Public.Action}</Text>
              </TouchableOpacity>
            </View>
  
            {/* Nested Replies */}
            {reply.replies && reply.replies.length > 0 && (
              <View style={{ marginTop: 10, paddingLeft: 20 }}>
                {showMoreReplies[reply.id]
                  ? renderReplies(reply.replies)
                  : renderReplies(reply.replies.slice(0, 1))}
                {reply.replies.length > 1 && !showMoreReplies[reply.id] && (
                  <TouchableOpacity
                    onPress={() =>
                      setShowMoreReplies((prev) => ({
                        ...prev,
                        [reply.id]: true,
                      }))
                    }
                    style={{ marginTop: 10 }}
                  >
                    <Text style={{ color: brandPrimaryTap }}>
                      Xem thêm {reply.replies.length - 1} bình luận
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
      />
    );
  };  

  const renderCommentItem = (comments: CommentsResponseModel) => {
    return (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          backgroundColor: "#fff",
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: user?.avatar_url || "https://i.pravatar.cc/150?img=1",
            }}
            style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>
              {user?.family_name} {user?.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#888" }}>
              {dayjs(comments.created_at).format("DD/MM/YYYY")}
            </Text>
            <Text style={{ marginVertical: 5 }}>{comments.content} </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
            onPress={() => handleLike(comments.id)}
          >
            <AntDesign
              name={userLikes[comments.id] ? "heart" : "hearto"} // Hiển thị icon "tim" tương ứng
              size={20}
              color={userLikes[comments.id] ? "red" : brandPrimary} // Đổi màu đỏ nếu đã like
            />
            <Text style={{ marginLeft: 5 }}>
              {likeCount[comments.id] || 0} {/* Hiển thị số lượt like */}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
            onPress={() => {
              console.log("Comment được trả lời:", comments.id);
              setReplyToCommentId(comments.id); // Trả lời bình luận cha
              setReplyToReplyId(null); // Không trả lời bình luận con
              setNewComment("");
              textInputRef.current?.focus(); // Hiển thị bàn phím
              console.log("replyToCommentId sau khi thiết lập:", comments.id);
            }}
          >
            <FontAwesome name="reply" size={20} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>{localStrings.Public.Reply}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => handleAction(comments.id)}
          >
            <AntDesign name="bars" size={20} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>{localStrings.Public.Action}</Text>
          </TouchableOpacity>
        </View>

        {/* Nút để xem phản hồi */}
      <TouchableOpacity
        onPress={() => fetchReplies(comments.id, comments.id)} // Gọi fetchReplies khi nhấn
      >
        <Text style={{ color: brandPrimaryTap }}>Xem phản hồi</Text>
      </TouchableOpacity>
        {/* Hiển thị các phản hồi */}
        {comments.replies && comments.replies.length > 0 && (
          <View style={{ paddingLeft: 20 }}>
            {renderReplies(comments.replies)}
            
          </View>
        )}
      </View>
    );
  };

  const renderFlatList = useCallback(
    (comments: CommentsResponseModel[]) => {
      return (
        <FlatList
          ListHeaderComponent={
            <>
              <View style={{ height: 1, backgroundColor: "#000" }} />
              <Post post={post as PostResponseModel} />
              <View style={{ height: 1, backgroundColor: "#000" }} />
            </>
          }
          style={{ flex: 1 }}
          data={comments}
          renderItem={({ item }) => renderCommentItem(item)}
          keyExtractor={(comment) => comment.id.toString()}
        />
      );
    },
    [comments, post]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            marginTop: 30,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
            {localStrings.Public.Comment}
          </Text>
        </View>
 

        {/* FlatList */}
        {!post ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {renderFlatList(comments)}
            <Form style={{ backgroundColor: "#fff" }} form={commentForm}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Image
                  source={{ uri: user?.avatar_url }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />

                <Form.Item noStyle name="comment" layout="vertical">
                  <TextInput
                    ref={textInputRef}
                    style={{
                      flex: 1,
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                    placeholder={localStrings.Public.CommonActions}
                    value={commentForm.getFieldValue("comment")}
                    onChangeText={(value) =>
                      commentForm.setFieldValue("comment", value)
                    }
                  />
                </Form.Item>

                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 50,
                    marginLeft: 10,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.5,
                    elevation: 5,
                  }}
                >
                  {/* <TouchableOpacity
                    onPress={() => {
                      commentForm.submit();
                      console.log(
                        "comment form: ",
                        commentForm.getFieldValue("comment")
                      );

                      const comment = commentForm.getFieldValue("comment");
                      if (!comment) {
                        return;
                      }
                      handleAddComment(comment).then(() => {
                        commentForm.resetFields();
                      });
                    }}
                  >
                    <FontAwesome name="send-o" size={30} color={brandPrimary} />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      commentForm.submit();
                      console.log(
                        "comment form: ",
                        commentForm.getFieldValue("comment")
                      );

                      const comment = commentForm.getFieldValue("comment");
                      if (!comment) {
                        return; // Nếu không có bình luận thì không làm gì
                      }
                      handleAddComment(comment).then(() => {
                        commentForm.resetFields(); // Đặt lại trường bình luận
                      });
                    }}
                  >
                    <FontAwesome name="send-o" size={30} color={brandPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            </Form>
          </>
        )}

        {/* Modal */}
        <Modal visible={isEditModalVisible} animationType="slide">
          <View>
            <TextInput
              value={editCommentContent}
              onChangeText={setEditCommentContent}
            />
            <Button title="Lưu" onPress={handleEditComment} />
            <Button title="Hủy" onPress={() => setEditModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PostDetails;
