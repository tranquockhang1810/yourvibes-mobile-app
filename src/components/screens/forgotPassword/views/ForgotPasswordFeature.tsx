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

const ForgotPasswordFeature = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const { backgroundColor, brandPrimaryTap } = useColor();
  const [forgotForm] = Form.useForm();
  const { brandPrimary } = useColor();

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
              ĐẶT LẠI MẬT KHẨU
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
                  { required: true, message: 'Vui lòng nhập số điện thoại!' }
                ]}
              >
                <MyInput
                  placeholder="Số điện thoại"
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
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
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
                        Nhận OTP
                      </Text>
                    </Button>
                  </Form.Item>
                </View>
              </View>
              {/* password */}
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
              >
                <MyInput
                  placeholder="Mật khẩu mới"
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
                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
              >
                <MyInput
                  placeholder="Xác nhận mật khẩu"
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
                  { required: true, message: 'Vui lòng nhập mã xác nhận!' }
                ]}
              >
                <MyInput
                  placeholder="Mã xác nhận OTP"
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
                  Xác nhận
                </Button>
              </Form.Item>
              <WhiteSpace size="lg" />
              {/* Sign in */}
              <TouchableOpacity
                onPress={() => router.push('/')}
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Text>
                  Bạn đã có tài khoản?
                  <Text style={{ fontWeight: 'bold' }}> Đăng nhập ngay!</Text>
                </Text>
              </TouchableOpacity>
            </Form>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordFeature