import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type APIResult<T> = {
  success: any;
  data: T | null;
  error: any;
};

export async function get<T = any>(
  path: string,
  params?: object,
  config?: AxiosRequestConfig
): Promise<APIResult<T>> {
  try {
    const res: AxiosResponse<T> = await axios.get(path, {
      ...config,
      params,
    });
    return { data: res.data, error: null };
  } catch (err: any) {
    return { data: null, error: err?.response?.data || err };
  }
}

export async function post<T = any>(
  path: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<APIResult<T>> {
  try {
    const res: AxiosResponse<T> = await axios.post(path, data, config);
    return { data: res.data, error: null };
  } catch (err: any) {
    return { data: null, error: err?.response?.data || err };
  }
}
