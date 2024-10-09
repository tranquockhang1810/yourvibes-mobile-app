import { AuthenRepo } from "@/src/api/features/authenticate/AuthenRepo";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { RegisterRequestModel } from "@/src/api/features/authenticate/model/RegisterModel";
import { VerifyOTPRequestModel } from "@/src/api/features/authenticate/model/VerifyOTPModel";
import dayjs from 'dayjs';
import { router } from "expo-router";
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat)

// Handle sign up
const SignUpViewModel = (repo: AuthenRepo) => {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSignUp = async (data: RegisterRequestModel) => {
    try {
      setLoading(true);
      const params: RegisterRequestModel = {
        family_name: data?.family_name,
        name: data?.name,
        email: data?.email,
        password: data?.password,
        phone_number: data?.phone_number,
        birthday: (dayjs(data?.birthday, "DD/MM/YYYY").format('YYYY-MM-DDT00:00:00') + "Z").toString(),
        otp: data?.otp,
      }
      const response = await repo.register(params);
      console.log("response", response);
      if (!response?.error) {
        Toast.show({
          type: "success",
          text1: "Đăng ký thành công! Vui lòng đăng nhập lại",
        });
        router.push("/login");
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng ký thất bại!",
          text2: response?.error?.message,
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
      setOtpLoading(true);
      const response = await repo.verifyOTP(data);
      console.log(response);

      if (!response?.error) {
        Toast.show({
          type: "success",
          text1: "OTP đã được gửi thành công!",
        });
      } else {
        if (response?.error?.code === 60009) {
          Toast.show({
            type: "error",
            text1: "Mã OTP đã được gửi và tồn tại trong 10 phút!",
            text2: response?.error?.message,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Gửi OTP thất bại!",
            text2: response?.error?.message,
          });
        }
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Gửi OTP thất bại!",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  return {
    loading,
    otpLoading,
    handleSignUp,
    verifyOTP,
  };
};

export default SignUpViewModel;
