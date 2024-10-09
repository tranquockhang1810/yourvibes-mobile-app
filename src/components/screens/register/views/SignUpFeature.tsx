import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  WingBlank,
  WhiteSpace,
  Form,
  Checkbox,
} from "@ant-design/react-native";
import MyInput from "@/src/components/foundation/MyInput";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useColor from "@/src/hooks/useColor";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";
import { defaultAuthenRepo } from "@/src/api/features/authenticate/AuthenRepo";
import SignUpViewModel from "../viewModel/signUpViewModel";
import MyDateTimePicker from "@/src/components/foundation/MyDateTimePicker";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat)

const SignUpFeature = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const { backgroundColor, brandPrimaryTap } = useColor();
  const [signUpForm] = Form.useForm();
  const [showPicker, setShowPicker] = useState(false);
  const { brandPrimary } = useColor();
  const { handleSignUp, verifyOTP, loading, otpLoading } = SignUpViewModel(defaultAuthenRepo);
  const [isOtpClicked, setIsOtpClicked] = useState(false);

  useEffect(() => {
    signUpForm.setFieldsValue({
      family_name: "Trần",
      name: "Quốc Khang",
      phone_number: "0829137177",
      email: "fantacymaster1@gmail.com",
      otp: "911916",
      password: "tranquockhang1",
      confirmPassword: "tranquockhang1",
      agree: true,
      birthday: "18/10/2004"
    })
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 24,
                color: brandPrimaryTap,
              }}
            >
              ĐĂNG KÝ
            </Text>
            <WhiteSpace size="xl" />
            <Form
              layout="vertical"
              style={{ width: "100%", backgroundColor: "none" }}
              form={signUpForm}
            >
              {/* Name */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {/* familyName */}
                <View style={{ width: "50%" }}>
                  <Form.Item
                    name="family_name"
                    rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                  >
                    <MyInput
                      placeholder="Họ"
                      variant="outlined"
                      type="text"
                      moreStyle={{ width: "100%" }}
                    />
                  </Form.Item>
                </View>
                {/* firstName */}
                <View style={{ width: "50%" }}>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                  >
                    <MyInput
                      placeholder="Tên"
                      variant="outlined"
                      type="text"
                      moreStyle={{ width: "100%" }}
                    />
                  </Form.Item>
                </View>
              </View>
              {/* Phone */}
              <Form.Item
                name="phone_number"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
                ]}
              >
                <MyInput
                  placeholder="Số điện thoại"
                  variant="outlined"
                  type="number"
                  maxLength={10}
                />
              </Form.Item>
              {/* birthdate */}
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={() => {
                  Platform.OS === 'android' && setShowPicker(true)
                }}
              >
                <Form.Item
                  name="birthday"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày sinh!" },
                  ]}
                >
                  <MyInput
                    placeholder="Ngày sinh"
                    variant="outlined"
                    moreStyle={{
                      width: '100%',
                      height: 54,
                    }}
                    value={signUpForm.getFieldValue('birthday')}
                    onPress={() => {
                      Platform.OS === 'ios' && setShowPicker(true)
                    }}
                    readOnly
                  />
                </Form.Item>
              </TouchableOpacity>
              {/* Email and OTP */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {/* Email input */}
                <View style={{ width: "70%" }}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                  >
                    <MyInput
                      placeholder="Email"
                      variant="outlined"
                      type="email-address"
                    />
                  </Form.Item>
                </View>

                {/* OTP button */}
                <View style={{ width: "30%" }}>
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onPress={() => {
                        setIsOtpClicked(true);
                        verifyOTP({ email: signUpForm.getFieldValue("email") });
                      }}
                      loading={otpLoading}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: "semibold",
                        }}
                      >
                        Nhận OTP
                      </Text>
                    </Button>
                  </Form.Item>
                </View>
              </View>
              {/* OTP */}
              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Vui lòng nhập mã OTP!" },
                  { pattern: /^[0-9]{6}$/, message: "Mã OTP phải là chuỗi 6 số!" },
                ]}
              >
                <MyInput
                  placeholder="Mã OTP"
                  variant="outlined"
                  type="number"
                  maxLength={6}
                />
              </Form.Item>
              {/* password */}
              <Form.Item
                name="password"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Vui lòng nhập mật khẩu!")
                      }
                      if (value.length < 8) {
                        return Promise.reject("Mật khẩu phải trên 8 kí tự!");
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <MyInput
                  placeholder="Mật khẩu"
                  type={seePassword ? "text" : "password"}
                  variant="outlined"
                  suffix={
                    <TouchableOpacity
                      onPress={() => setSeePassword(!seePassword)}
                    >
                      <Feather
                        name={seePassword ? "eye" : "eye-off"}
                        size={20}
                        color={seePassword ? brandPrimary : "gray"}
                      />
                    </TouchableOpacity>
                  }
                />
              </Form.Item>
              {/* confirmPassword */}
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Vui lòng nhập lại mật khẩu!")
                      }
                      if (value.length < 6) {
                        return Promise.reject("Mật không hợp lệ!");
                      }
                      if (value === signUpForm.getFieldValue("password")) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Xác nhận mật khẩu không hợp lệ!");
                    }
                  }
                ]}
              >
                <MyInput
                  placeholder="Xác nhận mật khẩu"
                  type={seeConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  suffix={
                    <TouchableOpacity
                      onPress={() => setSeeConfirmPassword(!seeConfirmPassword)}
                    >
                      <Feather
                        name={seeConfirmPassword ? "eye" : "eye-off"}
                        size={20}
                        color={seeConfirmPassword ? brandPrimary : "gray"}
                      />
                    </TouchableOpacity>
                  }
                />
              </Form.Item>
              {/* Checkbox */}
              <Form.Item
                name={"agree"}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Vui lòng đồng ý với các điều khoản!");
                    }
                  }
                ]}
                valuePropName="checked"
              >
                <Checkbox>
                  <Text>Tôi đồng ý các điều khoản của YourVibes</Text>
                </Checkbox>
              </Form.Item>
              <WhiteSpace size="lg" />
              {/* Register button */}
              <WingBlank size="lg">
                <Button type="primary" loading={loading} onPress={() => {
                  signUpForm.validateFields()
                    .then(() => {
                      if (!isOtpClicked) {
                        Toast.show({
                          type: "error",
                          text1: "Vui lý nhận mã OTP!",
                        })
                        return;
                      }
                      handleSignUp(signUpForm.getFieldsValue());
                    })
                    .catch((error) => {
                      Toast.show({
                        type: "error",
                        text1: error?.errorFields[0]?.errors[0],
                      })
                    })
                }}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    ĐĂNG KÝ
                  </Text>
                </Button>
              </WingBlank>
              <WhiteSpace size="lg" />
            </Form>
            {/* Sign in */}
            <TouchableOpacity
              onPress={() => router.push('/login')}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Text>
                Bạn đã có tài khoản?
                <Text style={{ fontWeight: 'bold' }}> Đăng nhập ngay!</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      {/* Date Picker Modal */}
      <MyDateTimePicker
        value={dayjs(signUpForm.getFieldValue("birthday")).toDate()}
        onSubmit={(date) => {
          signUpForm.setFieldValue(
            "birthday",
            dayjs(date).format("DD/MM/YYYY")
          );
          signUpForm.validateFields(["birthday"]);
        }}
        show={showPicker}
        onCancel={() => setShowPicker(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpFeature;
