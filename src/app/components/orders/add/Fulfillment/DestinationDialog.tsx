"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { countriesList } from "@/const/location";
import ShippingMethod from "./ShippingMethod";
export default function DestinationDialog({
  open,
  setOpen,
  selectedProducts,
  onAllocate,
}: any) {
  const { register, setValue, watch, getValues } = useFormContext();
  const selectedCustomer = watch("selectedCustomer");
  // Scoped form section for destination fields
  const destinationForm = watch("destinationForm") || {};
  const country = destinationForm.country || "";
  const handleAllocateClick = () => {
    const data = getValues("destinationForm");
    onAllocate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Destination</DialogTitle>
        </DialogHeader>

        {/* Top: Selected Products Table */}
        <div className="border rounded-md mb-6">
          <Table>
            <TableHeader className="bg-muted h-12">
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.map((p: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Form & Customer Box */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left - Address Form */}
          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                {...register("destinationForm.firstName")}
                id="firstName"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                {...register("destinationForm.lastName")}
                id="lastName"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                {...register("destinationForm.companyName")}
                id="companyName"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                {...register("destinationForm.phoneNumber")}
                id="phoneNumber"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address1">Address Line 1</Label>
              <Input
                {...register("destinationForm.address1")}
                id="address1"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address2">Address Line 2</Label>
              <Input
                {...register("destinationForm.address2")}
                id="address2"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                {...register("destinationForm.city")}
                id="city"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={country}
                onValueChange={(value) =>
                  setValue("destinationForm.country", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent>
                  {countriesList.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                {...register("destinationForm.state")}
                id="state"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zip">Zip/Postcode</Label>
              <Input
                {...register("destinationForm.zip")}
                id="zip"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="saveAddress"
                {...register("destinationForm.saveAddress")}
                defaultChecked
              />
              <Label htmlFor="saveAddress">
                Save to customer’s address book
              </Label>
            </div>

            <div>
              <ShippingMethod />
            </div>
          </div>

          {/* Right - Selected Customer Box */}
          <div>
            {selectedCustomer && (
              <div className="w-full text-center border p-4 bg-gray-100 rounded-md flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-2xl">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </div>
                  <div className="text-gray-800 text-xl">
                    {selectedCustomer.email}
                  </div>
                  {selectedCustomer.phone && (
                    <div className="text-gray-800 text-xl">
                      {selectedCustomer.phone}
                    </div>
                  )}
                  {selectedCustomer.companyName && (
                    <div className="text-gray-800 text-xl">
                      {selectedCustomer.companyName}
                    </div>
                  )}
                  {selectedCustomer.address && (
                    <div className="text-gray-800 text-xl">
                      {selectedCustomer.address}
                    </div>
                  )}
                  {selectedCustomer.state && (
                    <div className="text-gray-800 text-xl">
                      {selectedCustomer.state}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-primary mt-4"
                  onClick={() => {
                    setValue(
                      "destinationForm.firstName",
                      selectedCustomer.firstName
                    );
                    setValue(
                      "destinationForm.lastName",
                      selectedCustomer.lastName
                    );
                    setValue(
                      "destinationForm.companyName",
                      selectedCustomer.companyName || ""
                    );
                    setValue(
                      "destinationForm.phoneNumber",
                      selectedCustomer.phone || ""
                    );
                    setValue(
                      "destinationForm.address1",
                      selectedCustomer.address || ""
                    );
                    setValue(
                      "destinationForm.city",
                      selectedCustomer.city || ""
                    );
                    setValue(
                      "destinationForm.state",
                      selectedCustomer.state || ""
                    );
                    setValue("destinationForm.zip", selectedCustomer.zip || "");
                    setValue(
                      "destinationForm.country",
                      selectedCustomer.country || ""
                    );
                  }}
                >
                  Use this address
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
            <button
              className="btn-outline-primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button className="btn-primary" onClick={handleAllocateClick}>
              Allocate Products
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
