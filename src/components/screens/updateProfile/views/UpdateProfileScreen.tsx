import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button, Checkbox, Form, WhiteSpace, WingBlank } from '@ant-design/react-native';
import Toast from 'react-native-toast-message';
import MyInput from '@/src/components/foundation/MyInput';
import MyDateTimePicker from '@/src/components/foundation/MyDateTimePicker';
import dayjs from 'dayjs';

const UpdateProfileScreen = () => {
  const { backgroundColor, lightGray, brandPrimary } = useColor();
  const { user, localStrings } = useAuth();
  const [updatedForm] = Form.useForm();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ flex: 1 }} >
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View
              style={{
                marginTop: 30,
                height: 50,
                paddingHorizontal: 16,
                paddingTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                zIndex: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Feather name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', flex: 1 }}>
                {localStrings.UpdateProfile.UpdateProfile}
              </Text>
            </View>

            {/* Cover Image */}
            <View style={{ width: '100%', height: 200, backgroundColor: lightGray }}>
              <Image
                source={{ uri: user?.capwall_url }}
                style={{ width: '100%', height: '100%', backgroundColor: lightGray }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: backgroundColor,
                  borderRadius: 20,
                  padding: 5,
                }}
              >
                <MaterialIcons name="camera-alt" size={20} color={brandPrimary} />
              </TouchableOpacity>
            </View>

            {/* Profile Image */}
            <View style={{ alignItems: 'center', marginTop: -60 }}>
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: user?.avatar_url }}
                  style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: lightGray }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 10,
                    backgroundColor: backgroundColor,
                    borderRadius: 20,
                    padding: 5,
                  }}
                >
                  <MaterialIcons name="camera-alt" size={20} color={brandPrimary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* User Information */}
            <WhiteSpace size="lg" />
            <Form
              layout="vertical"
              style={{ width: "100%", backgroundColor: "none" }}
              form={updatedForm}
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
                    rules={[{ required: true, message: localStrings.Form.RequiredMessages.FamilyNameRequiredMessage }]}
                    style={{ height: 65 }}
                  >
                    <MyInput
                      placeholder={localStrings.Form.Label.FamilyName}
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
                    rules={[{ required: true, message: localStrings.Form.RequiredMessages.NameRequiredMessage }]}
                    style={{ height: 65 }}
                  >
                    <MyInput
                      placeholder={localStrings.Form.Label.Name}
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
                  { required: true, message: localStrings.Form.RequiredMessages.PhoneRequiredMessage },
                  { pattern: /^[0-9]{10}$/, message: localStrings.Form.TypeMessage.PhoneTypeMessage },
                ]}
                style={{ height: 65 }}
              >
                <MyInput
                  placeholder={localStrings.Form.Label.Phone}
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
                    { required: true, message: localStrings.Form.RequiredMessages.BirthDayRequiredMessage },
                  ]}
                  style={{ height: 65 }}
                >
                  <MyInput
                    placeholder={localStrings.Form.Label.BirthDay}
                    variant="outlined"
                    moreStyle={{
                      width: '100%'
                    }}
                    value={updatedForm.getFieldValue('birthday')}
                    onPress={() => {
                      Platform.OS === 'ios' && setShowPicker(true)
                    }}
                    readOnly
                  />
                </Form.Item>
              </TouchableOpacity>

              {/* Email */}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: localStrings.Form.RequiredMessages.EmailRequiredMessage },
                  { type: "email", message: localStrings.Form.TypeMessage.EmailTypeMessage },
                ]}
                style={{ height: 65 }}
              >
                <MyInput
                  placeholder={localStrings.Form.Label.Email}
                  variant="outlined"
                  type="email-address"
                />
              </Form.Item>

              {/* Biography */}
              <Form.Item
                name="biography"
                style={{ height: 65 }}
              >
                <MyInput
                  placeholder={localStrings.Form.Label.Biography}
                  variant="outlined"
                  type="text"
                  textArea={{
                    autoSize: { minRows: 1, maxRows: 3 },
                  }}
                  moreStyle={{ width: "100%" }}
                />
              </Form.Item>

              <WhiteSpace size="lg" />
              {/* Register button */}
              <WingBlank size="lg">
                <Button
                  type="primary"
                  //loading={loading} 
                  onPress={() => {
                    updatedForm.validateFields()
                      .then(() => {
                        //handleSignUp(updatedForm.getFieldsValue());
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
                    {localStrings.Public.Save}
                  </Text>
                </Button>
              </WingBlank>
              <WhiteSpace size="lg" />
            </Form>

            {/* Date Picker Modal */}
            <MyDateTimePicker
              value={dayjs(updatedForm.getFieldValue("birthday")).toDate()}
              onSubmit={(date) => {
                updatedForm.setFieldValue(
                  "birthday",
                  dayjs(date).format("DD/MM/YYYY")
                );
                updatedForm.validateFields(["birthday"]);
              }}
              show={showPicker}
              onCancel={() => setShowPicker(false)}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default UpdateProfileScreen