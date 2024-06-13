import { ListResponse, TResponse } from "../../../types";

export interface NewsResult {
  id: number;
  uid: string;
  title: string;
  description: string;
  newsTypeId: number;
  dateOfEvent: Date;
  thumbnailUrl: string;
}

export interface NewsQuery {
  page: number;
  pageSize: number;
  search?: string;
  newsTypeId?: number;
  dateOfEvent?: Date;
  order?: "asc" | "desc";
}

export interface NewsResponse extends TResponse<NewsResult> {}
export interface NewsListResponse extends ListResponse<NewsResult> {}

export interface NewsBody {
  title: string;
  description: string;
  newsTypeId: number;
  dateOfEvent: Date;
}
