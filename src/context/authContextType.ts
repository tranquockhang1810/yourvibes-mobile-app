import { VnLocalizedStrings } from "@/src/utils/localizedStrings/vietnam";
import { ENGLocalizedStrings } from "@/src/utils/localizedStrings/english";

export interface AuthContextType {
  onLogin: (user: any) => void;
  onLogout: () => void;
  localStrings: typeof VnLocalizedStrings | typeof ENGLocalizedStrings; 
  changeLanguage: (lng: "vi" | "en") => void;
  language: "vi" | "en";
  setLanguage: (lng: "vi" | "en") => void;
  user: any;
  isAuthenticated: boolean;
}