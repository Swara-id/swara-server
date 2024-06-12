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

export interface NewsBody {
  title: string;
  description: string;
  userUid: string;
  newsTypeId: number;
  dateOfEvent: Date;
  file: File;
}
