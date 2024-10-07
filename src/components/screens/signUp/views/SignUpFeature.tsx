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
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Button, WingBlank, WhiteSpace, Form, Checkbox } from '@ant-design/react-native';
import MyInput from '@/src/components/foundation/MyInput';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useColor from '@/src/hooks/useColor';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';

const SignUpFeature = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const { backgroundColor, brandPrimaryTap } = useColor();
  const [signUpForm] = Form.useForm();
  const [showPicker, setShowPicker] = useState(false);
  const { brandPrimary } = useColor();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{
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
              marginVertical: 30
            }}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              color: brandPrimaryTap
            }}>
              ĐĂNG KÝ
            </Text>
            <WhiteSpace size="xl" />
            <Form
              layout='vertical'
              style={{
                width: '100%',
                backgroundColor: "none",
              }}
              form={signUpForm}
            >
              {/* Name */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap'
                }}
              >
                {/* familyName */}
                <View style={{ width: '50%' }}>
                  <Form.Item
                    name="familyName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                  >
                    <MyInput
                      placeholder="Họ"
                      variant="outlined"
                      type='text'
                      moreStyle={{ width: '100%' }}
                    />
                  </Form.Item>
                </View>
                {/* firstName */}
                <View style={{ width: '50%' }}>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                  >
                    <MyInput
                      placeholder="Tên"
                      variant="outlined"
                      type='text'
                      moreStyle={{ width: '100%' }}
                    />
                  </Form.Item>
                </View>
              </View>
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
              {/* birthdate */}
              <Form.Item
                name="birthdate"
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
              >
                <MyInput
                  placeholder="Ngày sinh"
                  variant="outlined"
                  moreStyle={{
                    width: '100%',
                    height: 54,
                  }}
                  value={signUpForm.getFieldValue('birthdate')}
                  onPress={(e) => {
                    setShowPicker(true)
                  }}
                  readOnly
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
                      onPress={() => {
                        Toast.show({
                          type: "info",
                          text1: "OTP: 123456",
                        })
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 'semibold',
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
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <MyInput
                  placeholder="Mật khẩu"
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
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
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
              {/* Text */}
              <WingBlank>
                <Text
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  Điều khoản dịch vụ và chính sách bảo mật
                </Text>
              </WingBlank>
              {/* Checkbox */}
              <Form.Item
                name="checkbox"
                rules={[
                  { required: true, message: 'Vui lòng đồng ý các điều khoản!' },
                ]}
                valuePropName="checked"
              >
                <Checkbox>
                  <Text style={{ fontSize: 12 }}>Tôi đồng ý với các điều khoản và chính sách bảo mật</Text>
                </Checkbox>
              </Form.Item>
              {/* Sign Up  */}
              <Form.Item>
                <Button
                  type="primary"
                  onPress={() => {
                    signUpForm.validateFields()
                      .then(() => {
                        console.log("Form Values:", signUpForm.getFieldsValue());
                        Toast.show({
                          type: "success",
                          text1: "Đăng ký thành công! Vui lòng đăng nhập lại!",
                        })
                        router.push('/login')
                      })
                      .catch(err => {
                        console.log(err)
                      });
                  }}
                >
                  Đăng ký ngay
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
            <Modal
              visible={showPicker}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowPicker(false)}
            >
              <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
                <View style={{
                  backgroundColor: 'white',
                  margin: 20,
                  padding: 20,
                  borderRadius: 10,
                }}>
                  <DateTimePicker
                    mode="single"
                    onChange={(date: any) => {
                      signUpForm.setFieldValue('birthdate', dayjs(date?.date).format('DD/MM/YYYY'))
                      signUpForm.validateFields(['birthdate'])
                      setShowPicker(false);
                    }}
                    selectedItemColor={brandPrimary}
                  />
                  <Button
                    type="primary"
                    onPress={() => {
                      setShowPicker(false)
                    }}
                  >
                    <Text style={{ color: 'white' }}>Close</Text>
                  </Button>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpFeature;
