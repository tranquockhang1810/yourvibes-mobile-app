import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Card, Modal } from '@ant-design/react-native';
import { Entypo, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import MediaView from '../foundation/MediaView';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useAuth } from '@/src/context/auth/useAuth';
import { router } from 'expo-router';
import { DateTransfer, getTimeDiff } from '../../utils/helper/DateTransfer';
import EditPostViewModel from '../screens/editPost/viewModel/EditPostViewModel';
import { defaultPostRepo } from '@/src/api/features/post/PostRepo';
import { Privacy } from '@/src/api/baseApiResponseModel/baseApiResponseModel';
import MyInput from '../foundation/MyInput';

const Post = ({
  post,
  isParentPost = false,
  children
}: {
  post?: PostResponseModel,
  isParentPost?: boolean,
  children?: React.ReactNode
}) => {
  const { brandPrimary, brandPrimaryTap, lightGray } = useColor();
  const { user, localStrings } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [sharePostPrivacy, setSharePostPrivacy] = useState<Privacy | undefined>(Privacy.PUBLIC);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const {
    deletePost,
    deleteLoading,
    likePost,
    likedPost,
    setLikedPost,
    sharePost,
    shareLoading
  } = EditPostViewModel(defaultPostRepo);

  const showAction = () => {
    const options = user?.id === post?.user?.id ? [
      localStrings.Post.EditPost,
      localStrings.Post.DeletePost,
      localStrings.Post.Advertisement,
      localStrings.Public.Cancel
    ] : [
      localStrings.Post.ReportPost,
      localStrings.Public.Cancel
    ];

    showActionSheetWithOptions(
      {
        title: localStrings.Public.Action,
        options: options,
        cancelButtonIndex: options.length - 1,
        cancelButtonTintColor: "#F95454"
      },
      (buttonIndex) => {
        if (user?.id === post?.user?.id) {
          switch (buttonIndex) {
            case 0:
              router.push(`/edit-post/${post?.id}`);
              break;
            case 1:
              Modal.alert(
                localStrings.Public.Confirm,
                localStrings.DeletePost.DeleteConfirm,
                [
                  { text: localStrings.Public.Cancel, style: 'cancel' },
                  { text: localStrings.Public.Confirm, onPress: () => deletePost(post?.id as string) },
                ]
              );
              break;
            case 2:
              console.log('Quảng cách bài viết action selected');
              break;
            default:
              break;
          }
        } else {
          if (buttonIndex === 0) {
            console.log('báo cáo action selected');
            //router.push('/updatePost');
          }
        }
      }
    );
  };

  useEffect(() => {
    if (!likedPost) {
      setLikedPost(post);
    }
  }, [post, likedPost]);

  const renderPrivacyIcon = () => {
    switch (likedPost?.privacy) {
      case Privacy.PUBLIC:
        return <Ionicons name="globe" size={16} color={brandPrimaryTap} />;
      case Privacy.FRIEND_ONLY:
        return <Ionicons name="people" size={16} color={brandPrimaryTap} />;
      case Privacy.PRIVATE:
        return <Ionicons name="lock-closed" size={16} color={brandPrimaryTap} />;
      default:
        return null;
    }
  }

  const renderPrivacyText = () => {
    switch (sharePostPrivacy) {
      case Privacy.PUBLIC:
        return localStrings.Public.Everyone.toLowerCase();
      case Privacy.FRIEND_ONLY:
        return localStrings.Public.Friend.toLowerCase();
      case Privacy.PRIVATE:
        return localStrings.Public.Private.toLowerCase();
      default:
        return localStrings.Public.Everyone.toLowerCase();
    }
  };

  return (
    <Card style={{
      margin: 10,
      borderColor: isParentPost ? brandPrimary : "white",
    }}>
      {/* Header */}
      <Card.Header
        style={{
          height: 60,
          width: '100%',
        }}
        title={
          <View style={{ flexDirection: 'row', marginRight: 8 }}>
            <View style={{ flexDirection: 'column', marginLeft: 8, width: '92%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{likedPost?.user?.family_name} {likedPost?.user?.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: brandPrimaryTap, fontSize: 12, opacity: 0.5, marginRight: 10 }}>{getTimeDiff(likedPost?.created_at, localStrings)}</Text>
                {renderPrivacyIcon()}
              </View>
            </View>
            {!isParentPost && (
              <TouchableOpacity
                style={{ width: '8%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                onPress={showAction}
              >
                <Entypo name="dots-three-vertical" size={16} />
              </TouchableOpacity>
            )}
          </View>
        }
        thumb={
          <Image
            source={{ uri: likedPost?.user?.avatar_url }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30
            }}
          />
        }
      />

      {/* Content */}
      {!isParentPost && children ? (
        <View>
          <View style={{ paddingLeft: 10 }}>
            <Text>{likedPost?.content}</Text>
          </View>
          {children}
        </View>
      ) : (
        <View style={{ paddingLeft: 65, paddingRight: 35 }}>
          <View style={{ paddingBottom: 12, paddingLeft: 0 }}>
            <Text>{likedPost?.content}</Text>
          </View>
          {likedPost?.media && likedPost?.media?.length > 0 && <MediaView mediaItems={likedPost?.media} />}
        </View>
      )}

      {/* Footer */}
      {!isParentPost ? (
        <Card.Footer
          style={{ borderTopWidth: 1, borderColor: lightGray }}
          content={
            <View style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 30,
              marginTop: 10,
              paddingLeft: 50,
              paddingRight: 20
            }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  likePost(likedPost?.id as string)
                }}
                >
                  <AntDesign name={likedPost?.is_liked ? "heart" : "hearto"} size={20} color={likedPost?.is_liked ? "red" : brandPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5 }}>
                  <Text style={{ color: brandPrimary }}>{likedPost?.like_count}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => router.push(`/postDetails?postId=${likedPost?.id}`)} >
                <FontAwesome name="comments-o" size={20} color={brandPrimary} />
                <Text style={{ marginLeft: 5, color: brandPrimary }}>{likedPost?.comment_count}</Text>
              </TouchableOpacity>

              {shareLoading ? (
                <>
                  <ActivityIndicator size={'small'} />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      // sharePost(likedPost?.id as string);
                      setShowSharePopup(true);
                    }}
                  >
                    <AntDesign name="sharealt" size={20} color={brandPrimary} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          }
        />
      ) : <></>}

      {/* Loading */}
      <ActivityIndicator
        animating={deleteLoading}
        toast
        size="large"
        text="Deleting..."
      />

      {/* Share popup */}
      <Modal
        popup
        visible={showSharePopup}
        animationType="slide-up"
        maskClosable
        onClose={() => setShowSharePopup(false)}>
        <View style={{ paddingVertical: 20 }}>
          {/* Avatar anh Input */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: 10,
              }}>
              <View>
                <Image
                  source={{ uri: user?.avatar_url || "https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg" }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30
                  }}
                />
              </View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user?.family_name + " " + user?.name || localStrings.Public.UnknownUser}</Text>
                  <MyInput
                    placeholder={localStrings.AddPost.WhatDoYouThink}
                    variant='outlined'
                    moreStyle={{ paddingLeft: 10, marginTop: 10, borderColor: brandPrimaryTap }}
                    textArea={{
                      autoSize: { minRows: 3, maxRows: 3 },
                    }}
                    value={postContent}
                    onChangeText={setPostContent}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {/* Buttons */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 20
          }}>
            {/* Privacy Section */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'gray', fontSize: 14, paddingRight: 5 }}>
                {localStrings.AddPost.PrivacyText}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowPrivacyPopup(true);
                  Modal.operation([
                    { text: localStrings.Public.Everyone, onPress: () => setSharePostPrivacy(Privacy.PUBLIC) },
                    { text: localStrings.Public.Friend, onPress: () => setSharePostPrivacy(Privacy.FRIEND_ONLY) },
                    { text: localStrings.Public.Private, onPress: () => setSharePostPrivacy(Privacy.PRIVATE) },
                  ])
                }}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' }}>
                  {renderPrivacyText()}!
                </Text>
              </TouchableOpacity>
            </View>

            {/* Post Button */}
            <Button
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 20,
                height: 30,
              }}
              size='large'
              onPress={() => sharePost(likedPost?.id as string)}
              loading={shareLoading}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{localStrings.Post.SharePost}</Text>
            </Button>
          </View>

          {/* Parent Post */}
          <Post post={likedPost} isParentPost />
        </View>
      </Modal>

    </Card>
  );
}

export default Post;