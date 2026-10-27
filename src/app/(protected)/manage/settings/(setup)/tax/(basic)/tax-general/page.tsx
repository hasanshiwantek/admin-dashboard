"use client";

import { Button } from "@/components/ui/Button";
import ResetBasicTaxModal from "@/Modals/TaxModals/ResetBasicTaxModal/ResetBasicTaxModal";
import Link from "next/link";
import SettingsCard from "../../../../_components/SettingsCard";
import { STORE_TAX_SETTINGS_ROUTE } from "../../constant";
import BasicTaxSection from "../_components/BasicTaxSection";
import BasicTaxShell from "../_components/BasicTaxShell";
import { BASIC_TAX_SETUP_URL } from "../constant";
import useBasicTaxGeneralPageContainer from "./container";

const BODY_TEXT = "text-[1.4rem]! leading-relaxed text-text-heading!";
const LINK = "text-primary-blue hover:underline";

const BasicTaxGeneralPage = () => {
  const { shell, handleReset } = useBasicTaxGeneralPageContainer();

  return (
    <BasicTaxShell {...shell}>
      <div className="flex flex-col gap-10">
        <BasicTaxSection title="Tax setup">
          <SettingsCard
            title="Basic Tax"
            titleClassName="text-[2rem]! font-semibold! text-text-heading!"
            className="border-0 shadow-sm"
          >
            <p className={BODY_TEXT}>
              When Basic Tax is enabled, the tax classes, rates and zones
              configured here will be used for the sales tax calculations on
              your store. For everything you need to know about setting up
              Basic Tax, please see{" "}
              <a
                href={BASIC_TAX_SETUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Basic Tax Setup
              </a>
              .
            </p>
            <p className={BODY_TEXT}>
              Basic Tax can also be used as Fallback Tax if your enabled
              Automatic Tax provider is unreachable when a sales tax calculation
              is requested. Set up your Fallback Tax settings on the{" "}
              <Link href={STORE_TAX_SETTINGS_ROUTE} className={LINK}>
                Configure Tax Options
              </Link>{" "}
              page.
            </p>
          </SettingsCard>
        </BasicTaxSection>

        <BasicTaxSection title="Reset basic tax configuration">
          <SettingsCard className="flex-row items-center justify-between border-0 shadow-sm p-14!">
            <p className={BODY_TEXT}>
              This will clear and reset your basic tax configuration to default
              values.
            </p>
            <ResetBasicTaxModal
              onReset={handleReset}
              trigger={
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 border-error-msg text-error-msg hover:bg-error-msg/5 hover:text-error-msg"
                >
                  Reset configuration
                </Button>
              }
            />
          </SettingsCard>
        </BasicTaxSection>
      </div>
    </BasicTaxShell>
  );
};

export default BasicTaxGeneralPage;
