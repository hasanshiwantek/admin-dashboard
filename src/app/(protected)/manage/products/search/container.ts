import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchDefaultCurrency } from "@/redux/slices/currencySlice";
import { fetchBrands } from "@/redux/slices/productSlice";
import { ProductSearchSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ProductBrandOption } from "../_components/type";
import { FALLBACK_CURRENCY, PRODUCTS_ROUTE } from "../constant";
import { productSearchDefaults } from "./constant";
import type { ProductSearchFormValues } from "./type";
import { transformPostProductSearch } from "./utils";

const useProductSearchPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { brands, brandsLoading } = useAppSelector(
    (state) => state.product,
  ) as {
    brands: { data?: { brand?: ProductBrandOption }[] } | null;
    brandsLoading: boolean;
  };
  const defaultCurrency = useAppSelector(
    (state) => state.currency.defaultCurrency,
  );

  const form = useForm<ProductSearchFormValues>({
    resolver: yupResolver(ProductSearchSchema),
    defaultValues: productSearchDefaults,
  });

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, pageSize: 50 }));
    dispatch(fetchDefaultCurrency());
  }, [dispatch]);

  const onSubmit = (values: ProductSearchFormValues) =>
    router.push(`${PRODUCTS_ROUTE}${transformPostProductSearch(values)}`);

  return {
    form,
    brands: (brands?.data ?? []).flatMap(({ brand }) => (brand ? [brand] : [])),
    brandsLoading,
    currencySymbol: (defaultCurrency ?? FALLBACK_CURRENCY).symbol,
    onSubmit,
    handleCancel: () => router.push(PRODUCTS_ROUTE),
  };
};

export default useProductSearchPageContainer;
