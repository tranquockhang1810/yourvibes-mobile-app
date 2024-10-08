import dayjs from "dayjs";
import { AuthenRepo } from "@/src/api/features/authenticate/AuthenRepo";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { RegisterRequestModel } from "@/src/api/features/authenticate/model/RegisterModel";
import { VerifyOTPRequestModel } from "@/src/api/features/authenticate/model/VerifyOTPModel";
 
// Handle sign up
const SignUpViewModel = (repo: AuthenRepo) => {
  const [loading, setLoading] = useState(false);
const handleSignUp = async (data: RegisterRequestModel) => {
    try {
      setLoading(true);
      const response = await repo.register(data);
      if (response?.code === 200) {
        Toast.show({
          type: "success",
          text1: "Đăng ký thành công!",
        });
      } else {
      console.log('Response code này:', response.code);
      console.log("Đang gửi đi còn tới hong thì ở đây là hong roài:", {
      birthday: data.birthday,
      email: data.email,
      family_name: data.family_name,
      name: data.name,
      otp: data.otp,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phone_number: data.phone_number,
    });

        Toast.show({
          type: "error",
          text1: "Đăng ký thất bại!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Đăng ký thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };


// Kiểm tra gửi OTP 
const verifyOTP = async (data: VerifyOTPRequestModel) => {
    try {
      setLoading(true);
      console.log("data", data);
      
      const response = await repo.verifyOTP(data);
      console.log("response", response);
      
      if (response?.code === 20001) {
        Toast.show({
          type: "success",
          text1: "OTP đã được gửi thành công!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gửi OTP thất bại!",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Đăng ký thất bại!",
      });
    } finally {
      setLoading(false);
    }
};

  return {
    handleSignUp,
    verifyOTP,
  };
};

export default SignUpViewModel;