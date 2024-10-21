import ENV from "@/env-config"

export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),
  PROFILE: getApiPath('users/'),
  // Post
  CREATE_POST: getApiPath('posts/'),
  GET_POSTS: getApiPath('posts/'), 

}

function getApiPath(path: string) {
  console.log(ENV.SERVER_ENDPOINT!);
  
  return `${ENV.SERVER_ENDPOINT!}/v1/2024/${path}`
}
