import ServiceAPI from "../libs/serviceAPI.ts";

export default class BaseRepository {
  private serviceAPI: ServiceAPI;
  //TODO Mock 관련 한 클래스
  constructor(baseURL: string = "http://localhost:5173") {
    this.serviceAPI = new ServiceAPI(baseURL);
  }

  protected async get<T>(url: string): Promise<T> {
    return this.serviceAPI.instance.get<T>(url).then((res) => res.data);
  }

  protected async post<T, D>(url: string, data: D): Promise<T> {
    return this.serviceAPI.instance.post<T>(url, data).then((res) => res.data);
  }

  protected async put<T, D>(url: string, data: D): Promise<T> {
    return this.serviceAPI.instance.put<T>(url, data).then((res) => res.data);
  }

  protected async delete<T>(url: string): Promise<T> {
    return this.serviceAPI.instance.delete<T>(url).then((res) => res.data);
  }
}
