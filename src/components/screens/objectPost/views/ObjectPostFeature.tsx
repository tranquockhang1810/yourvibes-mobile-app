import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useColor from '@/src/hooks/useColor';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ObjectPostFeature = () => {
    const { brandPrimary, backgroundColor } = useColor();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    const options = [
        { label: 'Công khai', icon: 'globe', description: 'Bất kỳ ai ở trên YourVibes' },
        { label: 'Bạn bè', icon: 'people', description: 'Chỉ bạn bè của bạn ở trên YourVibes' },
        { label: 'Chỉ mình tôi', icon: 'lock-closed', description: 'Chỉ bạn có thể nhìn thấy' }
    ];

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
                        <TouchableOpacity onPress={() => { router.back(); }}>
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
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ai có thể nhìn thấy bài viết của bạn?</Text>
                <Text style={{ paddingTop: 10 }}>Bài viết của bạn có thể hiện thị trên trang cá nhân và trong kết quả tìm kiếm.</Text>
                <Text style={{ paddingTop: 10 }}>
                    Tuy đối tượng mặc định là <Text style={{ fontWeight: 'bold' }}>Công khai</Text>, nhưng bạn có thể thay đổi đối tượng của riêng bài viết này.
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Chọn Đối tượng</Text>
                <View style={styles.container}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.label}
                            style={styles.option}
                            onPress={() => handleSelect(option.label)}
                        >
                            <View style={styles.checkbox}>
                                {selectedOption === option.label && <Ionicons name="checkmark" size={20} color="#000" />}
                            </View>
                            <Ionicons name={option.icon} size={24} color={brandPrimary} style={styles.icon} />
                            <View>
                                <Text style={{ color: brandPrimary }}>{option.label}</Text>
                                <Text style={{ color: '#888', fontSize: 12 }}>{option.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Footer */}
            <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: brandPrimary,
                        borderColor: brandPrimary,
                        height: 45,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => Alert.alert('Cập nhật', 'Cập nhật đối tượng bài viết thành công!')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Xong</Text>
                </TouchableOpacity>
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
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        marginRight: 10,
    },
});
