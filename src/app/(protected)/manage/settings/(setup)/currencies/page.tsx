"use client";

import PageLayout from "@/components/ui/PageLayout";
import DeleteCurrencyModal from "@/Modals/CurrencyModals/DeleteCurrencyModal/DeleteCurrencyModal";
import { ExternalLink } from "lucide-react";
import { SETTINGS_ROUTE } from "../../(products)/constant";
import AdditionalCurrenciesSection from "./_components/AdditionalCurrenciesSection";
import CurrencySetupNotice from "./_components/CurrencySetupNotice";
import DefaultCurrencySection from "./_components/DefaultCurrencySection";
import RelatedSettingsSection from "./_components/RelatedSettingsSection";
import { CURRENCIES_LEARN_MORE_URL } from "./constant";
import useCurrenciesPageContainer from "./container";

const CurrenciesPage = () => {
  const {
    defaultCurrency,
    additionalCurrencies,
    additionalColumns,
    existingCodes,
    firstLoad,
    refreshing,
    incompleteCurrencies,
    showSetupNotice,
    handleDismissNotice,
    deleteTarget,
    handleDeleteOpenChange,
    handleDeleted,
  } = useCurrenciesPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Currencies"
      titleProps={{
        description: (
          <>
            Configure what currencies customers will see and be charged in on
            your store.{" "}
            <a
              href={CURRENCIES_LEARN_MORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-blue hover:underline"
            >
              Learn more about currencies
              <ExternalLink className="size-6" />
            </a>
          </>
        ),
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
        descriptionClassName: "text-[1.5rem]! text-text-heading!",
      }}
    >
      <div className="flex flex-col gap-6">
        {showSetupNotice && (
          <CurrencySetupNotice
            currencies={incompleteCurrencies}
            onDismiss={handleDismissNotice}
          />
        )}
        <DefaultCurrencySection currency={defaultCurrency} loading={firstLoad} />
        <AdditionalCurrenciesSection
          currencies={additionalCurrencies}
          columns={additionalColumns}
          existingCodes={existingCodes}
          loading={firstLoad}
          refreshing={refreshing}
        />
        <RelatedSettingsSection />
      </div>

      {deleteTarget && (
        <DeleteCurrencyModal
          currency={deleteTarget}
          open
          onOpenChange={handleDeleteOpenChange}
          onDeleted={handleDeleted}
        />
      )}
    </PageLayout>
  );
};

export default CurrenciesPage;
