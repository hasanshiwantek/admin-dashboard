"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "lucide-react";

type Customer = {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
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

  useEffect(() => {
    if (query?.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      const dummyResults: Customer[] = [
        {
          id: 1,
          name: "Justin Patterson",
          email: "jbpatterson@gmail.com",
          company: "Liberty Christian Center",
          phone: "7735452109",
        },
        {
          id: 2,
          name: "Judith Porter",
          email: "judiport08@comcast.net",
          company: "Liberty Christian Center",
          phone: "7735452109",
        },
        {
          id: 3,
          name: "Jonathan Sheldon",
          email: "buyer@amatteroffax.com",
          company: "Liberty Christian Center",
          phone: "7735452109",
        },
        {
          id: 4,
          name: "Mirza Marrero",
          email: "mmarrero@lccdefenders.org",
          company: "Liberty Christian Center",
          phone: "7735452109",
        },
      ];

      const filtered = dummyResults.filter((c) =>
        c.name.toLowerCase().includes(query?.toLowerCase())
      );

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
          if (query?.length >= 2) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {showDropdown && query?.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 rounded-md border bg-white shadow-xl">
          <ScrollArea className="max-h-64">
            {loading ? (
              <div className="p-4 text-gray-500 text-sm">Searching...</div>
            ) : results.length > 0 ? (
              results.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => {
                    onSelect(customer);
                    setQuery(customer.name); // update input text
                    onChange(customer.name); // update parent form state
                    setShowDropdown(false);
                  }}
                  className="flex items-start gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex-shrink-0 mt-1">
                    <User className="w-6 h-6 rounded-full bg-gray-300" />
                  </div>
                  <div className="flex-grow  ">
                    <div className="font-semibold text-lg">{customer.name}</div>
                    <div className="text-gray-600 text-base">
                      {customer.email}
                    </div>
                    {customer.company && (
                      <div className="text-gray-600 text-base">
                        {customer.company}
                      </div>
                    )}
                    {customer.phone && (
                      <div className="text-gray-600 text-base">
                        {customer.phone}
                      </div>
                    )}
                  </div>
                  <div className="text-blue-600 whitespace-nowrap mt-1 hover:underline text-base">
                    View order history
                  </div>
                </div>
              ))
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
