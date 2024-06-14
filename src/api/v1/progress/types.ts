import { ListResponse, TResponse } from "../../../types";

export interface ProgressResult {
  id: number;
  corpusId: number;
  userUid: string;
  createdAt: Date;
}

export interface ProgressBody {
  userUid: string;
  corpusId: number;
}

export interface ProgressResponse extends TResponse<ProgressResult> {}
export interface ProgressListResponse extends ListResponse<ProgressResult> {}
