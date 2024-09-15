import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import envConfig from "./env-config";

class AxiosConfig {
  public axiosInstance: AxiosInstance;
  private authUrl = ["/login", "/refresh-token", "login", "refresh-token"];
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: envConfig.NEXT_PUBLIC_FE_ENDPOINT,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !this.authUrl.includes(originalRequest.url)
        ) {
          originalRequest._retry = true;
          try {
            await this.axiosInstance.post(
              "/refresh-token",
              {},
              { withCredentials: true }
            );
            return this.axiosInstance(originalRequest);
          } catch (err) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, AxiosError>> {
    return await this.axiosInstance.get<T>(url, config);
  }

  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, AxiosError>> {
    return await this.axiosInstance.post<T>(url, data, config);
  }

  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, AxiosError>> {
    return await this.axiosInstance.put<T>(url, data, config);
  }

  async patch<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, AxiosError>> {
    return await this.axiosInstance.patch<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, AxiosError>> {
    return await this.axiosInstance.delete<T>(url, config);
  }
}

const AxiosClient = new AxiosConfig();

export default AxiosClient;
