import { UserModel } from "@/src/api/features/authenticate/model/LoginModel";
import { defaultCommentRepo } from "@/src/api/features/comment/CommentRepo";
import { ReportCommentRequestModel } from "@/src/api/features/comment/models/ReportComment";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { ReportPostRequestModel } from "@/src/api/features/post/models/ReportPost";
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { ReportUserRequestModel } from "@/src/api/features/profile/model/ReportUser";
import { defaultProfileRepo } from "@/src/api/features/profile/ProfileRepository";
import { useAuth } from "@/src/context/auth/useAuth";
import { useState } from "react";
import Toast from "react-native-toast-message";

const ReportViewModel = (repo: PostRepo) => {
    const { localStrings } = useAuth();
    const [loading, setLoading] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserModel | null>(null);
    const [post, setPost] = useState<PostResponseModel | undefined>(undefined);

    const reportPost = async (params: ReportPostRequestModel) => {
        try {
            setReportLoading(true);
            const res = await repo.reportPost(params);
            if (!res?.error) {
                Toast.show({
                    type: 'success',
                    text1: localStrings.Report.ReportSuccess,
                });
            } else {
               Toast.show({
                     type: 'error',
                     text1: localStrings.Report.ReportFailed,
                     text2: res?.error?.message,
                });
            }
        } catch (error: any) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: localStrings.Report.ReportFailed,
                text2: error?.error?.message,
            });
        } finally {
            setReportLoading(false);
        }
        
    }
      const reportUser = async (params: ReportUserRequestModel) => {
        try {
          setReportLoading(true);
          const res = await defaultProfileRepo.reportUser(params);
          if (!res?.error) {
            Toast.show({
              type: 'success',
              text1: localStrings.Report.ReportSuccess,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: localStrings.Report.ReportFailed,
              text2: res?.error?.message,
            });
          }
        } catch (error: any) {
          console.error(error);
          Toast.show({
            type: 'error',
            text1: localStrings.Report.ReportFailed,
            text2: error?.message,
          });
        } finally {
          setReportLoading(false);
        }
        }

        const reportComment = async (params: ReportCommentRequestModel) => {
          try{
            setReportLoading(true);
            const res = await defaultCommentRepo.reportComment(params);
            console.log(res);
            
            if (!res?.error) {
              Toast.show({
                type: 'success',
                text1: localStrings.Report.ReportSuccess,
              });
            } else {
              Toast.show({
                type: 'error',
                text1: localStrings.Report.ReportFailed,
                text2: res?.error?.message,
              });
            }
          } catch (error: any) {
            console.error(error);
            Toast.show({
              type: 'error',
              text1: localStrings.Report.ReportFailed,
              text2: error?.message,
            });
          } finally {
            setReportLoading(false);
          }
        }
    return {
        loading,
        reportLoading,
        post,
        reportPost,
        userInfo,
        reportUser,
        reportComment
    }
}
export default ReportViewModel;