import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router"; 
import { useAuth } from '@/src/context/auth/useAuth';
import Toast from "react-native-toast-message";


const ChangePasswordScreen = () => {

	const { language, localStrings } = useAuth();
  

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? 30 : 0 ,
          height: 50,
          paddingHorizontal: 16,
          paddingTop: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          zIndex: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {localStrings.ChangePassword.ChangePassword}
        </Text>
      </View>

      {/* Form */}
      <View style={{ padding: 16 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 14,
          }}
          placeholder={localStrings.ChangePassword.OldPassword}
          secureTextEntry
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 14,
          }}
          placeholder={localStrings.ChangePassword.NewPassword}
          secureTextEntry
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 14,
          }}
          placeholder={localStrings.ChangePassword.ConformPassword}
          secureTextEntry
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
              marginRight: 8,
            }}
            placeholder={localStrings.ChangePassword.Email}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#ccc",
              borderRadius: 8,
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {localStrings.ChangePassword.SendOTP}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 14,
          }}
          placeholder={localStrings.ChangePassword.OTP}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {localStrings.ChangePassword.ConformChangePassword}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default ChangePasswordScreen;