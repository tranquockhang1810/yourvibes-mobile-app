import { AuthenRepo } from "@/src/api/features/authenticate/AuthenRepo"
import { LoginRequestModel } from "@/src/api/features/authenticate/model/LoginModel"
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as Google from 'expo-auth-session/providers/google';

const LoginViewModel = (repo: AuthenRepo, onLogin:(user: any)=>void ) => {
  const [loading, setLoading] = useState(false);
  const [request, response, promtAsync] = Google.useAuthRequest({
    webClientId: "1043707259288-skk9gvug9tlvahvfduf1km8p7dar0osf.apps.googleusercontent.com",
    androidClientId: "1043707259288-u2rc90r329lmsfrceogq8ti1ouvtm5e2.apps.googleusercontent.com",
    iosClientId: "1043707259288-8ae2okgbb1mlmg57br60hlh9g0hgmrfr.apps.googleusercontent.com"
  })

  const login = async (data: LoginRequestModel) => {
    try {
      setLoading(true);
      const res = await repo.login(data);
      if (res?.data) {
        onLogin(res.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đăng nhập thất bại!',
          text2: res?.error?.message
        })
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại!',
        text2: error?.message
      })
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   console.log("response", response);
  // }, [response]);  

  return {
    login,
    loading,
    promtAsync
  }
}

export default LoginViewModel