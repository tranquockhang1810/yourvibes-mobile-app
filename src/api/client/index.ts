import axios from "axios";
import { BaseApiResponseModel } from "../baseApiResponseModel/baseApiResponseModel";
import IApiClient from "./IApiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModelConverter from "@/src/utils/modelConvert/ModelConverter";
import curlirize from "axios-curlirize";
import { router } from "expo-router";
import { Modal } from "@ant-design/react-native";

const api = axios.create({
  timeout: 60000,
});

curlirize(api);

//Request interceptors
api.interceptors.request.use(
  async (config) => {
    // Get from async storage
    const token = await AsyncStorage.getItem('accesstoken');
    // for ngrok
    if (config?.url?.includes("ngrok-free.app")) {
      config.headers!["ngrok-skip-browser-warning"] = "69420";
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    Promise.reject(error)
  }
);

//Response interceptors
api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.error("Response error:", error);
    error.response || error;
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      Modal.alert(
        "Session Expired",
        "Your session has expired. Please login again.",
        [{ text: "OK", onPress: () => router.replace(`/login`), style: "cancel" }],
      );
    }
    return Promise.resolve(error?.response?.data);
  }
);

class AxiosClient implements IApiClient {
  async post<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.post(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async get<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.get(path, {
      params: data,
    });
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async delete<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.delete(path, {
      params: data,
    });
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async patch<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.patch(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }
}

export default new AxiosClient();
