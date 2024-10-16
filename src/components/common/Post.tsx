import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card } from '@ant-design/react-native';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import MediaView from '../foundation/MediaView';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useAuth } from '@/src/context/auth/useAuth';
import { router } from 'expo-router';
import { DateTransfer, getTimeDiff } from '../../utils/helper/DateTransfer';

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

  const showAction = () => {
    const options = user?.id === post?.user?.id ? [
      localStrings.Post.EditPost,
      localStrings.Post.EditPrivacy,
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
              console.log('Chỉnh sửa bài viết action selected');
              router.push('/updatePost');
              break;
            case 1:
              console.log('Chỉnh sửa quyên riêng tư action selected');
              router.push('/object')
              break;
            case 2:
              console.log('Chuyển vào thể rác action selected');
              break;
            case 3:
              console.log('Quảng cách bài viết action selected');
              break;
            default:
              break;
          }
        } else {
          if (buttonIndex === 0) {
            console.log('báo cáo action selected');
            router.push('/updatePost');
          }
        }
      }
    );
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
              <Text style={{ fontWeight: 'bold', fontSize: 14, width: '100%' }}>{post?.user?.family_name} {post?.user?.name}</Text>
              <Text style={{ color: brandPrimaryTap, fontSize: 12, opacity: 0.5 }}>{getTimeDiff(post?.created_at, localStrings)}</Text>
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
            source={{ uri: post?.user?.avatar_url }}
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
            <Text>{post?.content}</Text>
          </View>
          {children}
        </View>
      ) : (
        <View style={{ paddingLeft: 65, paddingRight: 35 }}>
          <View style={{ paddingBottom: 12, paddingLeft: 0 }}>
            <Text>{post?.content}</Text>
          </View>
          {post?.media && post?.media?.length > 0 && <MediaView mediaItems={post?.media} />}
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
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="hearto" size={20} color={brandPrimary} />
                <Text style={{ marginLeft: 5, color: brandPrimary }}>{post?.like_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="comments-o" size={20} color={brandPrimary} />
                <Text style={{ marginLeft: 5, color: brandPrimary }}>{post?.comment_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="sharealt" size={20} color={brandPrimary} />
              </TouchableOpacity>
            </View>
          }
        />
      ) : <></>}
    </Card>
  );
}

export default Post;
