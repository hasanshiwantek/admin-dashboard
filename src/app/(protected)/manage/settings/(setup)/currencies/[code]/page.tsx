"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import CurrencyDisplaySection from "../_components/CurrencyDisplaySection";
import CurrencyDisplaySettingsSection from "../_components/CurrencyDisplaySettingsSection";
import CurrencyTransactionsSection from "../_components/CurrencyTransactionsSection";
import { CURRENCIES_ROUTE } from "../constant";
import useCurrencyFormPageContainer from "./container";

const CurrencyFormPage = () => {
  const {
    form,
    showTransactions,
    code,
    name,
    defaultCode,
    defaultName,
    countries,
    title,
    preview,
    loading,
    saving,
    showRateType,
    isDynamicRate,
    exchangeRate,
    rateLoading,
    handleGetCurrentRate,
    handleRateModeChange,
    onSubmit,
    handleCancel,
  } = useCurrencyFormPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Currencies", href: CURRENCIES_ROUTE }}
      title={title}
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="relative gap-6 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
          loading: saving,
          disabled: loading,
        }}
      >
        <div
          className={cn(
            "flex flex-col gap-6 transition-opacity duration-200",
            loading && LOADING_DIM_CLASS,
          )}
        >
          <CurrencyDisplaySection code={code} countries={countries} />
          {showTransactions && (
            <CurrencyTransactionsSection
              code={code}
              name={name}
              defaultCode={defaultCode}
              defaultName={defaultName}
              showRateType={showRateType}
              isDynamicRate={isDynamicRate}
              exchangeRate={exchangeRate}
              rateLoading={rateLoading}
              onGetCurrentRate={handleGetCurrentRate}
              onRateModeChange={handleRateModeChange}
            />
          )}
          <CurrencyDisplaySettingsSection preview={preview} />
        </div>
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default CurrencyFormPage;
