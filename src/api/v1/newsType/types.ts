export interface NewsTypeResult {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface NewsTypeBody {
  name: string;
}
