"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "lucide-react";
import { fetchCustomers } from "@/redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
  state?: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (customer: Customer) => void;
};

export default function CustomerSearchDropdown({
  value,
  onChange,
  onSelect,
}: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Customer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const { customers } = useAppSelector((state: any) => state.customer);
  console.log("Customers From SearchDropdown: ", customers);

  const allCustomers = customers?.data;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCustomers({ page: 1, pageSize: 100 }));
  }, [dispatch, 1, 100]);

  useEffect(() => {
    if (query?.length < 1) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      const filtered = allCustomers?.filter((c: any) => {
        const fullName = `${c.firstName || ""} ${
          c.lastName || ""
        }`.toLowerCase();
        return (
          fullName.includes(query.toLowerCase()) ||
          (c.email && c.email.toLowerCase().includes(query.toLowerCase())) ||
          (c.companyName &&
            c.companyName.toLowerCase().includes(query.toLowerCase()))
        );
      });

      setResults(filtered);
      setLoading(false);
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-[500px]">
      <Input
        placeholder="Search by customer name, email address or company"
        className="max-w-[500px]"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => {
          if (query?.length >= 1) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {showDropdown && query?.length >= 1 && (
        <div className="absolute z-50  w-full mt-2 rounded-md border bg-white shadow-xl">
          <ScrollArea className="h-72">
            {loading ? (
              <div className="p-4 text-gray-500 text-sm">Searching...</div>
            ) : results?.length > 0 ? (
              results?.map((customer) => {
                const name = customer.firstName + " " + customer.lastName;
                console.log(name);

                return (
                  <div
                    key={customer.id}
                    onClick={() => {
                      onSelect(customer);
                      setQuery(name); // update input text
                      onChange(name); // update parent form state
                      setShowDropdown(false);
                    }}
                    className="flex items-start gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <User className="w-6 h-6 rounded-full bg-gray-300" />
                    </div>
                    <div className="flex-grow  ">
                      <div className="font-semibold text-lg">{name}</div>
                      <div className="text-gray-600 text-base">
                        {customer.email}
                      </div>
                      {customer.companyName && (
                        <div className="text-gray-600 text-base">
                          {customer.companyName}
                        </div>
                      )}
                      {customer.phone && (
                        <div className="text-gray-600 text-base">
                          {customer.phone}
                        </div>
                      )}
                    </div>
                    {/* <div className="text-blue-600 whitespace-nowrap mt-1 hover:underline text-base">
                      View order history
                    </div> */}
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-gray-800 text-base text-center">
                No results found
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
