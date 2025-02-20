import { AuthenRepo } from "@/src/api/features/authenticate/AuthenRepo"
import { LoginRequestModel } from "@/src/api/features/authenticate/model/LoginModel"
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "@/src/context/auth/useAuth";
import ENV from "@/env-config";
import * as Linking from 'expo-linking';
import * as Google from 'expo-auth-session/providers/google';
import { Platform } from "react-native";

const LoginViewModel = (repo: AuthenRepo, onLogin: (user: any) => void) => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { localStrings } = useAuth();
  const [request, response, promtAsync] = Google.useAuthRequest({
    webClientId: ENV.WEB_CLIENT_ID!,
    androidClientId: ENV.ANDROID_CLIENT_ID!,
    iosClientId: ENV.IOS_CLIENT_ID!,
    redirectUri: `${Linking.createURL("/login")}`,
  })

  const login = async (data: LoginRequestModel) => {
    try {
      setLoading(true);
      const res = await repo.login(data);
      if (res?.data) {
        onLogin(res?.data);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Login.LoginFailed,
          text2: res?.error?.message
        })
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: localStrings.Login.LoginFailed,
        text2: error?.message
      })
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (response?.type === "success") {
        setGoogleLoading(true);
        const res = await repo.googleLogin({
          authorization_code: response?.params?.code,
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
          redirect_url: `${Linking.createURL("/login")}`,
        });
        if (res?.data) {
          onLogin(res?.data);
        } else {
          Toast.show({
            type: 'error',
            text1: localStrings.Login.LoginFailed,
            text2: res?.error?.message
          })
        }
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Login.LoginFailed,
      })
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (response)
      handleGoogleLogin();
  }, [response]);

  return {
    login,
    googleLoading,
    setGoogleLoading,
    loading,
    promtAsync,
  }
}

export default LoginViewModel