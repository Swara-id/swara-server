import { ListResponse, TResponse } from "./../../../types";

export interface SuggestionResult {
  id: number;
  uid: string;
  type: "word" | "letter";
  value: string;
  verificationStatus: "approved" | "rejected" | "waiting";
  attachmentUrl: string;
  challengeId: number | null;
  userId: number;
  userLocation: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionBody {
  type: "word" | "letter";
  value: string;
  challengeId?: number;
  userId: number;
  userLocation?: string;
}

export interface SuggestionResponse extends TResponse<SuggestionResult> {}
export interface SuggestionListResponse
  extends ListResponse<SuggestionResult> {}
