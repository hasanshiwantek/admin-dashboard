import { ColumnDef } from "@/components/ui/Table/types";
import { Check, X, Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { CouponColumnsProps } from "../types";
import ActionButton from "@/components/ActionButton/ActionButton";
import { couponActions } from "../constant";
import { ActionEnums } from "@/const/appConstants";


export default function CouponColumns({
  goToEditPage,
  handleToggleEnabled,
  handleDeleteCoupon,
  deletingId,
}: CouponColumnsProps): ColumnDef<any>[] {
  return [
    {
      key: "couponName",
      header: "Coupon name",
      width: "200px",
      sortable: true,
      render: (coupon) => (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => goToEditPage(coupon.id)}
        >
          {coupon.couponName}
        </span>
      ),
    },
    {
      key: "couponCode",
      header: "Coupon code",
      width: "150px",
      sortable: true,
    },
    {
      key: "discount",
      header: "Discount",
      width: "220px",
      render: (coupon) =>
        `$${coupon.discountAmount} off the order total`,
    },
    {
      key: "expiration",
      header: "Expiration",
      width: "150px",
      render: (coupon) => coupon.expiration || "No expiration",
    },
    {
      key: "enabled",
      header: "Enabled",
      width: "100px",
      render: (coupon) =>
        coupon.enabled ? (
          <Check
            className="text-green-500 w-8 h-8 cursor-pointer"
            onClick={() => handleToggleEnabled(coupon)}
          />
        ) : (
          <X
            className="text-red-500 w-8 h-8 cursor-pointer"
            onClick={() => handleToggleEnabled(coupon)}
          />
        ),
    },
   {
  key: "actions",
  header: "Action",
  width: "80px",
  render: (coupon) => (
    <ActionButton
      data={coupon}
      actions={couponActions}
      onAction={(item) => (action) => {
        if (action === ActionEnums.EDIT) {
          goToEditPage(item.id);
        } else if (action === ActionEnums.DELETE) {
          handleDeleteCoupon(item.id);
        } else if (action === ActionEnums.COPY) {
          // copy logic
        } else if (action === ActionEnums.VIEW) {
          
        }
      }}
      contentClassName="w-[160px]"
      triggerProps={{
        disabled: deletingId === coupon.id,
      }}
    />
  ),
},
  ];
}