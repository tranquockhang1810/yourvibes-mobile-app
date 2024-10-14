import {
  View,
  ScrollView,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import useColor from '@/src/hooks/useColor';
import MyInput from '@/src/components/foundation/MyInput';
import { ActivityIndicator, Button } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';

import { defaultPostRepo } from '@/src/api/features/post/PostRepo';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import AddPostViewModel from '../viewModel/AddpostViewModel';
import { Privacy } from '@/src/api/baseApiResponseModel/baseApiResponseModel';

const AddPostScreen = () => {
  const { brandPrimary, backgroundColor, brandPrimaryTap } = useColor();
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { createPost } = AddPostViewModel(defaultPostRepo);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('user');
      const user = userInfoString ? JSON.parse(userInfoString) : null;
      console.log('User:', user);
      
      setUserInfo(user);
    };
    fetchUserInfo();
  }, []);

  // Function to pick images
  const pickImage = async () => {
    setLoading(true); // Start loading
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true, // Allow multiple images if needed
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset) => asset.uri); // Map the selected image URIs
        setSelectedImages([...selectedImages, ...newImages]);
      }
    } finally {
      setLoading(false); // End loading after images are selected
    }
  };
  // Function to remove selected image
  const removeImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleSubmitPost = async () => {
    if (postContent.trim() === '' && selectedImages.length === 0) {
      alert('Please add some content or images.');
      return;
    }

    const newPost: PostResponseModel = {
      id: new Date().getTime().toString(),
      user: {
        id: userInfo?.id || '1',
        name: userInfo?.name || 'Unknown User',
        avatar: userInfo?.avatar || 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg',
      },
      content: postContent,
      mediaUrl: selectedImages.map(uri => ({ mediaUrl: uri, status: true })),
      likeCount: 0,
      commentCount: 0,
      createdAt: 'Vừa xong',
      privacy: Privacy.Public,
      status: true,
    };
    try {
      setLoading(true);
      await createPost(newPost);
      Toast.show({ text1: 'Post saved successfully', type: 'success' });
      router.replace('/(tabs)');
      setPostContent('');
      setSelectedImages([]);
    } catch (error) {
      console.error("Error saving post:", error);
      Toast.show({ text1: 'Error saving post', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ backgroundColor: backgroundColor, paddingTop: 30 }}>
          <StatusBar barStyle="dark-content" />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
              backgroundColor: backgroundColor,
              justifyContent: 'space-between',
            }}>
              <TouchableOpacity onPress={() => {
                setSelectedImages([]);
                router.push("/(tabs)")
              }}>
                <Ionicons name="close" size={24} color={brandPrimary} />
              </TouchableOpacity>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginLeft: 10,
              }}>
                Bài viết mới
              </Text>
            </View>
          </View>
        </View>
        {/* Avatar anh Input */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 10,
          }}>
          <View>
            <Image
              source={{ uri: userInfo?.avatar || "https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg" }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 30
              }}
            />
          </View>
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{userInfo?.name || "Unknown User"}</Text>
              <MyInput
                placeholder='Bạn đang nghĩ gì?'
                variant='outlined'
                moreStyle={{ paddingLeft: 10, marginTop: 10, borderColor: brandPrimaryTap }}
                textArea={{
                  autoSize: { minRows: 3, maxRows: 3 },
                }}
                autoFocus
                value={postContent}
                onChangeText={setPostContent}
              />
            </View>
          </View>
        </View>
        {/* Image Upload Section */}
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedImages.map((imageUri, index) => (
              <View key={index} style={{ position: 'relative', marginRight: 10, marginBottom: 10 }}>
                {imageUri?.endsWith('.mp4') ? (
                  <Video
                    source={{ uri: imageUri }}
                    useNativeControls
                    style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: '#f0f0f0' }}
                  />
                ) : (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: '#f0f0f0' }}
                  />
                )}
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    padding: 2
                  }}
                >
                  <Ionicons name="close" size={18} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            {/* Add Image Button */}
            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                backgroundColor: '#f0f0f0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <ActivityIndicator size="small" color={brandPrimary} /> // Show loader when loading
              ) : (
                <Ionicons name="image-outline" size={30} color={brandPrimary} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Post Button */}
        <View style={{ paddingHorizontal: 10 }}>
          <Button
            style={{
              backgroundColor: brandPrimary,
              borderColor: brandPrimary,
              height: 45,
              borderRadius: 30,
            }}
            onPress={handleSubmitPost}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Đăng Ngay</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPostScreen;
