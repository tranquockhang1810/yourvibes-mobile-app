import Constants from 'expo-constants';

const { expoConfig } = Constants;
const { SERVER_ENDPOINT } = expoConfig?.extra || {};

export const ApiPath = {
  // Auth
  LOGIN: getApiPath('users/login'),
  REGISTER: getApiPath('users/register'),
  VERIFIED_EMAIL: getApiPath('users/verifyemail'),
}

function getApiPath(path: string) {
  return `${SERVER_ENDPOINT!}/v1/2024/${path}`
}
