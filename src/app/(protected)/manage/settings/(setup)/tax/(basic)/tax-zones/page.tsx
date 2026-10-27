"use client";

import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { cn } from "@/lib/utils";
import DeleteTaxZonesModal from "@/Modals/TaxModals/DeleteTaxZonesModal/DeleteTaxZonesModal";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import BasicTaxSection from "../_components/BasicTaxSection";
import BasicTaxShell from "../_components/BasicTaxShell";
import { ADD_TAX_ZONE_ROUTE } from "../constant";
import useTaxZonesPageContainer from "./container";

// Roomier cells than the Table default, with the first/last columns inset
const ZONES_TABLE_CELLS = cn(
  "[&_th]:h-auto [&_th]:px-4 [&_th]:py-5 [&_td]:px-4 [&_td]:py-5",
  "[&_th:first-child]:pl-6 [&_td:first-child]:pl-6",
  "[&_th:last-child]:pr-6 [&_td:last-child]:pr-6",
);

const TaxZonesPage = () => {
  const {
    shell,
    zones,
    loading,
    columns,
    isZoneSelectable,
    selectedIds,
    selectedZones,
    handleToggleRow,
    handleToggleAll,
    deleteTarget,
    handleDeleteOpenChange,
    handleDeleted,
  } = useTaxZonesPageContainer();

  return (
    <BasicTaxShell {...shell}>
      <BasicTaxSection
        title="Configure tax rates and zones"
        toolbar={
          <div className="mb-4 flex items-center gap-4">
            <Button asChild size="xl" variant="outline">
              <Link href={ADD_TAX_ZONE_ROUTE}>Add a tax zone</Link>
            </Button>
            <DeleteTaxZonesModal
              zones={selectedZones}
              onDeleted={handleDeleted}
              trigger={
                <Button
                  type="button"
                  size="xl"
                  variant="outline"
                  aria-label="Delete selected tax zones"
                  disabled={!selectedZones.length}
                >
                  <Trash2 className="size-6" />
                </Button>
              }
            />
          </div>
        }
      >
        <Table
          data={zones}
          columns={columns}
          getRowId={(zone) => zone.id}
          loading={loading && !zones.length}
          emptyMessage="No tax zones yet."
          selectedIds={selectedIds}
          onToggleRow={handleToggleRow}
          onToggleAll={handleToggleAll}
          selectAllInHeader
          isRowSelectable={isZoneSelectable}
          hideRecordCount
          className="rounded-sm shadow-sm p-0!"
          tableWrapperClassName={ZONES_TABLE_CELLS}
        />
      </BasicTaxSection>

      {deleteTarget && (
        <DeleteTaxZonesModal
          zones={[deleteTarget]}
          open
          onOpenChange={handleDeleteOpenChange}
          onDeleted={handleDeleted}
        />
      )}
    </BasicTaxShell>
  );
};

export default TaxZonesPage;
