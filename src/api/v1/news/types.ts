import { ListResponse, TResponse } from "../../../types";

export interface NewsResult {
  id: number;
  uid: string;
  title: string;
  description: string;
  userUid: string;
  newsTypeId: number;
  dateOfEvent: Date;
  thumbnailUrl: string;
}

export interface NewsResponse extends TResponse<NewsResult> {}
export interface NewsListResponse extends ListResponse<NewsResult> {}

export interface NewsBody {
  title: string;
  description: string;
  userUid: string;
  newsTypeId: number;
  dateOfEvent: Date;
}
