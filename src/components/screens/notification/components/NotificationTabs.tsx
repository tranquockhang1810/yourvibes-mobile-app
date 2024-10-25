import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Tabs } from '@ant-design/react-native'

// Hàm hiển thị nội dung của từng tab
const renderTabContent = (tab: any, index: any) => {
  const content = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
    <View
      key={`${index}_${i}`}
      style={{
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
      }}
    >
      <Text>
        {tab.title} - {i}
      </Text>
    </View>
  ))

  return (
    <ScrollView key={index} style={{ backgroundColor: '#000' }}>
      {content}
    </ScrollView>
  )
}

// Thành phần NotificationTabs sử dụng React Component
export default class NotificationTabs extends React.Component {
  render() {
    const tabs = [
      { title: 'Tất cả' },
      { title: 'Lượt thích' },
      { title: 'Bình luận' },
      { title: 'Yêu cầu kết bạn' },
      { title: 'Chia sẽ' },
    ]

    return (
      <View style={{ flex: 1 }}>
        {/* Giao diện Tabs */}
        <Tabs tabs={tabs}>
          {tabs.map((tab, index) => (
            <View key={index} style={{alignItems: 'center',
                justifyContent: 'center',
                height: 150,
                backgroundColor: '#fff',}}>
              <Text>{`Content of ${tab.title}`}</Text>
            </View>
          ))}
        </Tabs>
      </View>
    )
  }
}
