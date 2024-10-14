import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import { Tabs, Button, Modal, ActionSheet } from '@ant-design/react-native';
import { useAuth } from '@/src/context/useAuth';
import { useRouter } from 'expo-router'; 

interface SettingsTabProps {
  user: any;
  onLogout: () => void;
  showLanguageOptions: () => void;
  localStrings: any;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ user, onLogout, showLanguageOptions, localStrings }) => {
  const { brandPrimary, backgroundColor } = useColor();
  const router = useRouter();

    const handleLogout = () => {
    Modal.alert(
      localStrings.Public.Confirm,
      localStrings.Public.LogoutConfirm,
      [
        { text: localStrings.Public.Cancel, style: 'cancel' },
        { text: localStrings.Public.Confirm, onPress: onLogout },
      ]
    );
  };

  // const handleLogout = () => { 
  //   Modal.alert(
  //     localStrings.Public.Confirm,   
  //     localStrings.Public.LogoutConfirm,  
  //     [
  //       { 
  //         text: localStrings.Public.Cancel, 
  //         style: 'cancel',
  //         onPress: () => {
  //           console.log("User canceled logout"); 
  //         }
  //       },
  //       { 
  //         text: localStrings.Public.Confirm,   
  //         onPress: () => {
  //           onLogout();  
  //           router.replace('/login');  
  //         }  
  //       },
  //     ]
  //   );
  // };
  

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Button
          type="primary"
          onPress={() => {
            // Handle Edit Profile action here
          }}
          style={{ backgroundColor: backgroundColor }}
        >
          <Text style={{ color: brandPrimary, fontSize: 16 }}>
            {localStrings.Public.EditProfile}
          </Text>
        </Button>
        <Button
          type="primary"
          onPress={() => {
            // Handle Change Password action here
          }}
          style={{ marginVertical: 10, backgroundColor: backgroundColor }}
        >
          <Text style={{ color: brandPrimary, fontSize: 16 }}>
            {localStrings.Public.ChangePassword}
          </Text>
        </Button>
        <Button
          type="primary"
          onPress={showLanguageOptions}
          style={{ backgroundColor: backgroundColor }}
        >
          <Text style={{ color: brandPrimary, fontSize: 16 }}>
            {localStrings.Public.Language}
          </Text>
        </Button>
        <Button
          type="primary"
          onPress={handleLogout}
          style={{ marginTop: 10, backgroundColor: backgroundColor }}
        >
          <Text style={{ color: brandPrimary, fontSize: 16 }}>
            {localStrings.Public.LogOut}
          </Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default SettingsTab;
