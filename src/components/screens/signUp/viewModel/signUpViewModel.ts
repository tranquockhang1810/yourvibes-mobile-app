import dayjs from "dayjs";
import { AuthenRepo } from "@/src/api/features/authenticate/AuthenRepo";
import { useState } from "react";
import Toast from "react-native-toast-message";

const SignUpViewModel = (repo: AuthenRepo) => {
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (data: any) => {
    try {
      setLoading(true);
      console.log(data);
      
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Đăng ký thất bại!",
      })
    } finally {
      setLoading(false);
    }
  };
  return {
    handleSignUp,
  };
};

export default SignUpViewModel;