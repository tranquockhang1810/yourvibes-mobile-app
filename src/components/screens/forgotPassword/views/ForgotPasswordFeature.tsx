import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, WingBlank, WhiteSpace, Form } from '@ant-design/react-native';
import MyInput from '@/src/components/foundation/MyInput';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useColor from '@/src/hooks/useColor';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/src/context/auth/useAuth';
import { ForgotPasswordViewModel } from '@/src/components/screens/forgotPassword/viewModel/ForgotPasswordViewModel';

const ForgotPasswordFeature = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const { backgroundColor, brandPrimaryTap, brandPrimary } = useColor();
  const [forgotForm] = Form.useForm();
  const { localStrings } = useAuth();
  const forgotPasswordViewModel = new ForgotPasswordViewModel();

  const onRequestOTP = async () => {
    try {
      const email = forgotForm.getFieldValue('email');
      if (!email) {
        Toast.show({ type: 'error', text1: localStrings.Form.RequiredMessages.EmailRequiredMessage });
        return;
      }
      await forgotPasswordViewModel.requestOTP(email, '');
      Toast.show({ type: 'success', text1: localStrings.SignUp.OTPSuccess });
    } catch (error) {
      Toast.show({ type: 'error', text1: localStrings.SignUp.OTPFailed });
    }
  };

  const onForgotPassword = async () => {
    try {
      const values = await forgotForm.validateFields();
      await forgotPasswordViewModel.resetPassword({
        email: values.email,
        new_password: values.new_password,
        otp: values.otp,
      });
      Toast.show({ type: 'success', text1: localStrings.ChangePassword.ChangePasswordSuccess });
      router.push('/login');
    } catch (error) {
      Toast.show({ type: 'error', text1: localStrings.ChangePassword.ChangePasswordFailed });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          >
            {/* Title */}
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24,
                color: brandPrimaryTap,
              }}
            >
              {localStrings.Login.ForgotPasswordText}
            </Text>
            <WhiteSpace size="xl" />

            {/* Form */}
            <Form
              layout="vertical"
              style={{ width: '100%', backgroundColor: 'none' }}
              form={forgotForm}
            >
              {/* Email and OTP */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <View style={{ width: '70%' }}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: localStrings.Form.RequiredMessages.EmailRequiredMessage },
                      { type: 'email', message: localStrings.Form.TypeMessage.EmailTypeMessage },
                    ]}
                  >
                    <MyInput placeholder="Email" variant="outlined" type="email-address" />
                  </Form.Item>
                </View>
                <View style={{ width: '30%' }}>
                  <Form.Item>
                    <Button type="primary" style={{ width: '100%' }} onPress={onRequestOTP}>
                      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'semibold' }}>
                        {localStrings.Form.Label.GetOTP}
                      </Text>
                    </Button>
                  </Form.Item>
                </View>
              </View>

              {/* Password */}
              <Form.Item
                name="new_password"
                rules={[{ required: true, message: localStrings.Form.RequiredMessages.PasswordRequiredMessage }]}
              >
                <MyInput
                  placeholder={localStrings.Form.Label.Password}
                  type={seePassword ? 'text' : 'password'}
                  variant="outlined"
                  suffix={
                    <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
                      <Feather name={seePassword ? 'eye' : 'eye-off'} size={20} color={seePassword ? brandPrimary : 'gray'} />
                    </TouchableOpacity>
                  }
                />
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                name="confirmPassword"
                dependencies={['new_password']}
                rules={[
                  { required: true, message: localStrings.Form.RequiredMessages.ConfirmPasswordRequiredMessage },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(localStrings.Form.TypeMessage.ConfirmPasswordTypeMessage);
                    },
                  }),
                ]}
              >
                <MyInput
                  placeholder={localStrings.Form.Label.ConfirmPassword}
                  type={seeConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  suffix={
                    <TouchableOpacity onPress={() => setSeeConfirmPassword(!seeConfirmPassword)}>
                      <Feather name={seeConfirmPassword ? 'eye' : 'eye-off'} size={20} color={seeConfirmPassword ? brandPrimary : 'gray'} />
                    </TouchableOpacity>
                  }
                />
              </Form.Item>

              {/* OTP */}
              <Form.Item
                name="otp"
                rules={[{ required: true, message: localStrings.Form.RequiredMessages.OTPRequiredMessage }]}
              >
                <MyInput placeholder={localStrings.Form.Label.OTP} variant="outlined" />
              </Form.Item>

              {/* Submit Button */}
              <Button
                type="primary"
                style={{ marginTop: 20 }}
                onPress={onForgotPassword}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                  {localStrings.Form.Label.ConfirmPassword}
                </Text>
              </Button>
            </Form>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordFeature;
