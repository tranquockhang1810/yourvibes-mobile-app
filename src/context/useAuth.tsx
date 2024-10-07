import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './authContextType';
import { VnLocalizedStrings } from "@/src/utils/localizedStrings/vietnam";
import { ENGLocalizedStrings } from "@/src/utils/localizedStrings/english";
import translateLanguage from '../utils/i18n/translateLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [localStrings, setLocalStrings] = useState(VnLocalizedStrings);
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  const checkLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem('language');
  
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
      setLanguage(lng);
      setLocalStrings(lng === "vi" ? VnLocalizedStrings : ENGLocalizedStrings);
    });
  };

  useEffect(() => {
    checkLanguage();
  }, [language]);

  return (
    <AuthContext.Provider value={{
      isLogin,
      login,
      logout,
      localStrings,
      changeLanguage,
      language,
      setLanguage,
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
