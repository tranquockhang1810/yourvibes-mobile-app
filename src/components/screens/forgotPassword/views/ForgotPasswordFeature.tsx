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

const ForgotPasswordFeature = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const { backgroundColor, brandPrimaryTap } = useColor();
  const [forgotForm] = Form.useForm();
  const { brandPrimary } = useColor();
  const { localStrings } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20
            }}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              color: brandPrimaryTap
            }}>
              {localStrings.Login.ForgotPasswordText}
            </Text>
            <WhiteSpace size="xl" />
            <Form
              layout='vertical'
              style={{
                width: '100%',
                backgroundColor: "none",
              }}
              form={forgotForm}
            >
              {/* Phone */}
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: `${localStrings.Form.RequiredMessages.PhoneRequiredMessage}` }
                ]}
              >
                <MyInput
                  placeholder={localStrings.Form.Label.Phone}
                  variant="outlined"
                  type='number'
                  maxLength={10}
                />
              </Form.Item>
              {/* Email and OTP */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                {/* email */}
                <View style={{ width: '70%' }}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: `${localStrings.Form.RequiredMessages.EmailRequiredMessage}` },
                      { type: 'email', message: `${localStrings.Form.TypeMessage.EmailTypeMessage}` }
                    ]}
                  >
                    <MyInput
                      placeholder="Email"
                      variant="outlined"
                      type='email-address'
                    />
                  </Form.Item>
                </View>
                {/* OTP button */}
                <View style={{ width: '30%' }}>
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{ width: '100%' }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 'semibold',
                        }}
                        onPress={() => {
                          Toast.show({
                            type: "info",
                            text1: "OTP: 123456",
                          })
                        }}
                      >
                        {localStrings.Form.Label.GetOTP}
                      </Text>
                    </Button>
                  </Form.Item>
                </View>
              </View>
              {/* password */}
              <Form.Item
                name="password"
                rules={[{ required: true, message: `${localStrings.Form.RequiredMessages.PasswordRequiredMessage}` }]}
              >
                <MyInput
                  placeholder= {localStrings.Form.Label.Password}
                  type={seePassword ? "text" : "password"}
                  variant="outlined"
                  suffix={
                    <TouchableOpacity onPress={() => { setSeePassword(!seePassword) }}>
                      <Feather name={seePassword ? "eye" : "eye-off"} size={20} color={seePassword ? brandPrimary : "gray"} />
                    </TouchableOpacity>
                  }
                />
              </Form.Item>
              {/* confirmPassword */}
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: `${localStrings.Form.RequiredMessages.ConfirmPasswordRequiredMessage}` }]}
              >
                <MyInput
                  placeholder= {localStrings.Form.Label.ConfirmPassword}
                  type={seeConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  suffix={
                    <TouchableOpacity onPress={() => { setSeeConfirmPassword(!seeConfirmPassword) }}>
                      <Feather name={seeConfirmPassword ? "eye" : "eye-off"} size={20} color={seeConfirmPassword ? brandPrimary : "gray"} />
                    </TouchableOpacity>
                  }
                />
              </Form.Item>
              {/* OTP */}
              <Form.Item

                name="otp"
                rules={[
                  { required: true, message: `${localStrings.Form.RequiredMessages.OTPRequiredMessage}` }
                ]}
              >
                <MyInput
                  placeholder= {localStrings.Form.Label.OTP}
                  variant="outlined"
                  type='number'
                  maxLength={6}
                />
              </Form.Item>
              <WhiteSpace size="lg" />
              {/* Sign Up  */}
              <Form.Item>
                <Button
                  type="primary"
                  onPress={() => {
                    forgotForm.validateFields()
                      .then(() => {
                        console.log("Form Values:", forgotForm.getFieldsValue());
                      })
                      .catch(err => {
                        console.log(err)
                      });
                  }}
                >
                  {localStrings.Public.Confirm}
                </Button>
              </Form.Item>
              <WhiteSpace size="lg" />
              {/* Sign in */}
              <TouchableOpacity
                onPress={() => router.push('/login')}
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Text>
                  {localStrings.Login.DontHaveAccout}
                  <Text style={{ fontWeight: 'bold' }}> {localStrings.SignUp.LoginNow}</Text>
                </Text>
              </TouchableOpacity>
            </Form>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <Toast />
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordFeature