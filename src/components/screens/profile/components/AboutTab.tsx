import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import useColor from "@/src/hooks/useColor";
import { useAuth } from "@/src/context/auth/useAuth";
import { DateTransfer } from "../../../../utils/helper/DateTransfer";
import { UserModel } from "@/src/api/features/authenticate/model/LoginModel";
import { router } from "expo-router";
import { Image } from "react-native";
import { FriendResponseModel } from "@/src/api/features/profile/model/FriendReponseModel";

const AboutTab = ({
  user,
  loading,
  friendCount,
  friends,
}: {
  user: UserModel;
  loading: boolean;
  friendCount: number;
  friends: FriendResponseModel[];
}) => {
  const { lightGray, brandPrimaryTap } = useColor();
  const { localStrings } = useAuth();
  
  return (
    <>
      {loading ? (
        <ActivityIndicator animating size="large" color={brandPrimaryTap} />
      ) : (
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              {localStrings.Public.Detail}
            </Text>

            {/* Email */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <MaterialIcons name="email" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>
                {localStrings.Public.Mail}:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {user?.email || "N/A"}
                </Text>
              </Text>
            </View>

            {/* Số điện thoại */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Feather name="phone" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>
                {localStrings.Public.Phone}:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {user?.phone_number || "N/A"}
                </Text>
              </Text>
            </View>

            {/* Ngày sinh */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Feather name="calendar" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>
                {localStrings.Public.Birthday}:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {DateTransfer(user?.birthday) || "N/A"}
                </Text>
              </Text>
            </View>

            {/* Ngày tham gia */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <MaterialIcons name="date-range" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>
                {localStrings.Public.Active}:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {DateTransfer(user?.created_at) || "N/A"}
                </Text>
              </Text>
            </View>

            {/* Danh sách bạn bè */}
            <View style={{ paddingVertical: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {localStrings.Public.Friend}
                  </Text>
                  <Text>
                    {friendCount} {localStrings.Public.Friend}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/(tabs)/search")}>
                  <Text
                    style={{ alignSelf: "flex-end", color: brandPrimaryTap }}
                  >
                    {localStrings.Public.FriendFind}
                  </Text>
                </TouchableOpacity>
              </View>
          
              <View
                style={{
                  flexDirection: "row",
                  // flexWrap: "wrap",
                  // justifyContent: "space-between",
                }}
              >
                {friends?.map((friend, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={{
                      width: "23%",
                      alignItems: "center",
                      marginBottom: 10,
                      marginRight: 4,
                      marginLeft: 4,
                    }}
                    onPress={() => {
                      router.push(`/(tabs)/user/${friend.id}`);
                    }}
                  >
                    
                    <Image
                      source={{
                        uri: friend.avatar_url,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#e0e0e0",
                        marginRight: 10,
                      }}
                    />
                    <Text style={{ marginTop: 5 }}>
                      {friend.family_name} {friend.name}
                    </Text>
                  </TouchableOpacity>))}
              </View>
           

              <TouchableOpacity
              onPress={() => {
                router.push(`/listFriends?userId=${user.id}`);
              }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    color: brandPrimaryTap,
                  }}
                >
                  {localStrings.Public.FriendView}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AboutTab;