export interface ShippingAddress {
  address_line_1?: string;
  address_line_2?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface ShippingMethod {
  id: number;
  display_name?: string;
  method_type: string;
  custom_description?: string;
  is_active: boolean | number;
}

export interface ShippingZone {
  id: number;
  name: string;
  is_active: boolean | number;
  shipping_methods?: ShippingMethod[];
}
