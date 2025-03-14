import { ApiError } from "./api-error";

export class ApiRequestFactory {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL, 'NEXT_PUBLIC_VERCEL_URL')
    this.baseUrl =
    baseUrl || 
    (process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000")
      // baseUrl || 
      // (process.env.NODE_ENV === "development"
      //   ? "http://localhost:3000"
      //   : process.env.NEXT_PUBLIC_SITE_URL || "");
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    try {
      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new ApiError(res.status, errorMessage);
      }

      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      }

      return (await res.text()) as unknown as T;
    } catch (error) {
      throw new ApiError(res.status, "Error processing response", error);
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const res = await fetch(`${this.baseUrl}/${endpoint}`, {
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      return await this.handleResponse<T>(res);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("API Error:", error.message, "Status:", error.status);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    }
  }

  get<T>(endpoint: string, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  post<T>(endpoint: string, body: any, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  put<T>(endpoint: string, body: any, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  delete<T>(endpoint: string, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}
