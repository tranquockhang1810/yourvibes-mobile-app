import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import useColor from "@/src/hooks/useColor";
import usePostDetailsViewModel from "./PostDetailsViewModel/PostDetailsViewModel";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/auth/useAuth";
import { useLocalSearchParams } from "expo-router";
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import {
  ActivityIndicator,
  Form,
  ActionSheet,
  Tabs,
} from "@ant-design/react-native";
import Post from "./Post";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import dayjs from "dayjs";
import { LikeUsersModel } from "@/src/api/features/post/models/LikeUsersModel";

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
    textInputRef,
    userLikes,
    handleLike,
    handleAction,
    handleAddComment,
    handleAddReply,
    setNewComment,
    setReplyToReplyId,
    handleUpdate,
    fetchReplies,
    currentCommentId,
    isEditModalVisible,
    setEditModalVisible,
    replyMap,
    likeCount,
    fetchComments,
    replyToReplyId,
    setEditCommentContent,
    editCommentContent,
    userLikePost,
  } = usePostDetailsViewModel(postId, replyToCommentId);
  const [likedComment, setLikedComment] = useState({ is_liked: false });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostResponseModel | null>(null);
  const parentId = replyToCommentId || replyToReplyId;
  const [showMoreReplies, setShowMoreReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [tab, setTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const tabs = [{ title: "Likes" }, { title: "Comments" }];

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const fetchedPost = await defaultPostRepo.getPostById(postId);
      if (!fetchedPost.error) {
        setPost(fetchedPost.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderLikeIcon = useCallback(
    (comment: CommentsResponseModel) => {
      const isLiked = userLikes[comment?.id] === true;
      return isLiked || comment?.is_liked ? (
        <AntDesign name="heart" size={16} color="red" />
      ) : (
        <AntDesign name="hearto" size={16} color={brandPrimaryTap} />
      );
    },
    [userLikes]
  );

  const renderReplies = useCallback(
    (replies: CommentsResponseModel[]) => {
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
                paddingLeft: 20, // Thụt lề cho các phản hồi lồng nhau
              }}
            >
              {/* Thông tin người dùng và nội dung phản hồi */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      reply?.user?.avatar_url ||
                      "https://i.pravatar.cc/150?img=1",
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
                    {reply?.user?.family_name} {reply?.user?.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#888" }}>
                    {dayjs(reply.created_at).format("DD/MM/YYYY")}{" "}
                  </Text>
                  <Text style={{ marginVertical: 5 }}>{reply.content}</Text>
                </View>
              </View>
              {/* Nút Thích, Trả lời và Hành động */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                {/* Like */}
                <TouchableOpacity
                  onPress={() =>
                    handleLike(reply.id).then(() =>
                      fetchReplies(postId, reply.parent_id as string)
                    )
                  }
                >
                  {renderLikeIcon(reply)}
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: 5 }}>
                  <Text style={{ color: brandPrimary, marginRight: 20 }}>
                    {likeCount[reply.id] || reply.like_count}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setReplyToCommentId(reply.parent_id ?? null);
                    setReplyToReplyId(reply.id);
                    textInputRef.current?.focus();
                    fetchReplies(postId, reply.id); //
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <FontAwesome name="reply" size={16} color={brandPrimaryTap} />
                  <Text style={{ marginLeft: 5 }}>
                    {localStrings.Public.Reply}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => handleAction(reply)}
                >
                  <AntDesign name="bars" size={20} color={brandPrimaryTap} />
                  <Text style={{ marginLeft: 5 }}>
                    {localStrings.Public.Action}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Nút để xem phản hồi lồng nhau */}
              {reply.rep_comment_count > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    fetchReplies(postId, reply.id);
                    setShowMoreReplies((prev) => ({
                      ...prev,
                      [reply.id]: !prev[reply.id],
                    }));
                  }}
                  style={{ marginTop: 10 }}
                >
                  <View style={{ alignItems: "center" }}>
                    <AntDesign name="down" size={16} color={brandPrimaryTap} />
                    <Text style={{ fontSize: 12, color: brandPrimaryTap }}>
                      {showMoreReplies[reply.id]
                        ? `${localStrings.PostDetails.HideReplies}`
                        : `${localStrings.PostDetails.ViewReplies}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {/* Hiển thị các phản hồi lồng nhau */}
              {showMoreReplies[reply.id] && replyMap[reply.id] && (
                <View style={{ marginTop: 10, paddingLeft: 20 }}>
                  {renderReplies(replyMap[reply.id])}
                </View>
              )}
            </View>
          )}
        />
      );
    },
    [replyMap, comments]
  );

  const renderCommentItem = useCallback(
    (comments: CommentsResponseModel) => {
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
                uri:
                  comments?.user?.avatar_url ||
                  "https://i.pravatar.cc/150?img=1",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                marginRight: 10,
              }}
            />
            <View>
              <Text style={{ fontWeight: "bold" }}>
                {comments?.user?.family_name} {comments?.user?.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#888" }}>
                {dayjs(comments.created_at).format("DD/MM/YYYY")}
              </Text>
              <Text style={{ marginVertical: 5 }}>{comments.content} </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Like */}
            <TouchableOpacity
              onPress={() =>
                handleLike(likedComment ? (comments.id as string) : "").then(
                  () => fetchComments()
                )
              }
            >
              {likedComment && comments && renderLikeIcon(comments)}
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 5, marginRight: 20 }}>
              <Text style={{ color: brandPrimary }}>{comments.like_count}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => {
                console.log("Comment được trả lời:", comments.id);
                setReplyToCommentId(comments.id);
                setReplyToReplyId(null);
                setNewComment("");
                textInputRef.current?.focus();
                console.log("replyToCommentId sau khi thiết lập:", comments.id);
              }}
            >
              <FontAwesome name="reply" size={20} color={brandPrimaryTap} />
              <Text style={{ marginLeft: 5 }}>{localStrings.Public.Reply}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => handleAction(comments)}
            >
              <AntDesign name="bars" size={20} color={brandPrimaryTap} />
              <Text style={{ marginLeft: 5 }}>
                {localStrings.Public.Action}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nút để xem phản hồi */}
          {comments.rep_comment_count > 0 && (
            <TouchableOpacity
              onPress={() => {
                fetchReplies(postId, comments.id);
                setShowMoreReplies((prev) => ({
                  ...prev,
                  [comments.id]: !prev[comments.id],
                }));
              }}
              style={{ marginTop: 10 }}
            >
              <View style={{ alignItems: "center" }}>
                <AntDesign name="down" size={16} color={brandPrimaryTap} />
                <Text style={{ fontSize: 12, color: brandPrimaryTap }}>
                  {showMoreReplies[comments.id]
                    ? `${localStrings.PostDetails.HideReplies}`
                    : `${localStrings.PostDetails.ViewReplies}`}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* Hiển thị các phản hồi */}
          {replyMap[comments.id] &&
            replyMap[comments.id].length > 0 &&
            showMoreReplies[comments.id] && (
              <View style={{ paddingLeft: 20 }}>
                {renderReplies(replyMap[comments.id])}
              </View>
            )}
        </View>
      );
    },
    [comments, replyMap, showMoreReplies]
  );

  const renderLikedUserItem = useCallback(
    (like: LikeUsersModel) => {
      return (
        <View
          key={like.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
            onPress={() => {
              router.push(`/(tabs)/user/${like.id}`);
            }}
          >
            <Image
              source={{ uri: like.avatar_url }}
              style={{
                marginLeft: 10,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#e0e0e0",
                marginRight: 10,
              }}
            />
            <Text style={{ fontSize: 16, color: "black" }}>
              {like.family_name} {like.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    },
    [userLikePost]
  );

  const renderBody = useCallback(
    (item: any) => {
      switch (tab) {
        case 0:
          return renderLikedUserItem(item);
        case 1:
          return renderCommentItem(item);
        default:
          return renderCommentItem(item);
      }
    },
    [tab, comments, replyMap, showMoreReplies]
  );

  const renderFlatList = useCallback(
    (items: CommentsResponseModel[] | LikeUsersModel[]) => {
      return (
        <FlatList
          ListHeaderComponent={
            <>
              <View style={{ height: 1, backgroundColor: "#000" }} />
              <Post noComment={true} post={post as PostResponseModel} />
              <View
                style={{ height: 1, backgroundColor: "#000", opacity: 0.1 }}
              />
              {/* <Tabs
                tabs={tabs}
                initialPage={tab}
                tabBarPosition="top"
                tabBarActiveTextColor={brandPrimary}
                onChange={(_, index) => setTab(index)}
                animated={false}
                style={{ height: "100%" }}
              /> */}
            </>
          }
          style={{ flex: 1 }}
          data={items as any[]}
          renderItem={({ item }) => renderBody(item)}
          keyExtractor={(comment) => comment.id.toString()}
          onRefresh={fetchPostDetails}
          refreshing={loading}
        />
      );
    },
    [comments, post, replyMap, loading, tab]
  );

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

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
            marginTop: Platform.OS === "ios" ? 30 : 0,
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
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {tab === 1
              ? renderFlatList(comments)
              : renderFlatList(userLikePost)}
              
            <Button
              title={localStrings.Public.WhoLike}
              onPress={() => setIsVisible(true)}
              color={brandPrimaryTap}
            />
            {/* comment input */}
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
                    onBlur={() => {
                      setReplyToCommentId(null);
                      console.log(
                        "Tạm biệt replyToCommentId: ",
                        replyToCommentId
                      );
                    }}
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
                  <TouchableOpacity
                    onPress={() => {
                      const comment = commentForm.getFieldValue("comment");
                      if (!comment) {
                        return;
                      }
                      const parentId = setReplyToReplyId
                        ? String(setReplyToReplyId)
                        : replyToCommentId
                        ? String(replyToCommentId)
                        : null;

                      setLoading(true);
                      if (parentId) {
                        handleAddReply(comment).then(() => {
                          setNewComment("");
                          setReplyToReplyId(null);
                          textInputRef.current?.blur();
                          commentForm.resetFields();
                          setLoading(false);
                        });
                      } else {
                        handleAddComment(comment).then(() => {
                          commentForm.resetFields();
                          setLoading(false);
                        });
                      }
                    }}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color={brandPrimary} />
                    ) : (
                      <FontAwesome
                        name="send-o"
                        size={30}
                        color={brandPrimary}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Form>
            <Modal
              visible={isVisible}
              transparent
              onRequestClose={() => setIsVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                      marginTop: Platform.OS === "ios" ? 30 : 0,

                      borderBottomWidth: 1,
                      borderBottomColor: "black",
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                      <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {localStrings.Public.ListUserLikePost}
                    </Text>
                  </View>
                  <ScrollView
                    style={{
                      flex: 1, // thiết lập chiều cao tự động
                    }}
                  >
                    {/* Danh sách user like post */}
                    <View
                      style={{ flexDirection: "column", alignItems: "center" }}
                    >
                      {userLikePost?.map((like, index) => {
                        return renderLikedUserItem(like);
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </>
        )}
        {/* Modal edit comment */}
        <Modal visible={isEditModalVisible} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
              }}
            >
              {/* Avatar và Input chỉnh sửa bình luận */}
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginHorizontal: 10,
                  }}
                >
                  <View>
                    <Image
                      source={{
                        uri:
                          user?.avatar_url ||
                          "https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg",
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                      }}
                    />
                  </View>

                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {user?.family_name + " " + user?.name ||
                          localStrings.Public.UnknownUser}
                      </Text>

                      <Form>
                        <Form.Item noStyle>
                          <TextInput
                            value={editCommentContent}
                            onChangeText={setEditCommentContent}
                            style={{
                              borderWidth: 1,
                              borderColor: lightGray,
                              borderRadius: 5,
                              padding: 10,
                              backgroundColor: grayBackground,
                              marginTop: 10,
                            }}
                          />
                        </Form.Item>
                      </Form>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              {/* Nút lưu và hủy */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  title={
                    loading
                      ? localStrings.Public.Save
                      : localStrings.Public.Save
                  }
                  disabled={loading}
                  onPress={() => {
                    if (currentCommentId && editCommentContent) {
                      setLoading(true);
                      handleUpdate(
                        currentCommentId,
                        editCommentContent,
                        parentId || ""
                      ).then(() => {
                        setLoading(false);
                        setEditModalVisible(false);
                        setEditCommentContent(""); // Clear TextInput
                      });
                    } else {
                      console.error("Invalid comment ID or content");
                    }
                  }}
                />
                <Button
                  title={localStrings.PostDetails.Cancel}
                  onPress={() => {
                    setEditModalVisible(false);
                    setEditCommentContent(""); // Clear TextInput
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
export default PostDetails;