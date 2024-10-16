import React, { createContext, ReactNode, useContext, useState } from 'react';
import { PostContextType } from './postContextType';
import { Privacy } from '@/src/api/baseApiResponseModel/baseApiResponseModel';
import { ImagePickerAsset } from 'expo-image-picker';

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedPostContent, setSavedPostContent] = useState<string | undefined>('');
  const [savedSelectedImages, setSavedSelectedImages] = useState<string[] | undefined>([]);
  const [savedSelectedImageFiles, setSavedSelectedImageFiles] = useState<ImagePickerAsset[] | undefined>([]);
  const [savedPrivacy, setSavedPrivacy] = useState<Privacy | undefined>(Privacy.PUBLIC);

  const clearSavedPost = () => {
    setSavedPostContent('');
    setSavedSelectedImages([]);
    setSavedSelectedImageFiles([]);
    setSavedPrivacy(Privacy.PUBLIC);
  }

  return (
    <PostContext.Provider value={{
      savedPostContent,
      setSavedPostContent,
      savedSelectedImages,
      setSavedSelectedImages,
      savedSelectedImageFiles,
      setSavedSelectedImageFiles,
      savedPrivacy,
      setSavedPrivacy,
      clearSavedPost
    }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within an PostProvider');
  }
  return context;
};

