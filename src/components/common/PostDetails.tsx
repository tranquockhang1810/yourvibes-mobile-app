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
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import useColor from "@/src/hooks/useColor";
import usePostDetailsViewModel from "./PostDetailsViewModel/PostDetailsViewModel";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/auth/useAuth";
import { useLocalSearchParams } from "expo-router";
import { CommentsResponseModel } from "@/src/api/features/comment/models/CommentResponseModel";
import { render } from "react-dom";

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
  const {
    comments,
    likeCount,
    userLikes,
    newComment,
    textInputRef,
    handleLike,
    handleReport,
    handleAddComment,
    setNewComment,
    setReplyToReplyId,
  } = usePostDetailsViewModel(postId); //Nhận postId
  const [showMoreReplies, setShowMoreReplies] = useState<{
    [key: string]: boolean;
  }>({});

  const renderReplies = (replies: CommentsResponseModel[]) => {
    if (!replies || !Array.isArray(replies)) {
      return null; // Nếu replies không phải là mảng, không render gì cả
    }
    return replies.map((reply) => (
      <View
        key={reply.id}
        style={{
          marginTop: 10,
          paddingLeft: 20,
          backgroundColor: "#f9f9f9",
          borderRadius: 5,
        }}
      >
        {renderCommentItem(reply)}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: user?.avatar_url || "https://i.pravatar.cc/150?img=1",
            }}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>
              {user?.family_name} {user?.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#888" }}>
              {new Date(reply.createdAt).toLocaleString()}
            </Text>
            <Text>{reply.content}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
            onPress={() => handleLike(parseInt(reply.id))}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <AntDesign
              name={userLikes[parseInt(reply.id) as number] ? "hearto" : "heart"}
              size={16}
              color={brandPrimary}
            />
            <Text style={{ marginLeft: 5 }}>
              {likeCount[parseInt(reply.id) as number] || reply.likeCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
            onPress={() => {
              setReplyToCommentId(null);
              setReplyToReplyId(parseInt(reply.id));
              setNewComment("");
              textInputRef.current?.focus();
            }}
          >
            <FontAwesome name="reply" size={16} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>{localStrings.Public.Reply}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReport}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <AntDesign name="bars" size={16} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>{localStrings.Public.Action}</Text>
          </TouchableOpacity>
        </View>

        {reply.replies.length > 1 && !showMoreReplies[reply.id] && (
          <TouchableOpacity
            onPress={() =>
              setShowMoreReplies((prev) => ({ ...prev, [reply.id]: true }))
            }
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: brandPrimaryTap }}>
              Xem thêm {reply.replies.length - 1} bình luận
            </Text>
          </TouchableOpacity>
        )}

        {showMoreReplies[reply.id as string]
          ? renderReplies(reply.replies)
          : renderReplies(reply.replies.slice(0, 1))}
      </View>
    ));
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
              {comments.createdAt}
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
            onPress={() => handleLike}
          >
            <AntDesign
              name={userLikes ? "heart" : "hearto"}
              size={20}
              color={brandPrimary}
            />
            <Text style={{ marginLeft: 5 }}>{}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
            onPress={() => {
              setReplyToCommentId(comments.id); // Trả lời bình luận cha
              setReplyToReplyId(null); // Không trả lời bình luận con
              setNewComment("");
              textInputRef.current?.focus(); // Hiển thị bàn phím
            }}
          >
            <FontAwesome name="reply" size={20} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>{localStrings.Public.Reply}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={handleReport}
          >
            <AntDesign name="bars" size={20} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>{localStrings.Public.Action}</Text>
          </TouchableOpacity>
        </View>
        {comments.replies && renderReplies(comments.replies)}
      </View>
    );
  };

  const renderFlatList = useCallback((comments: CommentsResponseModel[]) => {
    console.log("comments: ", comments);
    return (
      <FlatList
        style={{ flex: 1 }}
        data={comments}
        renderItem={({ item }) => renderCommentItem(item)}
        keyExtractor={(comment) => comment.id.toString()}
      />
    );
  }, [comments]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
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

        <View style={{ height: 1, backgroundColor: "#000" }} />

        {comments &&  comments.length > 0 && renderFlatList(comments)}

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Image
            source={{ uri: user?.avatar_url }}
            style={{ width: 45, height: 45, borderRadius: 25, marginRight: 10 }}
          />
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
            value={newComment}
            onChangeText={setNewComment}
          />

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
            <TouchableOpacity onPress={handleAddComment}>
              <FontAwesome name="send-o" size={30} color={brandPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PostDetails;
