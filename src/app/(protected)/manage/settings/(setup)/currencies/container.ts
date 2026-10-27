import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchCurrencies,
  setDefaultCurrency,
  updateCurrency,
} from "@/redux/slices/currencySlice";
import { errorMessage } from "@/utils/message";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdditionalCurrencyColumns } from "./columns";
import { currencyRoute } from "./constant";
import { Currency } from "./type";
import {
  formatCurrencyLabel,
  getIncompleteCurrencies,
  toCurrencyPayload,
} from "./utils";

const useCurrenciesPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currencies, currenciesLoading } = useAppSelector(
    (state) => state.currency,
  );

  const [noticeDismissed, setNoticeDismissed] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Currency | null>(null);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const refresh = () => dispatch(fetchCurrencies());

  const defaultCurrency =
    currencies.find((currency) => currency.isDefault) ?? null;
  const additionalCurrencies = currencies.filter(
    (currency) => !currency.isDefault,
  );
  const incompleteCurrencies = getIncompleteCurrencies(currencies);

  const handleToggleEnabled =
    (currency: Currency) => async (enabled: boolean) => {
      const result = await dispatch(
        updateCurrency({
          id: currency.id,
          data: toCurrencyPayload(currency, { enabled }),
        }),
      );
      if (updateCurrency.rejected.match(result)) {
        errorMessage(result.payload as string);
        return;
      }
      refresh();
    };

  const handleSetDefault = async (currency: Currency) => {
    const result = await dispatch(setDefaultCurrency(currency.id));
    if (setDefaultCurrency.rejected.match(result)) {
      errorMessage(result.payload as string);
      return;
    }
    refresh();
  };

  const handleCurrencyAction =
    (currency: Currency) => (action: ActionEnums) => {
      switch (action) {
        case ActionEnums.EDIT:
          return router.push(currencyRoute(currency.code));
        case ActionEnums.SET_DEFAULT:
          return handleSetDefault(currency);
        case ActionEnums.DELETE:
          return setDeleteTarget(currency);
      }
    };

  return {
    defaultCurrency,
    additionalCurrencies,
    additionalColumns: getAdditionalCurrencyColumns({
      defaultCode: defaultCurrency?.code ?? "",
      onToggleEnabled: handleToggleEnabled,
      onAction: handleCurrencyAction,
    }),
    existingCodes: currencies.map((currency) => currency.code),
    firstLoad: currenciesLoading && !currencies.length,
    refreshing: currenciesLoading && currencies.length > 0,
    incompleteCurrencies,
    showSetupNotice: !noticeDismissed && incompleteCurrencies.length > 0,
    handleDismissNotice: () => setNoticeDismissed(true),
    deleteTarget: deleteTarget && {
      id: deleteTarget.id,
      name: formatCurrencyLabel(deleteTarget),
    },
    handleDeleteOpenChange: (open: boolean) => !open && setDeleteTarget(null),
    handleDeleted: () => setDeleteTarget(null),
  };
};

export default useCurrenciesPageContainer;
