"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Added Checkbox component
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

export default function OrderReview() {
  const { watch, register, setValue, getValues } = useFormContext();
  const shipping = watch("shipping");
  const allValues = getValues();
  console.log("FINAL STEP 4 Values✅✅", allValues);

  console.log("Shipping Details from step 4: ", shipping);

  const billing = watch();
  console.log("Billing Details from step 4: ", billing);
  const selectedProducts = watch("selectedProducts") || [];
  const paymentMethod = watch("paymentMethod");
  const subtotal = selectedProducts.reduce(
    (sum: number, p: any) => sum + parseFloat(p.price || 0),
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  // Function to render specific payment fields based on the selected method
  const renderPaymentFields = () => {
    const customerEmail = billing.email || "customer@example.com"; // Use the actual email from the form data

    switch (paymentMethod) {
      case "stripe":
      case "card": // Assuming "card" also uses the credit card form like Stripe
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
              >
                Change
              </button>
            </div>

            <div className=" grid grid-cols-[150px_1fr] gap-y-2 text-[14px]">
              <div className="font-medium">Name</div>
              <div>
                {billing.firstName} {billing.lastName}
              </div>

              <div className="font-medium">Address</div>
              <div>{billing.address1}</div>

              <div className="font-medium">Suburb/City</div>
              <div>{billing.city}</div>

              <div className="font-medium">State/Province</div>
              <div>{billing.state}</div>

              <div className="font-medium">Country</div>
              <div>{billing.country}</div>

              <div className="font-medium">ZIP/Postcode</div>
              <div>{billing.zip}</div>
            </div>
          </div>

          <h1 className="!text-4xl !font-bold">
            Fulfillment details: items 1 - {selectedProducts.length} of
            {selectedProducts.length}
          </h1>
          {/* Shipping */}
          <div className="border rounded-md p-5 bg-white space-y-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-sm">Shipping to:</h2>
              <button
                type="button"
                className="text-blue-600 text-xl hover:underline"
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

              <div className="font-medium">Shipping method</div>
              <div>{billing?.shippingMethod?.provider ?? "None"}</div>

              <div className="font-medium">Shipping cost</div>
              <div>£0.00</div>
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
                  {selectedProducts.map((p: any, idx: number) => {
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
                          £{price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center align-top">
                          £{total}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

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
                  {/* Renamed for image clarity */}
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>{" "}
                  {/* Grouped with manual payment for field display */}
                  <SelectItem value="card">Credit Card</SelectItem>{" "}
                  {/* Grouped with Stripe for field display */}
                  <SelectItem value="draft">Create draft order</SelectItem>{" "}
                  {/* Added option for draft order */}
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
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Shipping</span>
                <span>£{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand total</span>
                <span>£{total.toFixed(2)}</span>
              </div>

              {/* Discount input */}
              <div className="flex items-center gap-2">
                <Input placeholder="Manual discount" className="text-sm" />
                <Button type="button" className="btn-outline-primary">
                  Apply
                </Button>
              </div>

              {/* Gift/coupon */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Coupon or gift certificate"
                  className="text-sm"
                />
                <Button type="button" className="btn-outline-primary">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
