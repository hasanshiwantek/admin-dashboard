import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchBrands } from "@/redux/slices/productSlice";
import { ProductSearchSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ProductBrandOption } from "../_components/type";
import { PRODUCTS_ROUTE } from "../constant";
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
  const form = useForm<ProductSearchFormValues>({
    resolver: yupResolver(ProductSearchSchema),
    defaultValues: productSearchDefaults,
  });

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  const onSubmit = (values: ProductSearchFormValues) =>
    router.push(`${PRODUCTS_ROUTE}${transformPostProductSearch(values)}`);

  return {
    form,
    brands: (brands?.data ?? []).flatMap(({ brand }) => (brand ? [brand] : [])),
    brandsLoading,
    onSubmit,
    handleCancel: () => router.push(PRODUCTS_ROUTE),
  };
};

export default useProductSearchPageContainer;
