import type { AxiosResponse } from "axios";
import ServiceAPI from "../libs/serviceAPI.ts";

export default class BaseRepository {
  private serviceAPI: ServiceAPI;

  constructor(baseURL: string = "http://localhost:5173") {
    this.serviceAPI = new ServiceAPI(baseURL);
  }

  protected async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.serviceAPI.instance.get<T>(url);
  }

  protected async post<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
    return this.serviceAPI.instance.post<T>(url, data);
  }

  protected async put<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
    return this.serviceAPI.instance.put<T>(url, data);
  }

  protected async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.serviceAPI.instance.delete<T>(url);
  }
}
