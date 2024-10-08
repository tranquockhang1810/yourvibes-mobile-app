export const ApiPath = {

  // Auth
  LOGIN: getApiPath('users/login'),
  SIGNUP: getApiPath('users/register'),
  //Profile
  

}

function getApiPath(path: string) {
  return `http://192.168.20.143:8080/v1/2024/${path}`
}