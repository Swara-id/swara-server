import { ListResponse, TResponse } from "../../../types";

export interface SuggestionResult {
  id: number;
  uid: string;
  value: string;
  verificationStatus: "approved" | "rejected" | "waiting";
  attachmentUrl: string;
  challengeId: number | null;
  userUid: string;
  userLocation: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionBody {
  value: string;
  challengeId?: number;
  userUid: string;
  userLocation?: string;
}

export interface SuggestionResponse extends TResponse<SuggestionResult> {}
export interface SuggestionListResponse
  extends ListResponse<SuggestionResult> {}
