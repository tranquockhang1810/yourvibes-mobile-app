import { AuthenRepo } from "@/src/api/features/authenticate/AuthenRepo"
import { LoginRequestModel } from "@/src/api/features/authenticate/model/LoginModel"
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

const LoginViewModel = (repo: AuthenRepo, onLogin:(user: any)=>void ) => {
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginRequestModel) => {
    try {
      setLoading(true);
      console.log('data', data);
      const res = await repo.login(data);
      
      if (res?.data) {
        onLogin(res.data);
        router.push('/(tabs)/');
        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại!',
      })
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading
  }
}

export default LoginViewModel