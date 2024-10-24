import ENV from "@/env-config"

export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),
  PROFILE: getApiPath('users/'),
  // Post
  CREATE_POST: getApiPath('posts/'),
  UPDATE_POST: getApiPath('posts/'),
  GET_POSTS: getApiPath('posts/'),
  DELETE_POST: getApiPath('posts/'),

  // Comment
  CREATE_COMMENT: getApiPath('comments/'),
  GET_COMMENTS: getApiPath('comments/'),
  DELETE_COMMENT: getApiPath('comments/'),
  UPDATE_COMMENT: getApiPath('comments/'),
}

function getApiPath(path: string) {
  return `${ENV.SERVER_ENDPOINT!}/v1/2024/${path}`
}
