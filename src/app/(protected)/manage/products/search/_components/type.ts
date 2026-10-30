import type { ProductBrandOption } from "../../_components/type";
import type { ProductSearchFormNames } from "../constant";

export interface ProductSearchFormFieldsProps {
  brands: ProductBrandOption[];
  brandsLoading: boolean;
}

export interface RangeFieldsProps {
  label: string;
  min: ProductSearchFormNames;
  max: ProductSearchFormNames;
  isPrice?: boolean;
}
