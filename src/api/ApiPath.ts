export const ApiPath = {

  // Auth
  LOGIN: getApiPath('users/login'),

  //Profile
  

}

function getApiPath(path: string) {
  return `${process.env.SERVER_ENDPOINT}/v1/2024/${path}`
}