export interface LeaderboardQuery {
  page: number;
  pageSize: number;
  search?: string;
  order?: "asc" | "desc";
}
