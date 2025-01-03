import { ChangePasswordRequestModel } from "@/src/api/features/profile/model/ChangPassword";
import { ProfileRepo } from "@/src/api/features/profile/ProfileRepository";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const ChangPassword = (repo : ProfileRepo) => {
        const [loading, setLoading] = useState(false);
        const [oldPassword, setOldPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [conformPassword, setConformPassword] = useState('');
        
        const changePassword = async (data: ChangePasswordRequestModel) => {
            try {
              setLoading(true);
              const res = await repo.changePassword(data);
              if (!res?.error) {
                Toast.show({
                  type: 'success',
                  text1: "Change Password Success",
                });
                router.back(); // Hoặc điều hướng đến một trang khác
              } else {
                Toast.show({
                  type: 'error',
                  text1: "Change Password Failed",
                  text2: res?.error?.message,
                });
              }
              
            }catch (error: any) {
              console.error(error);
              Toast.show({
                type: 'error',
                text1: "Change Password Failed",
                text2: error?.message,
              });
            }finally {
              setLoading(false);
            }
          };
  return {
    loading,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    conformPassword,
    setConformPassword,
    changePassword,
  };
};

export default ChangPassword;