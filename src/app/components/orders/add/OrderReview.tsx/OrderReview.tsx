"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Added Checkbox component
import { resetCoupon } from "@/redux/slices/orderSlice";
import {
  // Added Select components
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useState } from "react";
import { applyCoupon } from "@/redux/slices/orderSlice";

// Utility arrays for Select options
const cardTypes = ["Visa", "Mastercard", "American Express", "Discover"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

export default function OrderReview({ step, setStep }: any) {
  const { watch, register, setValue, getValues } = useFormContext();
  const dispatch = useAppDispatch();
  const { appliedCoupon, loading } = useAppSelector(
    (state: any) => state.order,
  );
  const [couponCode, setCouponCode] = useState(watch("couponCode") || "");
  const [manualDiscountInput, setManualDiscountInput] = useState(
    watch("manualDiscount") ? String(watch("manualDiscount")) : ""
  );
  const shipping = watch("shipping");
  const billing = watch();
  const selectedProducts = watch("selectedProducts") || [];
  const paymentMethod = watch("paymentMethod");
  const subtotal = selectedProducts.reduce(
    (sum: number, p: any) => sum + parseFloat(p.price || 0) * (p.quantity || 1),
    0
  );
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      return;
    }
    await dispatch(applyCoupon(couponCode.trim()));
    setCouponCode("")
  };
  const handleRemoveCoupon = () => {
    dispatch(resetCoupon());
    setCouponCode("");
    setValue("couponCode", "");
    setValue("coupon", null);
    setValue("discountAmount", 0);
  };
  const shippingCost = Number(watch("shippingMethod.total_charge") || 0);
  const manualDiscount = Number(watch("manualDiscount") || 0);
  const couponDiscount = Number(
    appliedCoupon?.discountAmount || 0
  );
  const totalDiscount = couponDiscount + manualDiscount;

  const productsSubtotal = selectedProducts?.reduce(
    (sum: number, p: any) =>
      sum + Number(p?.price || 0) * Number(p?.quantity || 1),
    0
  );
  // const total = subtotal + shippingCost;
  const grandTotal = Math.max(
    subtotal - couponDiscount - manualDiscount + shippingCost,
    0
  );

  const shippingDestinations = watch("shippingDestinations") || [];
  const destinationType = watch("destinationType"); // "billing" | "single" | "multiple"
  const isMultiple = destinationType === "multiple" || shippingDestinations.length > 0;
  const handleApplyManualDiscount = () => {
    const amount = Math.max(Number(manualDiscountInput) || 0, 0);
    setValue("manualDiscount", amount, { shouldDirty: true });
  };

  // Function to render specific payment fields based on the selected method
  const renderPaymentFields = () => {
    const customerEmail = billing.email || billing?.selectedCustomer?.email || "customer@example.com"; // Use the actual email from the form data

    switch (paymentMethod) {
      case "stripe":
      case "credit_card": // Assuming "card" also uses the credit card form like Stripe
        return (
          <div className="space-y-4">
            {/* Payment Method Dropdown (already handled outside, but shown in image) */}
            <Label htmlFor="stripeCardType">Card Type:</Label>
            <Select
              defaultValue="American Express"
              onValueChange={(val) => setValue("cardType", val)}
            >
              <SelectTrigger id="stripeCardType">
                <SelectValue placeholder="Select Card Type" />
              </SelectTrigger>
              <SelectContent>
                {cardTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="cardholderName">Cardholder's Name:</Label>
            <Input
              id="cardholderName"
              placeholder=""
              {...register("cardholderName")}
            />

            <Label htmlFor="creditCardNo">Credit Card No:</Label>
            <Input
              id="creditCardNo"
              placeholder=""
              {...register("creditCardNo")}
            />

            <Label htmlFor="ccv2Value">CCV2 Value:</Label>
            <Input
              id="ccv2Value"
              placeholder=""
              {...register("ccv2Value")}
              className="max-w-xs"
            />

            <div className="flex gap-4 items-center">
              <div className="flex-1 items-center">
                <Label htmlFor="expirationMonth">Expiration Date:</Label>
                <Select
                  defaultValue={months[0]}
                  onValueChange={(val) => setValue("expirationMonth", val)}
                >
                  <SelectTrigger id="expirationMonth">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 mt-9">
                <Select
                  defaultValue={currentYear.toString()}
                  onValueChange={(val) => setValue("expirationYear", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="emailInvoice" defaultChecked />
              <Label
                htmlFor="emailInvoice"
                className=""
              >
                Email invoice to customer
                <span className="ml-1 ">
                  ({customerEmail})
                </span>
              </Label>
            </div>
          </div>
        );

      case "cash":
      case "bank": // Assuming "bank" also uses the manual payment form like "cash"
        return (
          <div className="space-y-4">
            <Label htmlFor="paymentDescription">Description:</Label>
            <Input
              id="paymentDescription"
              placeholder=""
              {...register("paymentDescription")}
            />
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="emailInvoiceManual" defaultChecked />
              <label
                htmlFor="emailInvoiceManual"
                className=""
              >
                Email invoice to customer
                <span className="ml-1 ">
                  ({customerEmail})
                </span>
              </label>
            </div>
          </div>
        );

      default: // For other methods like "Create draft order" or if no method is selected
        // Based on the image showing "Create draft order" with no extra fields
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              No further payment details are required for the selected method.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className=" flex justify-between gap-5 ">
        <div className="max-w-6xl space-y-6">
          <h1 className="!text-4xl !font-bold">Customer billing details</h1>

          {/* Billing */}
          <div className="border rounded-md p-4 bg-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-sm">Billing to:</h2>
              <button
                type="button"
                className="text-blue-600 text-xl hover:underline"
                onClick={() => setStep(step - 3)}
              >
                Change
              </button>
            </div>

            <div className=" grid grid-cols-[150px_1fr] gap-y-2 text-[14px]">
              <div className="font-medium">Name</div>
              <div>
                {billing.billingFirstName} {billing.billingLastName}
              </div>

              <div className="font-medium">Address</div>
              <div>{billing.billingAddress1}</div>

              <div className="font-medium">Suburb/City</div>
              <div>{billing.billingCity}</div>

              <div className="font-medium">State/Province</div>
              <div>{billing.billingState}</div>

              <div className="font-medium">Country</div>
              <div>{billing.billingCountry}</div>

              <div className="font-medium">ZIP/Postcode</div>
              <div>{billing.billingZip}</div>
            </div>
          </div>

          <h1 className="!text-4xl !font-bold">
            Fulfillment details: items 1 - {selectedProducts.length} of
            {selectedProducts.length}
          </h1>
          {/* Shipping */}
          {isMultiple ? (
            // ✅ Multiple addresses — show each destination
            shippingDestinations.map((dest: any, idx: number) => (
              <div key={idx} className="border rounded-md p-5 bg-white space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-semibold text-sm">
                    Shipping to: ({idx + 1} of {shippingDestinations.length})
                  </h2>
                  <button
                    type="button"
                    className="text-blue-600 text-xl hover:underline"
                    onClick={() => setStep(step - 1)}
                  >
                    Change
                  </button>
                </div>

                <div className="text-[14px] grid grid-cols-[150px_1fr] gap-y-2">
                  <div className="font-medium">Name</div>
                  <div>{dest.address?.firstName} {dest.address?.lastName}</div>

                  <div className="font-medium">Address</div>
                  <div>{dest.address?.address1}</div>

                  <div className="font-medium">Suburb/City</div>
                  <div>{dest.address?.city}</div>

                  <div className="font-medium">State/Province</div>
                  <div>{dest.address?.state}</div>

                  <div className="font-medium">Country</div>
                  <div>{dest.address?.country}</div>

                  <div className="font-medium">ZIP/Postcode</div>
                  <div>{dest.address?.zip}</div>

                  <div className="font-medium">Shipping method</div>
                  <div>{dest.address?.shippingMethod?.provider ?? "None"}</div>

                  <div className="font-medium">Shipping cost</div>
                  <div>$0.00</div>
                </div>

                {/* Products for this destination */}
                <div className="border mt-4 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Products</TableHead>
                        <TableHead>
                          Products shipped to {dest.address?.address1}, {dest.address?.city},{" "}
                          {dest.address?.zip}, {dest.address?.country}
                        </TableHead>
                        <TableHead className="text-center w-12">Qty</TableHead>
                        <TableHead className="text-center w-24">Price</TableHead>
                        <TableHead className="text-center w-24">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dest.products?.map((p: any, pidx: number) => {
                        const quantity = p.quantity || 1;
                        const price = parseFloat(p.price || 0);
                        const total = (price * quantity).toFixed(2);
                        const imagePath = p.image?.[1]?.path || p.image?.[0]?.path;

                        return (
                          <TableRow key={pidx}>
                            <TableCell className="align-top">
                              {imagePath && (
                                <Image
                                  src={imagePath}
                                  alt={p.name}
                                  width={70}
                                  height={70}
                                  className="border rounded-md object-contain"
                                />
                              )}
                            </TableCell>
                            <TableCell className="align-top whitespace-normal">
                              <div className="font-medium">{p.name}</div>
                              <div className="text-base">{p.sku}</div>
                            </TableCell>
                            <TableCell className="text-center align-top">{quantity}</TableCell>
                            <TableCell className="text-center align-top">${price.toFixed(2)}</TableCell>
                            <TableCell className="text-center align-top">${total}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))
          ) : (
            <div className="border rounded-md p-5 bg-white space-y-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-semibold text-sm">Shipping to:</h2>
                <button
                  type="button"
                  className="text-blue-600 text-xl hover:underline"
                  onClick={() => setStep(step - 1)}
                >
                  Change
                </button>
              </div>
              <div className="text-[14px] grid grid-cols-[150px_1fr] gap-y-2">
                <div className="font-medium">Name</div>
                <div>
                  {shipping?.firstName} {shipping?.lastName}
                </div>

                <div className="font-medium">Address</div>
                <div>{shipping?.address1}</div>

                <div className="font-medium">Suburb/City</div>
                <div>{shipping?.city}</div>

                <div className="font-medium">State/Province</div>
                <div>{shipping?.state}</div>

                <div className="font-medium">Country</div>
                <div>{shipping?.country}</div>

                <div className="font-medium">ZIP/Postcode</div>
                <div>{shipping?.zip}</div>

                {billing?.shippingMethod?.display_name && <>
                  <div className="font-medium">Shipping method</div>
                  <div>{billing?.shippingMethod?.display_name} {`${billing?.shippingMethod?.total_charge ? `: $${billing?.shippingMethod?.total_charge}` : <></>} `}</div>
                </>}
              </div>

              {/* Product Table */}
              <div className="border mt-4 rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Products</TableHead>
                      <TableHead>
                        Products shipped to {shipping?.address1}, {shipping?.city}
                        , {shipping?.zip}, {shipping?.country}
                      </TableHead>
                      <TableHead className="text-center w-12">Qty</TableHead>
                      <TableHead className="text-center w-24">Price</TableHead>
                      <TableHead className="text-center w-24">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* {selectedProducts.map((p: any, idx: number) => {
                      const quantity = p.quantity || 1;
                      const price = parseFloat(p.price || 0);
                      const total = (price * quantity).toFixed(2);
                      const imagePath = p.image?.[1]?.path || p.image?.[0]?.path;

                      return (
                        <TableRow key={idx}>
                          <TableCell className="align-top">
                            <Image
                              src={imagePath}
                              alt={p.name}
                              width={70}
                              height={70}
                              className="border rounded-md object-contain"
                            />
                          </TableCell>
                          <TableCell className="align-top whitespace-normal text-ellipsis">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-base">{p.sku}</div>
                          </TableCell>
                          <TableCell className="text-center align-top">
                            {quantity}
                          </TableCell>
                          <TableCell className="text-center align-top">
                            ${price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center align-top">
                            ${total}
                          </TableCell>
                        </TableRow>
                      );
                    })} */}
                    {selectedProducts.map((p: any, idx: number) => {
                      const quantity = Number(p.quantity || 1);
                      const price = Number(p.price || 0);
                      const originalTotal = price * quantity;
                      const share =
                        productsSubtotal > 0 ? originalTotal / productsSubtotal : 0;
                      const lineDiscount = totalDiscount * share;
                      const discountedTotal = Math.max(originalTotal - lineDiscount, 0);
                      const discountedPrice = quantity > 0 ? discountedTotal / quantity : 0;
                      const hasDiscount = lineDiscount > 0.009;
                      const imagePath = p.image?.[1]?.path || p.image?.[0]?.path;
                      return (
                        <TableRow key={idx}>
                          <TableCell className="align-top">
                            {imagePath ? (
                              <Image
                                src={imagePath}
                                alt={p.name}
                                width={70}
                                height={70}
                                className="border rounded-md object-contain"
                              />
                            ) : (
                              <div className="w-[70px] h-[70px] border rounded-md bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 text-center px-1">
                                Image
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-base text-gray-500">{p.sku}</div>
                          </TableCell>
                          <TableCell className="text-center align-top">{quantity}</TableCell>
                          <TableCell className="text-center align-top">
                            {hasDiscount && (
                              <div className="text-gray-400 line-through">
                                ${price.toFixed(2)}
                              </div>
                            )}
                            <div className={hasDiscount ? "font-medium" : ""}>
                              ${discountedPrice.toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell className="text-center align-top">
                            {hasDiscount && (
                              <div className="text-gray-400 line-through">
                                ${originalTotal.toFixed(2)}
                              </div>
                            )}
                            <div className={hasDiscount ? "font-medium" : ""}>
                              ${discountedTotal.toFixed(2)}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>)}

          {/* Comments */}
          <h1 className="!text-4xl !font-bold">Comments and notes</h1>
          <div className="border p-5 rounded-md bg-white">
            <div className="flex flex-col gap-5 space-y-6">
              <div>
                <Label htmlFor="customerComments" className="mb-1 block">
                  Comments (optional)
                </Label>
                <Textarea
                  id="customerComments"
                  {...register("customerComments")}
                  placeholder="Visible to customer"
                />
              </div>
              <div>
                <Label htmlFor="staffNotes" className=" mb-1 block">
                  Staff notes (optional)
                </Label>
                <Textarea
                  id="staffNotes"
                  {...register("staffNotes")}
                  placeholder="Not visible to customer"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Payment + Summary */}
          <div className="flex flex-col  justify-between gap-6 ">
            {/* Payment */}
            <h1 className="!text-4xl !font-bold">Payment</h1>

            <div className=" border p-5 rounded-md bg-white">
              <Select
                value={paymentMethod}
                onValueChange={(val) => setValue("paymentMethod", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Manual payment</SelectItem>{" "}
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>{" "}
                </SelectContent>
              </Select>

              {/* Conditional Payment Fields */}
              <div className="mt-4">{renderPaymentFields()}</div>
            </div>

            {/* Summary */}
            <h1 className="!text-4xl !font-bold">Summary</h1>
            <div className=" border p-5 rounded-md bg-white space-y-6 text-lg">
              <div className="flex justify-between border-b pb-1">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {billing?.shippingMethod?.total_charge ? (
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${billing?.shippingMethod?.total_charge}</span>
                </div>
              ) : <></>}
              {appliedCoupon && (
                <div className="flex justify-between items-start">
                  <div>
                    <div>
                      Coupon ({appliedCoupon.couponCode})
                    </div>
                    <button
                      type="button"
                      className="text-blue-600 text-sm underline"
                      onClick={handleRemoveCoupon}
                    >
                      (remove)
                    </button>
                  </div>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
              )}
              {manualDiscount > 0 && (
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-${manualDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold">
                <span>Grand total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>


              {/* Discount input */}
              <div className="flex items-center gap-2">
                <Input onChange={(e) => setManualDiscountInput(e.target.value)} placeholder="Manual discount" className="text-sm" />
                <Button onClick={handleApplyManualDiscount} type="button" className="btn-outline-primary">
                  Apply
                </Button>
              </div>
              {/* Gift/coupon */}
              <div className="flex items-center gap-2">
                <Input
                  value={couponCode}
                  placeholder="Coupon or gift certificate"
                  className="text-sm"
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                  }}
                />
                <Button onClick={handleApplyCoupon} type="button" className="btn-outline-primary">
                  {loading ? "Loading.." : "Apply"}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
