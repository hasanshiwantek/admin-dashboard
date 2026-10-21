"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { SETTINGS_ROUTE } from "../constant";
import { ORDER_STATUSES_LEARN_MORE_URL } from "./constant";
import useOrderStatusesContainer from "./container";

const OrderStatusesPage = () => {
  const {
    form,
    rows,
    columns,
    rowActions,
    isEditing,
    isDirty,
    loading,
    saving,
    onSubmit,
    handleEdit,
    handleCancel,
  } = useOrderStatusesContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Order Statuses"
      titleProps={{
        description: (
          <>
            Order statuses can help you decide what actions need to be taken for
            a particular order. Does the order need to be packaged, shipped, or
            refunded? Most order statuses are applied as a result of store user
            or customer action, but some must be manually changed.{" "}
            <Link
              href={ORDER_STATUSES_LEARN_MORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-link hover:underline"
            >
              Learn more
              <ExternalLink className="size-[1.4rem]" />
            </Link>
          </>
        ),
        descriptionClassName: "text-xl! 2xl:text-2xl!",
      }}
    >
      {!isEditing && (
        <Button
          type="button"
          size="xl"
          className="btn-primary mb-6 self-start"
          onClick={handleEdit}
        >
          Edit
        </Button>
      )}
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="relative gap-0 border-0 bg-transparent p-0"
        footer={
          isEditing && {
            submitText: "Save",
            loadingText: "Saving...",
            onCancel: handleCancel,
            loading: saving,
            disabled: !isDirty,
          }
        }
      >
        <Table
          data={rows}
          columns={columns}
          getRowId={(status) => status.id}
          rowActions={rowActions}
          selectable={false}
          hideRecordCount
          className={cn(loading && LOADING_DIM_CLASS, "p-0")}
        />
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default OrderStatusesPage;
