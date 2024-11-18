import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen: React.FC = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 8,
          }}
        >
          Cài đặt trang cá nhân
        </Text>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        Đổi mật khẩu
      </Text>

      {/* Form */}
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 14,
          }}
          placeholder="Nhập mật khẩu cũ"
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
          placeholder="Nhập mật khẩu mới"
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
          placeholder="Xác nhận mật khẩu mới"
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
            placeholder="Nhập email"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#ccc",
              borderRadius: 8,
              paddingVertical: 12,
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
              Nhận OTP
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
          placeholder="Xác nhận OTP"
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
            Xác nhận thay đổi mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;
