import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

interface SettingsTabProps {
  user: any;
  onLogout: () => void;
  showLanguageOptions: () => void;
  localStrings: any;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ user, onLogout, showLanguageOptions, localStrings }) => {
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
        onPress={showLanguageOptions}
      >
        <Feather name="globe" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>{localStrings.Public.ChangeLanguage}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
        onPress={onLogout}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>{localStrings.Public.Logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsTab;
