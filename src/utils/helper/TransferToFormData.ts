import { ImagePickerAsset } from 'expo-image-picker';

export const TransferToFormData = (data: any) => {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] === undefined) {
      continue;
    } else if (key === 'media' && Array.isArray(data[key])) {
      data[key].forEach((file: any) => {
        formData.append(key, {
          uri: file.uri,
          name: file.name,
          type: file.type
        } as any);
      });
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        formData.append(key, item);
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
      const fileType = mimeType || (uri.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg');

      const file = {
        uri: uri,
        name: fileName || `media_${index}.${fileType.split('/')[1]}`,
        type: fileType
      };

      return file;
    })
  );

  return mediaFiles;
};
