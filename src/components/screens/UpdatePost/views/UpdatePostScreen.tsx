import {
    View,
    ScrollView,
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
  import { router, useLocalSearchParams } from 'expo-router'; // Thêm useLocalSearchParams
  import * as ImagePicker from 'expo-image-picker';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Toast from 'react-native-toast-message';
  import { Video } from 'expo-av';
  
  import { defaultPostRepo } from '@/src/api/features/post/PostRepo';
  import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
  import { Privacy } from '@/src/api/baseApiResponseModel/baseApiResponseModel';
  import { useAuth } from '@/src/context/useAuth';
  
  const UpdatePostScreen = () => {
    const { brandPrimary, backgroundColor, brandPrimaryTap } = useColor();
    const [loading, setLoading] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [userInfo, setUserInfo] = useState<any>(null);
    
    const { postId } = useLocalSearchParams(); // Lấy postId từ route params
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        const { user } = useAuth();
        setUserInfo(user);
      };
      fetchUserInfo();
    }, []);
  
    const pickImage = async () => {
      setLoading(true);
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsMultipleSelection: true,
          quality: 1,
        });
  
        if (!result.canceled && result.assets) {
          const newImages = result.assets.map((asset) => asset.uri);
          setSelectedImages([...selectedImages, ...newImages]);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to pick images.');
      } finally {
        setLoading(false);
      }
    };
  
    const removeImage = (index: number) => {
      const updatedImages = [...selectedImages];
      updatedImages.splice(index, 1);
      setSelectedImages(updatedImages);
    };
  
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ backgroundColor: backgroundColor, paddingTop: 30 }}>
            <StatusBar barStyle="dark-content" />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                 <TouchableOpacity onPress={() => {
                            console.log("Navigating back...");
                            setSelectedImages([]);
                            router.push("/(tabs)/home"); // Đường dẫn điều hướng
                        }}>
                            <Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
                        </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>Chỉnh sửa bài đăng</Text>
              </View>
            </View>
          </View>
  
          {/* Avatar và Input */}
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
          {/* Hình ảnh đã chọn */}
          <View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedImages.map((imageUri, index) => (
              <View key={index} style={{ position: 'relative', marginRight: 10, marginBottom: 10 }}>
                {imageUri.endsWith('.mp4') ? (
                  <Video source={{ uri: imageUri }} useNativeControls style={{ width: 80, height: 80 }} />
                ) : (
                  <Image source={{ uri: imageUri }} style={{ width: 80, height: 80 }} />
                )}
                <TouchableOpacity onPress={() => removeImage(index)} style={{ position: 'absolute', top: -10, right: -10 }}>
                  <Ionicons name="close" size={18} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={pickImage} style={{ width: 80, height: 80, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
              {loading ? <ActivityIndicator size="small" color={brandPrimary} /> : <Ionicons name="image-outline" size={30} color={brandPrimary} />}
            </TouchableOpacity>
          </View>
  
          {/* Nút cập nhật */}
          <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 10, 
        marginTop: 20 
        }}>
        <Text style={{ color: 'gray', fontSize: 14, paddingRight: 5 }}>
        Bài đăng sẽ được chia sẻ với 
        </Text>
        <TouchableOpacity onPress={() => router.push('/object')}>
            <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' }}>
                mọi người
            </Text>
        </TouchableOpacity> 
        <Text style={{ color: 'gray', fontSize: 14, paddingRight: 5 }}>
            !
        </Text>
        <TouchableOpacity 
            style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 15,
            alignItems: 'center',
            justifyContent: 'center',
            }}
            onPress={() => Alert.alert('Cập nhật', 'Bài đăng đã được cập nhật!')}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Xong</Text>
        </TouchableOpacity>
        </View>

        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default UpdatePostScreen;
  