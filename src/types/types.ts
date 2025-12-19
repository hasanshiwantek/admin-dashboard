export type PreviewItem = {
  file: File | null;
  path: string | File;
  description: string;
  selected: boolean;
  isPrimary: boolean;
  type: "image" | "video";
};

export interface StoreMetric {
  date: string;
  revenue: string;
  orders: number;
  visits: string;
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
export interface BillingInformation {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
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
  key: string;
   billingInformation?: BillingInformation; 
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
    key: string;
}

export interface MappingField  {
  label: string;
  type: "dropdown" | "radio-dropdown";
  options?: string[]; // For radio
};


