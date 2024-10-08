export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),
}

function getApiPath(path: string) {
  
  // return `${process.env.SERVER_ENDPOINT}/v1/2024/${path}`
  return `http://192.168.43.180:8080/v1/2024/${path}`
}
