export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),
}

function getApiPath(path: string) {
  return `http://192.168.79.1:8080/v1/2024/${path}`
}
