import ENV from "@/env-config"

export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),

  // User
  PROFILE: getApiPath('users/'),
  SEARCH: getApiPath('users/'),
  
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
    // Reply Comment -  TESTT TESTT - test và nó chạy đúng
    GET_COMMENT_REPLIES: (postId: string, parentId: string) => getApiPath(`comments/?post_id=${postId}&parent_id=${parentId}`) 
}

function getApiPath(path: string) {
  return `${ENV.SERVER_ENDPOINT!}/v1/2024/${path}`
}
