import axios, { AxiosRequestConfig } from "axios";
import { convertLowerCamelToSnake, convertSnakeToLowerCamel } from "@/utils";
import { VITE_API_URL } from "@/config";

const axiosUnauthenticatedInstance = axios.create({});

const baseConfig: AxiosRequestConfig = {
  baseURL: VITE_API_URL,
};

export const apiGet = async (url: string, data?: object) => {
  try {
    const response = await axiosUnauthenticatedInstance.get(url, {
      ...baseConfig,
      params: data ? convertLowerCamelToSnake(data) : null,
      paramsSerializer: { indexes: null },
    });
    return convertSnakeToLowerCamel(response.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
