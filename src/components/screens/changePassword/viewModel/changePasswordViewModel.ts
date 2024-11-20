import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/auth/useAuth';
import { defaultProfileRepo } from '@/src/api/features/profile/ProfileRepository';
import  Toast  from 'react-native-toast-message';

interface ChangePasswordViewModelProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
  otp: string;
}

const useChangePasswordViewModel = () => {
  const { language, localStrings } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchChangePassword = async () => {
    // setIsLoading(true);
    // try {
    //   const response = await defaultProfileRepo.changePassword({
    //     oldPassword,
    //     newPassword,
    //     confirmPassword,
    //     email,
    //     otp,
    //   });
    //   if (response.data) {
    //     Toast.show({
    //       type: 'success',
    //       text1: localStrings.ChangePassword.ChangePasswordSuccess,
    //     });
    //   } else {
    //     Toast.show({
    //       type: 'error',
    //       text1: localStrings.ChangePassword.ChangePasswordFailed,
    //     });
    //   }
    // } catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     text1: localStrings.ChangePassword.ChangePasswordFailed,
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const validateForm = () => {
    if (!oldPassword || !newPassword || !confirmPassword || !email || !otp) {
      Toast.show({
        type: 'error',
        text1: localStrings.ChangePassword.ChangePasswordFailed,
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: localStrings.ChangePassword.ChangePasswordFailed,
      });
      return false;
    }
    return true;
  };

  const handlePressSubmit = () => {
    if (validateForm()) {
      fetchChangePassword();
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    email,
    setEmail,
    otp,
    setOtp,
    isLoading,
    isError,
    handlePressSubmit,
  };
};

export default useChangePasswordViewModel;