import ENV from "@/env-config"

export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),

  // User
  PROFILE: getApiPath('users/'),
  
  // Post
  CREATE_POST: getApiPath('posts/'),
  UPDATE_POST: getApiPath('posts/'),
  GET_POSTS: getApiPath('posts/'),
  DELETE_POST: getApiPath('posts/'),
  GET_USER_LIKES: getApiPath('posts/get_like_user/'),
  LIKE_POST: getApiPath('posts/like_post/'),
  SHARE_POST: getApiPath('posts/share_post/'),

   //Comment
   CREATE_COMMENT: getApiPath('comments/'),
   UPDATE_COMMENT: getApiPath('comments/'),
   GET_COMMENTS: getApiPath('comments/'),
   DELETE_COMMENT: getApiPath('comments/'),

   // Notification
   GETWS_APIPATH : getWS_ApiPath('users/notifications/ws/'),
   GET_NOTIFICATIONS: getApiPath('users/notifications/'),
   READ_NOTIFICATION: getApiPath('users/notifications/'),
   READ_ALL_NOTIFICATION: getApiPath('users/notifications/'),
}

function getApiPath(path: string) {
  return `${ENV.SERVER_ENDPOINT!}/v1/2024/${path}`
}
function getWS_ApiPath(path: string) {
  return `${ENV.SERVER_ENDPOINT!.replace('http','ws')}/v1/2024/${path}`
}