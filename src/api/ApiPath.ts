export const ApiPath = {

  // Auth
  LOGIN: getApiPath('users/login'),

  //Profile
  

}

function getApiPath(path: string) {
  return `localhost:8080/api/v1/${path}`
}