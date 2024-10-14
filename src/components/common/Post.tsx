import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActionSheet, Button, Card } from '@ant-design/react-native';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import MediaView from '../foundation/MediaView';
import { t } from 'i18next';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('user');
      const user = userInfoString ? JSON.parse(userInfoString) : null;
      
      setUserInfo(user);
    }
    fetchUserInfo();
  }, []);

  const showAction = () => {
    const BUTTONS = userInfo?.id === post?.user?.id ? [
      { text: 'Chỉnh sửa bài viết'},
      { text: 'Chỉnh sửa quyền riêng tư'},
      { text: 'Chuyển vào thùng rác'},
      { text: 'Quảng cáo bài viết'},
    ] : [
      { text: 'Report'},
    ];

    const options = BUTTONS.map((button, index) => `${button.text}`);

    ActionSheet.showActionSheetWithOptions(
      {
        title: 'Actions',
        message: 'Available actions',
        options: options,
        cancelButtonIndex: BUTTONS.length - 1,
      },
      (buttonIndex) => {
        if (userInfo?.id === post?.user?.id) {
          if (buttonIndex === 0) {
            console.log('Chỉnh sửa bài viết action selected');
          } else if (buttonIndex === 1) {
            console.log('Chỉnh sửa quyền riêng tư action selected');
          } else if (buttonIndex === 2) {
            console.log('Chuyển vào thùng rác action selected');
          } else if (buttonIndex === 3) {
            console.log('Quảng cáo bài viết action selected');
          }
        } else {
          if (buttonIndex === 0) {
            console.log('báo cáo action selected');
            router.push('/object');
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
