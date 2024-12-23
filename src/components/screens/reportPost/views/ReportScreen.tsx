import { Keyboard, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import useColor from '@/src/hooks/useColor';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/src/context/auth/useAuth';
import ReportViewModel from '../viewModel/ReportViewModel';
import { defaultPostRepo } from '@/src/api/features/post/PostRepo';
import { Button } from '@ant-design/react-native';

const ReportScreen = ({ postId, userId, commentId }: { postId?: string; userId?: string; commentId?: string }) => {
  const { brandPrimary, backgroundColor } = useColor();
  const [reportReason, setReportReason] = useState('');
  const { localStrings } = useAuth();
  const { reportPost, loading, reportUser, reportComment } = ReportViewModel(defaultPostRepo);

    const handleReport = () => {
        if (postId) {
            reportPost({ report_post_id: postId, reason: reportReason });
        } else if (userId) {
            reportUser({ reported_user_id: userId, reason: reportReason });
        }
        else if (commentId) {
            reportComment({ report_comment_id: commentId, reason: reportReason });
        }
    };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1 }}>
			{/* Header */}
			<View style={{ backgroundColor: backgroundColor, paddingTop: Platform.OS === 'ios' ? 20 : 0 }}>
				<StatusBar barStyle="dark-content" />
				<View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
					<View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
						<TouchableOpacity onPress={() => { router.back(); }}>
							<Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
						</TouchableOpacity>
						<Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
              {localStrings.Public.ReportFriend}
						</Text>
					</View>
				</View>
			</View>

			{/* Content */}
			<ScrollView style={{ flex: 1 }}>
				 {/* Nội dung báo cáo */}
         <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBlockStart: 10, textAlign: 'center'
           }}>
            {postId && localStrings.Report.ReportPost}
            {userId && localStrings.Report.ReportUser}
            {commentId && localStrings.Report.ReportComment}
          </Text>
          <Text style={{ marginVertical: 10, color: '#666', textAlign:'center' }}>
           {localStrings.Report.Note}
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
          }}
          loading={loading}
          >
					<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{localStrings.Public.ReportFriend}</Text>
				</Button>
			</View>
		</ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default ReportScreen;

