import { ImagePickerAsset } from 'expo-image-picker';

export const TransferToFormData = (data: any) => {
  const formData = new FormData();
  
  for (const key in data) {
    if (key === 'media' && Array.isArray(data[key])) {
      data[key].forEach((file: any) => {
        formData.append(key, {
          uri: file.uri,
          name: file.name,
          type: file.type
        } as any); // File đã được chuẩn bị trước đó
      });
    } else {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export const convertMediaToFiles = async (media: ImagePickerAsset[]) => {
  const mediaFiles = await Promise.all(
    media.map(async (mediaItem: ImagePickerAsset, index: number) => {
      const { uri, fileName, mimeType } = mediaItem;
      console.log("mediaItem: ", mediaItem);
      
      const fileType = mimeType || (uri.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg');

      const file = {
        uri: uri, // uri của file
        name: fileName || `media_${index}.${fileType.split('/')[1]}`, // Tên file
        type: fileType // Loại file
      };

      // const response = await fetch(uri);
      // const blob = await response.blob();

      // // Chuyển Blob thành File
      // const file = new File([blob], fileName || `media_${index}.${fileType.split('/')[1]}`, {
      //   type: fileType,
      // });

      console.log("file: ", file);
      return file;
    })
  );
  
  return mediaFiles;
};
