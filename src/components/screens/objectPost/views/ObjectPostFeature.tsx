import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useColor from '@/src/hooks/useColor';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ObjectPostFeature = () => {
  const { brandPrimary, backgroundColor } = useColor();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      {/* Header */}
      <View style={{ paddingTop: 30 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity onPress={() => {
              router.back();
            }}>
              <Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
            </TouchableOpacity>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: 10,
            }}>
              Đối tượng của bài viết
            </Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10 }} />
      {/* Content */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Ai có thể nhìn thấy bài viết của bạn?</Text>
        <Text>Bài viết của bạn có thể hiện thị trên trang cá nhân và trong kết quả tìm kiếm.</Text>
        <Text>Tuy đối tượng mặc định là <Text style={{ fontWeight: 'bold' }}>Công khai</Text>, nhưng bạn có thể thay đổi đối tượng của riêng bài viết này.</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Chọn Đối tượng</Text>
        <View style={styles.container}>
          {['Chỉ mình tôi', 'Công khai', 'Bạn bè'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <View style={styles.checkbox}>
                {selectedOption === option && <View style={styles.checked} />}
              </View>
              <Text style={{ color: brandPrimary }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

export default ObjectPostFeature;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc', // Màu viền checkbox
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: '#000', // Màu của checkbox khi được chọn
  },
});
