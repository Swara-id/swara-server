import { ListResponse, TResponse } from "../../../types";

export interface NewsTypeResult {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface NewsTypeBody {
  name: string;
}

export interface NewsTypeResponse extends TResponse<NewsTypeResult> {}
export interface NewsTypeListResponse extends ListResponse<NewsTypeResult> {}
