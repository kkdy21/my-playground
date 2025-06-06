import axios from "axios";
import type { StorageConnector } from "./webStorage.ts";
import { localStorageAccessor, sessionStorageAccessor } from "./webStorage.ts";
import { isNullOrUndefined } from "../utils/isNullOrUndefined.ts";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface IJwt {
  access_token: string;
  refresh_token: string;
}

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export default class JwtProvider {
  private static tokenProvider: JwtProvider | null = null;
  private localStorage: StorageConnector = localStorageAccessor;
  private sessionStorage: StorageConnector = sessionStorageAccessor;
  private REFRESH_TOKEN_URL = "auth/refresh";

  private refresh_token = "";
  private access_token = "";

  private lock: Promise<boolean> | null = null;

  constructor() {
    const accessToken = this.sessionStorage.getItem<string>("access_token");
    const refreshToken = this.localStorage.getItem<string>("refresh_token");
    this.access_token = accessToken || "";
    this.refresh_token = refreshToken || "";
  }

  static getProvider() {
    if (this.tokenProvider === null) {
      this.tokenProvider = new JwtProvider();
    }

    return this.tokenProvider;
  }

  getTokens(): IJwt {
    return {
      refresh_token: this.refresh_token,
      access_token: this.access_token,
    };
  }

  setTokens(token: IJwt) {
    if (!isNullOrUndefined(token.access_token)) {
      this.access_token = token.access_token;
      this.sessionStorage.setItem("access_token", token.access_token);
    }

    if (!isNullOrUndefined(token.refresh_token)) {
      this.refresh_token = token.refresh_token;
      this.localStorage.setItem("refresh_token", token.refresh_token);
    }
  }

  removeToken() {
    this.sessionStorage.removeItem("access_token");
    this.localStorage.removeItem("refresh_token");
  }

  async refreshTokens(): Promise<boolean> {
    if (!this.refresh_token) {
      return false;
    }

    if (this.lock) {
      await this.lock;
      return true;
    }

    this.lock = (async (): Promise<boolean> => {
      try {
        const refreshRes = await axios.post(
          `${baseUrl}/${this.REFRESH_TOKEN_URL}`,
          {
            request: {
              refresh_token: this.refresh_token,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        );
        this.setTokens({
          refresh_token: refreshRes.data.response.refresh_token,
          access_token: refreshRes.data.response.access_token,
        });
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        this.removeToken();
        return false;
      }
    })();

    const result = await this.lock;
    this.lock = null;
    return result;
  }

  parseAccessToken() {
    let decodedToken: JwtPayload = {};
    try {
      decodedToken = jwtDecode(this.access_token);
    } catch (e) {
      console.log(e);
    }
    return decodedToken;
  }
}
