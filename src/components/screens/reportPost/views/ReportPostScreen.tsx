import { Alert, Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import useColor from '@/src/hooks/useColor';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ReportPostScreen = () => {
    const { brandPrimary, backgroundColor } = useColor();
    const [reportReason, setReportReason] = useState('');
  
  
    const handleSubmit = () => {
      Alert.alert('Báo cáo thành công', 'Cảm ơn bạn đã gửi báo cáo.');
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            Báo cáo
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10 }} />

            {/* Nội dung báo cáo */}
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontWeight:'bold', fontSize: 18}}>
                Tại sao bạn báo cáo [bài viết] [người dùng] này?
                </Text>
                <Text style={{marginVertical:10, color:'#666'}}>
                Nếu bạn nhận thấy sự đe dọa hoặc nguy hiểm, đừng chần chừ mà hãy tìm
                ngay sự giúp đỡ trước khi báo cáo với YourVibes.
                </Text>

                <TextInput
                style={{height: 180,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginVertical: 10,
                    textAlignVertical: 'top', }}
                multiline
                value={reportReason}
                onChangeText={setReportReason}
                />
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
                    onPress={handleSubmit}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Gửi Báo Cáo</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default ReportPostScreen;

const styles = StyleSheet.create({
  
});
