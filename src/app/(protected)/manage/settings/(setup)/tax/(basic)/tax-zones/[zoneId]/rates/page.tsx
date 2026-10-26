"use client";

import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { cn } from "@/lib/utils";
import DeleteTaxRatesModal from "@/Modals/TaxModals/DeleteTaxRatesModal/DeleteTaxRatesModal";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import SettingsNotice from "../../../../../../_components/SettingsNotice";
import TaxZoneShell from "../../_components/TaxZoneShell";
import useTaxRatesPageContainer from "./container";

const RATES_TABLE_CELLS = cn(
  "[&_th]:h-auto [&_th]:px-4 [&_th]:py-5 [&_td]:px-4 [&_td]:py-5 [&_td]:align-top",
  "[&_th:first-child]:pl-6 [&_td:first-child]:pl-6",
  "[&_th:last-child]:pr-6 [&_td:last-child]:pr-6",
);

const TaxRatesPage = () => {
  const {
    shell,
    rates,
    loading,
    addRateRoute,
    columns,
    selectedIds,
    selectedRates,
    handleToggleRow,
    handleToggleAll,
    deleteTarget,
    handleDeleteOpenChange,
    handleDeleted,
  } = useTaxRatesPageContainer();

  return (
    <TaxZoneShell {...shell}>
      <div className="flex flex-col gap-6">
        <p className="text-[1.4rem]! text-muted-plum-gray!">
          Add a new tax rate to this zone or edit an existing one.
        </p>

        {!rates.length && (
          <div className="w-fit shadow-sm">
            <SettingsNotice tone="warning">
              No tax rates have been created for this tax zone. Please click
              &apos;Add a tax rate&apos; to create a new tax rate.
            </SettingsNotice>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="xl">
            <Link href={addRateRoute}>Add a tax rate</Link>
          </Button>
          <DeleteTaxRatesModal
            rates={selectedRates}
            onDeleted={handleDeleted}
            trigger={
              <Button
                type="button"
                variant="outline"
                size="xl"
                aria-label="Delete selected tax rates"
                disabled={!selectedRates.length}
              >
                <Trash2 className="size-6" />
              </Button>
            }
          />
        </div>

        {rates.length > 0 && (
          <Table
            data={rates}
            columns={columns}
            getRowId={(rate) => rate.id}
            loading={loading && !rates.length}
            selectedIds={selectedIds}
            onToggleRow={handleToggleRow}
            onToggleAll={handleToggleAll}
            selectAllInHeader
            hideRecordCount
            className="mt-4 rounded-sm p-0! shadow-sm"
            tableWrapperClassName={RATES_TABLE_CELLS}
          />
        )}
      </div>

      {deleteTarget && (
        <DeleteTaxRatesModal
          rates={[deleteTarget]}
          open
          onOpenChange={handleDeleteOpenChange}
          onDeleted={handleDeleted}
        />
      )}
    </TaxZoneShell>
  );
};

export default TaxRatesPage;
