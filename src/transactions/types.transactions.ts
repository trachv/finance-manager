export interface IPagination {
  take: number;
  cursor?: { id: number };
  skip?: number;
}
