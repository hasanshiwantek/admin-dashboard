// A review as the reviews API returns it
export interface Review {
  id: number;
  subject?: string | null;
  comment?: string | null;
  name?: string | null;
  rating?: number | string | null;
  approved?: number | boolean | null;
  created_at?: string | null;
  user?: { name?: string | null } | null;
  product?: { name?: string | null; product_url?: string | null } | null;
}

export interface ReviewsResponse {
  data?: Review[];
  pagination?: { lastPage?: number; total?: number };
}
