import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import usePostDetailsViewModel from './PostDetailsViewModel/PostDetailsViewModel';

const PostDetails = () => {
  const { brandPrimary, brandPrimaryTap } = useColor();
  const {
    comments,
    likeCount,
    userLikes,
    newComment,
    replyToCommentId,
    replyToReplyId,
    textInputRef, 
    handleLike,
    handleReport,
    handleAddComment,
    setNewComment,
    setReplyToCommentId,
    setReplyToReplyId,
  } = usePostDetailsViewModel();

  
  const renderReplies = (replies: any[]) => {
    return replies.map((reply) => (
      <View key={reply.id} style={{ marginTop: 10, paddingLeft: 20, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?img=${reply.id}` }} 
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: 'bold' }}>{reply.user}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>{new Date(reply.timestamp).toLocaleString()}</Text>
            <Text>{reply.content}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleLike(reply.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name={userLikes[reply.id] ? 'heart' : 'hearto'} size={16} color={brandPrimary} />
            <Text style={{ marginLeft: 5 }}>{likeCount[reply.id] || reply.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
            onPress={() => {
              setReplyToReplyId(reply.id);
              setNewComment('');
              textInputRef.current?.focus();
            }}
          >
            <FontAwesome name="reply" size={16} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>Trả lời</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReport} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <AntDesign name="warning" size={16} color={brandPrimaryTap} />
            <Text style={{ marginLeft: 5 }}>Báo cáo</Text>
          </TouchableOpacity>
        </View>
        {renderReplies(reply.replies)}
      </View>
    ));
  };

  const renderComment = ({ item }: any) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
          style={{ width: 50, height: 50, borderRadius: 30, marginRight: 10 }}
        />
        <View>
          <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
          <Text style={{ fontSize: 12, color: '#888' }}>{new Date(item.timestamp).toLocaleString()}</Text>
          <Text style={{ marginVertical: 5 }}>{item.content}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
          onPress={() => handleLike(item.id)}
        >
          <AntDesign name={userLikes[item.id] ? 'heart' : 'hearto'} size={20} color={brandPrimary} />
          <Text style={{ marginLeft: 5 }}>{likeCount[item.id] || item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
          onPress={() => {
            setReplyToCommentId(item.id);
            setNewComment('');
            textInputRef.current?.focus();
          }}
        >
          <FontAwesome name="reply" size={20} color={brandPrimaryTap} />
          <Text style={{ marginLeft: 5 }}>Trả lời</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleReport}>
          <AntDesign name="warning" size={20} color={brandPrimaryTap} />
          <Text style={{ marginLeft: 5 }}>Báo cáo</Text>
        </TouchableOpacity>
      </View>
      {renderReplies(item.replies)}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#eaeaea' }}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=8' }} // Avatar cho người dùng hiện tại
          style={{ width: 40, height: 40, borderRadius: 15, marginRight: 10 }}
        />
        <TextInput //xài my input trong foundation
          ref={textInputRef}
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#fff',
            // Đổ bóng (iOS)
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            // Đổ bóng (Android)
            elevation: 5,
          }}
          placeholder="Nhập bình luận của bạn..."
          value={newComment}
          onChangeText={setNewComment}
        />

        <View style={{
          backgroundColor: 'white',
          borderRadius: 50,
          marginLeft: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 5,
        }}>
          <TouchableOpacity
            onPress={handleAddComment}
            style={{ padding: 10 }}
          >
            <FontAwesome name="send-o" size={20} color={brandPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostDetails;