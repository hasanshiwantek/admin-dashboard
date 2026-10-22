"use client";

import PageLayout from "@/components/ui/PageLayout";
import { SETTINGS_ROUTE } from "../../(products)/constant";
import StoreTaxSettingsSection from "./_components/StoreTaxSettingsSection";
import TaxRulesSection from "./_components/TaxRulesSection";
import useTaxPageContainer from "./container";

const TaxPage = () => {
  const { basicTaxEnabled, basicTaxStats, storeTaxSettings } =
    useTaxPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Tax"
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
    >
      <div className="flex flex-col gap-8">
        <TaxRulesSection
          basicTaxEnabled={basicTaxEnabled}
          stats={basicTaxStats}
        />
        <StoreTaxSettingsSection settings={storeTaxSettings} />
      </div>
    </PageLayout>
  );
};

export default TaxPage;
