
import ReportPostScreen from '@/src/components/screens/reportPost/views/ReportPostScreen'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

const reportPost = () => {
  const { postId, userId, commentId } = useLocalSearchParams();
  const getPostID = () => {
    if (Array.isArray(postId)) {
      return postId[0]
    } else {
      return postId
    }
  }
  const getUserID = () => {
    if (Array.isArray(userId)) {
      return userId[0]
    } else {
      return userId
    }
  }
  const getCommentID = () => {
    if (Array.isArray(commentId)) {
      return commentId[0]
    } else {
      return commentId
    }
  }
  return (
   <ReportPostScreen postId={getPostID()}  userId={getUserID()} commentId={getCommentID()}/>
  )
}

export default reportPost