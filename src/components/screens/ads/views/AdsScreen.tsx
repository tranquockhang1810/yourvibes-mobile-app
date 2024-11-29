import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import useColor from "@/src/hooks/useColor";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Post from "@/src/components/common/Post";
import MyDateTimePicker from "@/src/components/foundation/MyDateTimePicker";
import { useAuth } from "@/src/context/auth/useAuth";
import AdsViewModel from "../viewModel/AdsViewModel";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { Button } from "@ant-design/react-native";
import { DateTransfer, getDayDiff } from "@/src/utils/helper/DateTransfer";
import { CurrencyFormat } from "@/src/utils/helper/CurrencyFormat";
import dayjs from "dayjs";
import { AdsCalculate } from "@/src/utils/helper/AdsCalculate";
import ENV from "@/env-config";

const Ads = ({ postId }: { postId: string }) => {
  const price = 30000;
  const { brandPrimary, backgroundColor } = useColor();
  const [method, setMethod] = useState("momo");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { language, localStrings } = useAuth();
  const [diffDay, setDiffDay] = useState(1);
  const { getPostDetail, post, loading, advertisePost, adsLoading } =
    AdsViewModel(defaultPostRepo);

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const [date, setDate] = useState<Date>(getTomorrow());

  const paymentMethods = [
    {
      id: "momo",
      name: "MoMo",
      image: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    },
  ];

  // Lịch sử quảng cáo giả
  const adsHistory = [
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      price: AdsCalculate(diffDay, price),
      method: "momo",
    },
  ];

  const [isHistoryExpanded, setHistoryExpanded] = useState(false);

  // Animation cho phần mở rộng/thu gọn lịch sử
  const [expandHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isHistoryExpanded) {
      Animated.timing(expandHeight, {
        toValue: 250, // Chiều cao khi mở rộng
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(expandHeight, {
        toValue: 0, // Chiều cao khi thu gọn
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isHistoryExpanded]);

  const renderPost = useCallback(() => {
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={brandPrimary} />
        </View>
      );
    } else {
      return (
        <Post post={post} noFooter>
          {post?.parent_post && <Post post={post?.parent_post} isParentPost />}
        </Post>
      );
    }
  }, [post, loading]);

  useEffect(() => {
    if (postId) {
      getPostDetail(postId);
    }
  }, [postId]);

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: backgroundColor,
          paddingTop: Platform.OS === "ios" ? 40 : 0,
        }}
      >
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            height: 60,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={brandPrimary}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>
              {localStrings.Ads.Ads}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* bài viết được chọn */}
        {renderPost()}

        {/* Thông tin quảng cáo */}
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              {localStrings.Ads.TimeAndBudget}
            </Text>
            <Text style={{ color: "gray", fontSize: 14 }}>
              {localStrings.Ads.Minimum.replace(
                "{{price}}",
                `${CurrencyFormat(price)}`
              )}
            </Text>
          </View>

          {/* Chọn thời gian quảng cáo */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            <FontAwesome name="calendar" size={24} color={brandPrimary} />
            <Text style={{ paddingLeft: 20 }}>
              {`${localStrings.Ads.TimeAds} ${DateTransfer(
                date
              )} (${diffDay} ${localStrings.Public.Day.toLowerCase()})`}
            </Text>
          </TouchableOpacity>
          <MyDateTimePicker
            value={date}
            show={showDatePicker}
            onCancel={() => setShowDatePicker(false)}
            onSubmit={(selectedDate) => {
              setDate(selectedDate);
              setDiffDay(getDayDiff(selectedDate));
            }}
            minDate={getTomorrow()}
          />

          {/* Ngân sách */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="cash" size={24} color={brandPrimary} />
            <Text style={{ paddingLeft: 20 }}>
              {localStrings.Ads.BudgetAds}{" "}
              {CurrencyFormat(AdsCalculate(diffDay, price))}
            </Text>
          </View>

          {/* Phương thức thanh toán */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
              {localStrings.Ads.PaymentMethod}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {paymentMethods.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setMethod(item.id)}
                  style={[
                    styles.option,
                    method === item.id && styles.selectedOption,
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Lịch sử Quảng Cáo */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {adsHistory.some(
            (history) =>
              new Date() >= history.startDate && new Date() <= history.endDate
          ) && (
            <View style={styles.activeIndicator}>
              <View style={styles.greenDot} />
              <Text style={styles.activeText}>{localStrings.Ads.ActiveCampaign}</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.historyToggleButton, { flex: 1 }]}
            onPress={() => setHistoryExpanded((prev) => !prev)}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {isHistoryExpanded ? `{localStrings.Ads.HideCampaign}` : `{localStrings.Ads.ShowCampaign}`}
            </Text>
            <Ionicons
              name={isHistoryExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={brandPrimary}
            />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[styles.historyContainer, { height: expandHeight }]}
        >
          {adsHistory.map((history, index) => {
            const isActive =
              new Date() >= history.startDate && new Date() <= history.endDate;

            return (
              <View key={index} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTitle}>
                    {localStrings.Ads.Campaign} #{index + 1}
                  </Text>
                  <FontAwesome name="calendar" size={20} color={brandPrimary} />
                </View>
                <View style={styles.historyContent}>
                  <Text style={styles.historyText}>
                    <Text style={styles.boldText}>{localStrings.Ads.Campaign}:</Text>{" "}
                    {DateTransfer(history.startDate)}
                  </Text>
                  <Text style={styles.historyText}>
                    <Text style={styles.boldText}>{localStrings.Ads.End}:</Text>{" "}
                    {DateTransfer(history.endDate)}
                  </Text> 
                  <Text style={styles.historyText}>
                    <Text style={styles.boldText}>{localStrings.Ads.RemainingTime}:</Text>{" "}
                    {getDayDiff(history.endDate)} {localStrings.Ads.Day}
                  </Text>
                  <Text style={styles.historyText}>
                    <Text style={styles.boldText}>{localStrings.Ads.Grant}:</Text>{" "}
                    {CurrencyFormat(history.price)}
                  </Text>
                  <Text style={styles.historyText}>
                    <Text style={styles.boldText}>{localStrings.Ads.PaymentMethod}:</Text>{" "}
                    {history.method === "momo" ? "MoMo" : "Khác"}
                  </Text>
                </View>
              </View>
            );
          })}
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Button
          type="primary"
          onPress={() => {
            advertisePost({
              post_id: postId,
              redirect_url: `${ENV.SERVER_ENDPOINT.replace(
                "http",
                "exp"
              ).replace("8080", "8081")}`,
              end_date: (
                dayjs(date).format("YYYY-MM-DDT00:00:00") + "Z"
              ).toString(),
              start_date: (
                dayjs().format("YYYY-MM-DDT00:00:00") + "Z"
              ).toString(),
            });
          }}
          loading={adsLoading}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {localStrings.Ads.Ads}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginRight: 10,
    borderRadius: 10,
  },
  selectedOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  historyToggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F9F9F9",
  },
  historyContainer: {
    overflow: "hidden",
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
  },
  historyCard: {
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  historyContent: {
    paddingLeft: 10,
  },
  historyText: {
    fontSize: 14,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  activeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  greenDot: {
	marginLeft: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    marginRight: 5,
  },
  activeText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Ads;