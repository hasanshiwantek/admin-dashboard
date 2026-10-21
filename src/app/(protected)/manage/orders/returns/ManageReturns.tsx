"use client";

import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table/Table";
import { IoFilterOutline } from "react-icons/io5";
import { X } from "lucide-react";
import useReturnsContainer from "./useReturnsContainer";
import { renderExpandedRow } from "./ReturnExpandedRow"; // ← add this
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
const TOOLBAR_CONTROL = "h-14! py-4! my-0!";

const TABS = [{ id: "all", label: "All returns" }];

const ManageReturns = () => {
  const {
    data,
    loading,
    keyword,
    setKeyword,
    expandedRow,
    toggleRow,
    selectedIds,
    handleSelectOne,
    handleSelectAll,
    columns,
  } = useReturnsContainer();

  const topActions = (
    <div className="flex flex-wrap gap-3 items-center mb-2">
      <div className="flex items-center gap-0">
        <div className="relative">
          <Input
            className={`${TOOLBAR_CONTROL} pr-10 rounded-r-none`}
            placeholder="Filter by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <Button
              type="button"
              onClick={() => setKeyword("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </Button>
          )}
        </div>
        <Button
          type="button"
          className={`btn-outline-primary ${TOOLBAR_CONTROL} rounded-l-none`}
        >
          <IoFilterOutline />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-store-bg min-h-screen mt-20">
      <div className="mb-6 px-4">
        <PageTitle title="View Return Requests" hideActionButton />
      </div>

      <div className="bg-white p-4 shadow-sm">
        {topActions}
        <Table
          bare
          data={data}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          emptyMessage="No return requests found."
          selectAllInHeader
          hideRecordCount
          selectable={false}
          onToggleRow={(id, checked) => handleSelectOne(Number(id), checked)}
          onToggleAll={handleSelectAll}
          renderExpandedRow={renderExpandedRow}
          isRowExpanded={(row) => expandedRow === row?.id}
        />
      </div>
    </div>
  );
};

export default ManageReturns;
