import axios from "axios";
import { BaseApiResponseModel, createBaseApiResponseModel } from "../baseApiResponseModel/baseApiResponseModel";
import IApiClient from "./IApiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ENV from "@/env-config"


const api = axios.create({
  baseURL: ENV.SERVER_ENDPOINT!,
  timeout: 30000,
});

//Request interceptors
api.interceptors.request.use(
  async (config) => {
    // Get from async storage
    const token = await AsyncStorage.getItem('accesstoken');
    console.log(`Method: ${config.method}, API URL: ${config.url}`);
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
    console.error(error)
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
    return createBaseApiResponseModel<T>(response);
  }

  async get<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.get(path, {
      params: data,
    });
    return createBaseApiResponseModel<T>(response);
  }

  async delete<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.delete(path, {
      params: data,
    });
    return createBaseApiResponseModel<T>(response);
  }

  async patch<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.patch(path, data, config);
    return createBaseApiResponseModel<T>(response);
  }
}

export default new AxiosClient();
