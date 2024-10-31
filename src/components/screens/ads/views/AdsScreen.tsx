import { Alert, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useColor from '@/src/hooks/useColor';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Post from '@/src/components/common/Post';
import MyDateTimePicker from '@/src/components/foundation/MyDateTimePicker';
import { useAuth } from '@/src/context/auth/useAuth';
import { DateTransfer } from '@/src/utils/helper/DateTransfer';

const Ads = () => {
    const { brandPrimary, backgroundColor } = useColor();
    const [days, setDays] = useState(1);
    const [method, setMethod] = useState('momo');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { user, localStrings } = useAuth();

    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }
    const [date, setDate] = useState(getTomorrow());

    const increaseDays = () => {
        const newDays = days + 1;
        setDays(newDays);
        updateDateFromDays(newDays);
    };
    const decreaseDays = () => {
        if(days > 1) {
            const newDays = days - 1;
            setDays(newDays);
            updateDateFromDays(newDays);
        }
    };
    const updateDateFromDays = (days: number) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
    };
    const updateDaysFromDate = (selectedDate: Date) => {
        const today = new Date();
        const timeDiff = selectedDate.getTime() - today.getTime();
        const newDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Số ngày chênh lệch
        setDays(newDays > 0 ? newDays : 1);
    };
    const paymentMethods = [
        {
            id: 'momo',
            name: 'MoMo',
            image: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
        },
        {
            id: 'paypal',
            name: 'PayPal',
            image: 'https://th.bing.com/th/id/OIP.wBKSzdf1HTUgx1Ax_EecKwHaHa?rs=1&pid=ImgDetMain',
        },
    ];
    const selectMethod = (method: string) => {
        setMethod(method);
        Alert.alert('Chọn phương thức thanh toán', `Bạn đã chọn ${method}`);
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{backgroundColor: backgroundColor, paddingTop: 40 }}>
                <StatusBar barStyle="dark-content" />
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { router.back(); }}>
                            <Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
                            {localStrings.Ads.Ads}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: '#ccc' }} />

            {/* Content */}
            <View style={{ flex: 1}}>
                {/* bài viết được chọn */}
                <Post />
                <View style={{ borderBottomWidth: 1, borderColor: '#ccc'}} />
                {/* Thông tin quảng cáo */}
                    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20}}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                                {localStrings.Ads.TimeAndBudget}
                            </Text>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{localStrings.Ads.Minimum}</Text>
                        </View>

                        {/* Nhập số ngày bạn muốn quảng cáo */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', marginVertical: 10, paddingHorizontal: 10, justifyContent: 'space-between'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ paddingRight: 5 }}>{localStrings.Ads.DaysAds}</Text>
                                <TextInput
                                    style={{ 
                                        textAlign: 'center', 
                                        paddingVertical: 5,
                                        borderWidth: 0, // Bỏ viền
                                    
                                    }}
                                    value={days.toString()}
                                    onChangeText={(text) => {
                                        const newDays = parseInt(text) || 1;
                                        setDays(newDays);
                                        updateDateFromDays(newDays);
                                    }}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={decreaseDays} style={{ paddingRight: 10 }}>
                                    <AntDesign name="minuscircleo" size={24} color={brandPrimary} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={increaseDays}>
                                    <AntDesign name="pluscircleo" size={24} color={brandPrimary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Chọn thời gian quảng cáo */}
                        
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 }}
                            onPress={() => {
                                setShowDatePicker(true);
                            }}>
                                <FontAwesome name="calendar" size={24} color={brandPrimary} />
                                <Text  style={{paddingLeft:20}}>{localStrings.Ads.TimeAds} {DateTransfer(date.toLocaleDateString())}</Text>
                            </TouchableOpacity>
                            <MyDateTimePicker
                                value={date}
                                show={showDatePicker}
                                onCancel={() => setShowDatePicker(false)}
                                onSubmit={(selectedDate) => {
                                setDate(selectedDate);
                                updateDaysFromDate(selectedDate);
                                setShowDatePicker(false);
                                }}
                            />
                        {/* Ngân sách */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 }}>
                            <Ionicons name="cash" size={24} color={brandPrimary}/>
                            <Text style={{paddingLeft:20}}>{localStrings.Ads.BudgetAds} {days * 30000} VND</Text>
                        </View>

                        {/* Phương thức thanh toán */}
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                        <Text style={{fontWeight: 'bold',  marginRight: 10, }}>Phương thức thanh toán</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        {paymentMethods.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => selectMethod(item.id)} style={[
                                styles.option,
                                method === item.id && styles.selectedOption, // Kiểm tra xem phương thức này có được chọn không
                            ]}>
                                <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                        </View>
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
                    onPress={() => Alert.alert('Quảng cáo', 'Quảng cáo thành công!')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{localStrings.Ads.Ads}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Ads;

const styles = StyleSheet.create({
    option: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginRight: 10,
        borderRadius: 10,
    },
    selectedOption: {
        borderColor: '#4CAF50', // Hiệu ứng viền màu xanh khi được chọn
        backgroundColor: '#E8F5E9',
    },
});