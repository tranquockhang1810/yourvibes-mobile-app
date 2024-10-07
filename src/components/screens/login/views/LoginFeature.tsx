import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { Button, WingBlank, WhiteSpace, Form } from '@ant-design/react-native';
import MyInput from '@/src/components/foundation/MyInput';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useColor from '@/src/hooks/useColor';
import { useAuth } from '@/src/context/useAuth';
import Toast from 'react-native-toast-message';

const LoginFeature = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const { backgroundColor } = useColor();
  const [signInForm] = Form.useForm();
  const { brandPrimary } = useColor();
  const { login, localStrings, changeLanguage, language } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ width: '100%' }}>
              <Image
                source={require('@/assets/images/yourvibes_black.png')}
                style={{
                  width: '100%',
                  height: 80,
                  objectFit: 'contain'
                }}
              />
            </View>
            <WhiteSpace size="xl" />
            <WhiteSpace size="md" />
            <Form
              layout='vertical'
              style={{
                width: '100%',
                backgroundColor: "none",
              }}
              form={signInForm}
            >
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
              <WhiteSpace size="md" />
              <WingBlank>
                <TouchableOpacity onPress={() => router.push('/forgotPassword')}>
                  <Text
                    style={{
                      color: 'gray',
                    }}
                  >
                    Tôi không còn nhớ mật khẩu
                  </Text>
                </TouchableOpacity>
              </WingBlank>
              <WhiteSpace size="md" />
              <Form.Item>
                <Button type="primary" onPress={() => {
                  signInForm
                    .validateFields()
                    .then(() => {
                      console.log('values', signInForm.getFieldsValue());
                      login();
                      Toast.show({
                        type: 'success',
                        text1: 'Đăng nhập thành công!',
                      })
                      router.push('/(tabs)');
                    })
                    .catch(() => {
                      console.log('error');
                    });
                }}>
                  {localStrings?.Login}
                </Button>
              </Form.Item>
              <WhiteSpace size="xl" />
            </Form>
            <TouchableOpacity
              onPress={() => router.push('/signUp')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>
                Bạn chưa có tài khoản?
                <Text style={{ fontWeight: 'bold' }}> Đăng ký ngay!</Text>
              </Text>
            </TouchableOpacity>
            <WhiteSpace size="xl" />
            <Text style={{
              textAlign: 'center',
            }}>
              Hoặc
            </Text>
            <WhiteSpace size="lg" />
            <TouchableOpacity style={{ width: '100%' }}>
              <Image
                source={{ uri: "https://img.icons8.com/?size=100&id=17949&format=png" }}
                style={{
                  width: '100%',
                  height: 50,
                  objectFit: 'contain'
                }}
              />
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginFeature;
