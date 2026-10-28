import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { cn } from "@/lib/utils";
import AddCurrencyModal from "@/Modals/CurrencyModals/AddCurrencyModal/AddCurrencyModal";
import Link from "next/link";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { PAYMENT_ROUTE } from "../../payment/constant";
import { AdditionalCurrenciesSectionProps } from "./type";

const AdditionalCurrenciesSection = ({
  currencies,
  columns,
  existingCodes,
  loading,
  refreshing,
}: AdditionalCurrenciesSectionProps) => (
  <SettingsCard
    title="Additional Currencies"
    description={
      <>
        To allow customers to pay in a different currency, you will need to set
        up a payment provider for it (Stripe, PayPal by Braintree and{" "}
        <Link
          href={PAYMENT_ROUTE}
          className="text-primary-blue hover:underline"
        >
          more
        </Link>
        ).
      </>
    }
    className="border-0 shadow-sm"
    action={
      <AddCurrencyModal
        existingCodes={existingCodes}
        trigger={
          <Button type="button" size="xl" className="text-2xl">
            Add new currency
          </Button>
        }
      />
    }
  >
    <div className="relative">
      <Table
        data={currencies}
        columns={columns}
        getRowId={(currency) => currency.id}
        loading={loading}
        emptyMessage="No additional currencies yet."
        selectable={false}
        hideRecordCount
        bare
        className={cn(refreshing && LOADING_DIM_CLASS)}
      />
      {refreshing && <LoadingOverlay text="Updating..." />}
    </div>
  </SettingsCard>
);

export default AdditionalCurrenciesSection;
