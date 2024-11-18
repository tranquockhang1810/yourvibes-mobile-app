import { ActivityIndicator, Alert, Image, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import useColor from '@/src/hooks/useColor';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/src/context/auth/useAuth';
import ReportPostViewModel from '../viewModel/ReportPostViewModel';
import { defaultPostRepo } from '@/src/api/features/post/PostRepo';
import Post from '@/src/components/common/Post';
import { Button } from '@ant-design/react-native';

const ReportPostScreen = ({ postId, userId, commentId }: { postId?: string; userId?: string; commentId?: string }) => {
  const { brandPrimary, backgroundColor } = useColor();
  const [reportReason, setReportReason] = useState('');
  const { localStrings } = useAuth();
  const {getPostDetail, reportPost, loading, post, userInfo, reportUser, getUser, reportComment } = ReportPostViewModel(defaultPostRepo);

  const renderPost = useCallback(() => {
    if (loading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color={brandPrimary} />
				</View>
			);
		} else {
			return (
				<Post post={post} noFooter>
					{post?.parent_post && <Post post={post?.parent_post} isParentPost />}
				</Post>
			);
		}
	}, [post, loading]);

  const renderUserInfo = useCallback(() => {
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={brandPrimary} />
        </View>
      );}else{
        return (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "60%" }}>
                          <Image
                            source={{ uri: userInfo?.avatar_url }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                            }}
                          />
                          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>{userInfo?.family_name + ' ' + userInfo?.name}</Text>
                        </View>
        );
      }
    }, [userInfo, loading]);

    const renderComment = useCallback(() => {
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={brandPrimary} />
                </View>
            );
        } else {
            return (
               <Text> báo cáo comment {commentId}</Text>
            );
        }
    }
    , [commentId, loading]);

    useEffect(() => {
        if (postId) {
            getPostDetail(postId);
        }
        if (userId) {
            getUser(userId);
        }
    }, [postId, userId]);

    const handleReport = () => {
        if (postId) {
            reportPost({ post_id: postId, reason: reportReason });
        } else if (userId) {
            reportUser({ user_id: userId, reason: reportReason });
        }
        else if (commentId) {
            reportComment({ comment_id: commentId, reason: reportReason });
        }
    };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1 }}>
			{/* Header */}
			<View style={{ backgroundColor: backgroundColor, paddingTop: 40 }}>
				<StatusBar barStyle="dark-content" />
				<View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
					<View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
						<TouchableOpacity onPress={() => { router.back(); }}>
							<Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
						</TouchableOpacity>
						<Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
							{post && localStrings.Post.ReportPost}
              {/* {userInfo && localStrings.Post.ReportUser} */}
              {commentId && localStrings.PostDetails.ReportComment}
						</Text>
					</View>
				</View>
			</View>

			{/* Content */}
			<ScrollView style={{ flex: 1 }}>
				{/* bài viết được chọn */}
				{post && renderPost()}
        {userInfo && renderUserInfo()}
        {commentId && renderComment()}
				 {/* Nội dung báo cáo */}
         <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {post && localStrings.Report.ReportPost}
            {userInfo && localStrings.Report.ReportUser}
            {commentId && localStrings.Report.ReportComment}
          </Text>
          <Text style={{ marginVertical: 10, color: '#666' }}>
            Nếu bạn nhận thấy sự đe dọa hoặc nguy hiểm, đừng chần chừ mà hãy tìm
            ngay sự giúp đỡ trước khi báo cáo với YourVibes.
          </Text>

          <TextInput
            style={{
              height: 180,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 10,
              marginVertical: 10,
              textAlignVertical: 'top',
            }}
            multiline
            value={reportReason}
            onChangeText={setReportReason}
          />
        </View>
			</ScrollView>

			{/* Footer */}
			<View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
			    <Button type='primary' onPress={()=>{
            handleReport();
          }}>
					<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{localStrings.Post.ReportPost}</Text>
				</Button>
			</View>
		</ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default ReportPostScreen;

