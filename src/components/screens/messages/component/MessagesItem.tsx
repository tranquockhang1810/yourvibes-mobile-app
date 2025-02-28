import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const MessagerItem = () => {
    const {avatar_url, name, lastOnline, contextChat} =
  return (
    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
            <Image
        source={{
          uri: 'https://thumbs.dreamstime.com/b/avatar-icon-avatar-flat-symbol-isolated-white-avatar-icon-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-124920496.jpg',
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}/>
        <View style={{ marginLeft: 10, display: 'flex', justifyContent: 'center' }}>
          <Text>Nguyễn Văn A</Text>
          <Text>Text</Text>
        </View>
        </View>
      
        <View>
            <Text>time</Text>
        </View>
    </View>
  )
}

export default MessagerItem