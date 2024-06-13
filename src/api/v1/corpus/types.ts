export interface CorpusResult {
  id: number;
  value: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  imageUrl: string;
  corpusId: number;
  createdAt: Date;
}

export interface CorpusGet extends CorpusResult {
  images: Image[];
}

export interface CorpusBody {
  value: string;
  type: "word" | "letter";
}
