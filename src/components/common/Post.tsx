import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActionSheet, Button, Card } from '@ant-design/react-native';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import MediaView from '../foundation/MediaView';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useAuth } from '@/src/context/useAuth';

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
  const { user } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();

  const showAction = () => {
    const options = user?.id === post?.user?.id ? [
      'Chỉnh sửa bài viết',
      'Chỉnh sửa quyền riêng tư',
      'Chuyển vào thùng rác',
      'Quảng cáo bài viết',
      'Hủy'
    ] : [
      'Báo cáo bài viết',
      'Hủy'
    ];

    ActionSheet.showActionSheetWithOptions(
      {
        //title: 'Hành động',
        options: options,
        cancelButtonIndex: options.length - 1,
        cancelButtonTintColor: "#F95454"
      },
      (buttonIndex) => {
        if (user?.id === post?.user?.id) {
          switch (buttonIndex) {
            case 0:
              console.log('Chỉnh sửa bài viết action selected');
              break;
            case 1:
              console.log('Chỉnh sửa quyên riêng tư action selected');
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
          switch (buttonIndex) {
            case 0:
              console.log('báo cáo action selected');
              break;
            default:
              break;
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
              <Text style={{ fontWeight: 'bold', fontSize: 14, width: '100%' }}>{post?.user?.name}</Text>
              <Text style={{ color: brandPrimaryTap, fontSize: 12, opacity: 0.5 }}>{post?.createdAt}</Text>
            </View>
            {!isParentPost && (
              <TouchableOpacity
                style={{ width: '8%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                onPress={showAction} // Gọi hàm khi nhấn vào biểu tượng
              >
                <Entypo name="dots-three-vertical" size={16} />
              </TouchableOpacity>
            )}
          </View>
        }
        thumb={
          <Image
            source={{ uri: post?.user?.avatar }}
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
          {post?.mediaUrl && <MediaView mediaItems={post?.mediaUrl} />}
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
                <Text style={{ marginLeft: 5, color: brandPrimary }}>{post?.likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="comments-o" size={20} color={brandPrimary} />
                <Text style={{ marginLeft: 5, color: brandPrimary }}>{post?.commentCount}</Text>
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
