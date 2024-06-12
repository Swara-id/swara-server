export interface ChallengeResult {
  id: number;
  uid: string;
  type: "word" | "letter";
  value: string;
  point: number;
  status: "ongoing" | "completed";

  createdAt: Date;
  updatedAt: Date;
}

export interface ChallengePostBody {
  type: "word" | "letter";
  value: string;
  point: number;
}

export interface ChallengePatchBody {
  type?: "word" | "letter";
  value?: string;
  point?: number;
  status?: "ongoing" | "completed";
}
