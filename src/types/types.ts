export type PreviewItem = {
  file: File | null;
  url: string;
  description: string;
  selected: boolean;
  isThumbnail: boolean;
};

// export interface DailyMetric {
//   label: string; 
//   visits: number;
//   orders: number;
//   revenue: number;
//   conversion: number;
// }

// export interface StorePerformanceAPIResponse {
//   range_start: string;
//   range_end: string;
//   data: DailyMetric[];
// }

export interface StoreMetric {
  date: string;
  revenue: string;
  orders: number;
  visits: number;
  label: string;
  conversions: number;
}

export interface StoreMetricsResponse {
  status: boolean;
  message: string;
  range_start: string;
  range_end: string;
  data: StoreMetric[];
}

// types/order.ts

export interface OrderProduct {
  product_id: number;
  product_name: string;
  price: string;
  quantity: number;
}

export interface OrderItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalAmount: string;
  shippingCost: string;
  shippingMethod: string;
  address: string;
  comments?: string;
  paymentMethod: string;
  createdAt: string;
  items: OrderProduct[];
}

export interface OrderListResponse {
  data: OrderItem[];
  message: string;
  status:boolean;
  pagination: {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}


