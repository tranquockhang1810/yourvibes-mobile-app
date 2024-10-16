import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import useColor from '@/src/hooks/useColor';
import MyInput from '@/src/components/foundation/MyInput';
import { ActivityIndicator, Button } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

import { defaultPostRepo } from '@/src/api/features/post/PostRepo';
import AddPostViewModel from '../viewModel/AddpostViewModel';
import { useAuth } from '@/src/context/auth/useAuth';
import { CreatePostRequestModel } from '@/src/api/features/post/models/CreatePostRequestModel';
import { convertMediaToFiles } from '@/src/utils/helper/TransferToFormData';
import Toast from 'react-native-toast-message';
import { Privacy } from '@/src/api/baseApiResponseModel/baseApiResponseModel';
import { usePostContext } from '@/src/context/post/usePostContext';

const AddPostScreen = () => {
  const { user } = useAuth()
  const savedPost = usePostContext()
  const { brandPrimary, backgroundColor, brandPrimaryTap } = useColor();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    postContent,
    setPostContent,
    selectedImages,
    setSelectedImages,
    selectedImageFiles,
    setSelectedImageFiles,
    createPost,
    createLoading,
    privacy,
    setPrivacy,
  } = AddPostViewModel(defaultPostRepo);

  // Function to pick images
  const pickImage = async () => {
    setLoading(true); // Start loading
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true, // Allow multiple images if needed
        quality: 1,
      });

      if (!result?.canceled && result?.assets) {
        const newImages = result?.assets?.map((asset) => asset.uri); // Map the selected image URIs
        setSelectedImages([...selectedImages, ...newImages]);
        setSelectedImageFiles([...selectedImageFiles, ...result.assets]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images.');
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
      Toast.show({
        type: 'error',
        text1: 'Vui lòng nhập nội dung hoặc đính kèm hình ảnh hoặc video',
      })
      return;
    }
    const mediaFiles = await convertMediaToFiles(selectedImageFiles);
    const newPost: CreatePostRequestModel = {
      content: postContent,
      privacy: privacy,
      location: 'HCM',
      title: 'TEST',
      media: mediaFiles,
    };
    await createPost(newPost);
  };

  const renderPrivacyText = () => {
    switch (privacy) {
      case Privacy.PUBLIC:
        return 'mọi người';
      case Privacy.FRIEND_ONLY:
        return 'bạn bè';
      case Privacy.PRIVATE:
        return 'chỉ mình tôi';
      default:
        return 'mọi người';
    }
  };

  useEffect(() => {
    if (savedPost.savedPostContent) {
      setPostContent(savedPost.savedPostContent)
    }
    if (savedPost.savedSelectedImages) {
      setSelectedImages(savedPost.savedSelectedImages)
    }
    if (savedPost.savedPrivacy) {
      setPrivacy(savedPost.savedPrivacy)
    }
  }, [savedPost])
  

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
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user?.family_name + " " + user?.name || "Unknown User"}</Text>
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

        {/* Buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 20
        }}>
          {/* Privacy Section */}
          <Text style={{ color: 'gray', fontSize: 14, paddingRight: 5 }}>
            Bài đăng sẽ được chia sẻ với
          </Text>
          <TouchableOpacity
            onPress={() => {
              savedPost?.setSavedPostContent!(postContent as string);
              savedPost?.setSavedPrivacy!(privacy);
              savedPost?.setSavedSelectedImages!(selectedImages as string[]);
              savedPost?.setSavedSelectedImageFiles!(selectedImageFiles);
              router.push('/object');
            }}
          >
            <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' }}>
              {renderPrivacyText()}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: 'gray', fontSize: 14, paddingRight: 5 }}>
            !
          </Text>

          {/* Post Button */}
          <Button
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 20,
              height: 30,
            }}
            size='large'
            onPress={handleSubmitPost}
            loading={createLoading}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Đăng ngay</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPostScreen;
