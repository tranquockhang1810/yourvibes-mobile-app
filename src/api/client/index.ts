import axios from "axios";
import { BaseApiResponseModel } from "../baseApiResponseModel/baseApiResponseModel";
import ModelConverter from "@/src/utils/modelConvert/ModelConverter";
import IApiClient from "./IApiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: process.env.SERVER_ENDPOINT!,
  timeout: 30000,
});

//Request interceptors
api.interceptors.request.use(
  async (config) => {
    // Get from async storage
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//Response interceptors
api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.log(error)
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

  async put<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.put(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }
}

export default new AxiosClient();
