import ENV from "@/env-config"

export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),
  // Post
  CREATE_POST: getApiPath('posts'),
}

function getApiPath(path: string) {
  return `${ENV.SERVER_ENDPOINT!}/v1/2024/${path}`
}
