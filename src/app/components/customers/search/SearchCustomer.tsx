"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { advanceCustomerSearch } from "@/redux/slices/customerSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
const SearchCustomer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Advanced Search
    searchKeywords: '',
    startsWith: "",
    phone: "",
    country: "",
    stateProvince: "",

    // Range Search
    customerIdFrom: "",
    customerIdTo: "",
    ordersFrom: "",
    ordersTo: "",
    creditFrom: "",
    creditTo: "",

    // Date Search
    dateJoined: "",

    // Group Search
    customerGroup: "",

    // Sort Order
    sortBy: "",
    sortOrder: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        const isEmpty =
          value === "" || value === null || value === undefined || isEmptyArray;

        const alwaysInclude = ["page", "pageSize"];
        if (!isEmpty || alwaysInclude.includes(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    try {
      const result = await dispatch(
        advanceCustomerSearch({ data: filteredData })
      );

      if (advanceCustomerSearch.fulfilled.match(result)) {
        // ✅ Push ALL filters to URL — not just page & limit
        const queryParams = new URLSearchParams();
        Object.entries(filteredData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v));
          } else {
            queryParams.set(key, String(value));
          }
        });

        router.push(`/manage/customers?${queryParams.toString()}`);
      } else {
        console.error("❌ Search Failed:", result.error);
      }
    } catch (error) {
      console.error("🔥 Unexpected Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-10">
          <h1 className="!font-light my-4">Search customers</h1>
          <div>
            <div className="p-6 bg-muted/40">
              <h1 className="!font-semibold my-6">
                Advanced search (optional)
              </h1>
              <div className="bg-white p-6 border rounded-md space-y-7">
                <TooltipProvider>
                  {/* Search Keywords */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="searchKeywords">Search keywords</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Search across customer name, email, or tags.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="searchKeywords"
                      name="searchKeywords"
                      value={formData?.searchKeywords || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Starts With */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="startsWith">Starts with</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Filter customers whose name starts with this value.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="startsWith"
                      name="startsWith"
                      value={formData?.startsWith || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData?.phone || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      name="country"
                      value={formData?.country || ""}
                      onValueChange={(value) =>
                        handleChange({ target: { name: "country", value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="-- Choose a country --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State / Province */}
                  <div className="space-y-1">
                    <Label htmlFor="stateProvince">State/Province</Label>
                    <Input
                      id="stateProvince"
                      name="stateProvince"
                      value={formData?.stateProvince || ""}
                      onChange={handleChange}
                    />
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className=" p-6 bg-muted/40">
            <h1 className="!font-semibold mb-4">Search by range (optional)</h1>

            <div className="bg-white p-6 border rounded-md space-y-6 ">
              {/* Customer ID */}
              <div>
                <Label className="block mb-2">Customer ID</Label>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <Input
                    placeholder="From"
                    name="customerIdFrom"
                    value={formData?.customerIdFrom || ""}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="To"
                    name="customerIdTo"
                    value={formData?.customerIdTo || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Number of Orders */}
              <div>
                <Label className="block mb-2">Number of orders</Label>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <Input
                    placeholder="From"
                    name="ordersFrom"
                    value={formData?.ordersFrom || ""}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="To"
                    name="ordersTo"
                    value={formData?.ordersTo || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Store Credit */}
              <div>
                <Label className="block mb-2">Store credit</Label>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <Input
                    placeholder="From $"
                    name="creditFrom"
                    value={formData?.creditFrom || ""}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="To $"
                    name="creditTo"
                    value={formData?.creditTo || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/40 space-y-10">
            {/* Search by Date */}
            <div>
              <h1 className="!font-semibold mb-4">Search by date (optional)</h1>
              <div className="bg-white p-6 border rounded-md ">
                <div className="space-y-1">
                  <Label>Date joined</Label>
                  <Select
                    name="dateJoined"
                    value={formData?.dateJoined || ""}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "dateJoined", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Choose a registration date --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last_24_hours">
                        Last 24 hours
                      </SelectItem>
                      <SelectItem value="last_7_days">Last 7 days</SelectItem>
                      <SelectItem value="last_30_days">Last 30 days</SelectItem>
                      <SelectItem value="this_month">This month</SelectItem>
                      <SelectItem value="this_year">This year</SelectItem>
                      <SelectItem value="custom">Custom period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Search by Group */}
            <div>
              <h1 className="!font-semibold mb-4">Search by group(optional)</h1>
              <div className="bg-white p-6 border rounded-md ">
                <div className="space-y-1">
                  <Label>Customer group</Label>
                  <Select
                    name="customerGroup"
                    value={formData?.customerGroup || ""}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "customerGroup", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Choose a customer group --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <h1 className="!font-semibold mb-4">Sort order</h1>
              <div className="bg-white p-6 border rounded-md ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Customer</Label>
                    <Select
                      name="sortBy"
                      value={formData?.sortBy || ""}
                      onValueChange={(value) =>
                        handleChange({ target: { name: "sortBy", value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ID" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">ID</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="orders">Orders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>in</Label>
                    <Select
                      name="sortOrder"
                      value={formData?.sortOrder || ""}
                      onValueChange={(value) =>
                        handleChange({ target: { name: "sortOrder", value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ascending order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending order</SelectItem>
                        <SelectItem value="desc">Descending order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
          <button type="button" className="btn-outline-primary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchCustomer;
