import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './authContextType';
import { VnLocalizedStrings } from "@/src/utils/localizedStrings/vietnam";
import { ENGLocalizedStrings } from "@/src/utils/localizedStrings/english";
import translateLanguage from '../utils/i18n/translateLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [localStrings, setLocalStrings] = useState(VnLocalizedStrings);
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [user, setUser] = useState<any>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem('language');
    console.log('Stored Language:', storedLanguage); // Log stored language
  
    if (storedLanguage === "vi") {
      setLanguage("vi");
      setLocalStrings(VnLocalizedStrings);
    } else {
      setLanguage("en");
      setLocalStrings(ENGLocalizedStrings);
    }
  }

  const changeLanguage = (lng: "vi" | "en") => {
    translateLanguage(lng).then(() => {
      AsyncStorage.setItem('language', lng);
      console.log('Language Changed to:', lng); // Log language change
      setLanguage(lng);
      setLocalStrings(lng === "vi" ? VnLocalizedStrings : ENGLocalizedStrings);
    });
  };

  const onLogin = async (user: any) => {
    // Lưu user, hai token vào AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(user.user));
    await AsyncStorage.setItem('accesstoken', user.access_token);
    // AsyncStorage.setItem('refreshtoken', user.refreshtoken);
    // Đổi trạng thái đăng nhập
    setIsAuthenticated(true);
    // Lưu thông tin vào biến
    setUser(user.user);
    
    console.log('User Logged In:', user.user); // Log user login
    console.log('Access Token:', user.access_token); // Log access token
    // console.log('Refresh Token:', user.refreshtoken); // Log refresh token if needed
    console.log('Authentication Status:', true); // Log authentication status
  }

  const onLogout = async () => {
    //Xóa dữ liệu trong storage và trong biến
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('accesstoken');
    // await AsyncStorage.removeItem('refreshtoken');
    setIsAuthenticated(false);
    setUser(null);
    
    console.log('User Logged Out'); // Log user logout
    console.log('Authentication Status:', false); // Log authentication status
  }

  useEffect(() => {
    checkLanguage();
  }, [language]);

  return (
    <AuthContext.Provider value={{
      onLogin,
      onLogout,
      localStrings,
      changeLanguage,
      language,
      setLanguage,
      isAuthenticated,
      user
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
