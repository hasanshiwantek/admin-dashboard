"use client";
import React, { useState, useCallback } from "react";
import {
  MoreHorizontal,
  ChevronDown,
  GripVertical,
  Save,
  X,
  Settings,
} from "lucide-react";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import FilterSettingsPage from "./FilterSettingsPage";
// --- SHADCN/UI Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// New Table Component Imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- APPLICATION DATA & LOGIC ---

const filterData = [
  { id: "1", name: "Category", details: "211 in total", visible: true },
  { id: "2", name: "Brand", details: "1073 in total", visible: true },
  {
    id: "3",
    name: "Price",
    details: "Ranging from 0 to 1089460.8",
    visible: true,
  },
  {
    id: "4",
    name: "Other",
    details: "Has Free Shipping, Is Featured, In Stock",
    visible: true,
  },
];

const storefrontOptions = [
  { value: "all", label: "Global (all storefronts)" },
  { value: "cts", label: "CTS Store" },
  { value: "nts", label: "NTS Store" },
];

const productOptions = [
  { value: "visible", label: "Visible product filters" },
  { value: "all", label: "All product Filters " },
];

const FilterationPage = () => {
  const [filters, setFilters] = useState(filterData);
  const [isDisableOpen, setIsDisableOpen] = useState(false);
  const [globalStorefront, setGlobalStorefront] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState("all");

  // State for filter settings modal
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterSettings, setFilterSettings] = useState<Record<string, any>>({});

  const toggleVisibility = useCallback((id: any) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === id ? { ...filter, visible: !filter.visible } : filter
      )
    );
  }, []);

  const handleEditSettings = (filter: any) => {
    setSelectedFilter(filter.name);
  };

  const handleSaveFilterSettings = (settings: any) => {
    if (selectedFilter) {
      setFilterSettings((prev) => ({
        ...prev,
        [selectedFilter]: settings,
      }));
      console.log(`Saved settings for ${selectedFilter}:`, settings);
      setSelectedFilter(null);
    }
  };

  const handleCancelFilterSettings = () => {
    setSelectedFilter(null);
  };

  const handleBackFromSettings = () => {
    setSelectedFilter(null);
  };

  const getFilterActions = (filter: any) => [
    {
      label: "Edit Settings",
      onClick: () => handleEditSettings(filter),
    },
  ];

  const getFilterToggle = () => [
    {
      label: "Disable Product Filters",
      onClick: () => console.log(" clicked"),
    },
  ];

  const handleSave = () => {
    console.log("Saving current filter settings:", filters);
  };

  // If a filter is selected, show the settings page
  if (selectedFilter) {
    return (
      <FilterSettingsPage
        filterName={selectedFilter}
        onBack={handleBackFromSettings}
        onSave={handleSaveFilterSettings}
        onCancel={handleCancelFilterSettings}
        initialValues={filterSettings[selectedFilter] || {}}
      />
    );
  }

  return (
    <div className="min-h-screen  p-4 sm:p-8 ">
      <div className="mx-auto">
        {/* Header and Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center  space-x-8">
            <h1 className="!font-extralight">Product Filters</h1>
            <Badge
              variant="default"
              className="bg-green-700 !text-white border-transparent"
            >
              ENABLED
            </Badge>
          </div>

          <OrderActionsDropdown
            actions={getFilterToggle()}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreHorizontal className="!h-8 !w-8" />
              </Button>
            }
          />
        </div>

        {/* Top Configuration Card */}
        <Card className="mb-6 p-8 border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Storefront Select */}
            <Select
              onValueChange={setGlobalStorefront}
              defaultValue={globalStorefront}
            >
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Select Storefront" />
              </SelectTrigger>
              <SelectContent>
                {storefrontOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Main Global Filters Card */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="px-8 ">
            <h2 className="!font-bold">Global Filters</h2>
          </CardHeader>
          <CardContent>
            {/* Filter Dropdown */}
            <div className="mb-4 pt-1">
              <Select
                onValueChange={setVisibleProducts}
                defaultValue={visibleProducts}
              >
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select Filter View" />
                </SelectTrigger>
                <SelectContent>
                  {productOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filters Table using shadcn/ui components */}
            <div className="w-full overflow-x-auto rounded-sm border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="">
                    <TableHead className="w-6 p-2"></TableHead>
                    {/* Drag handle column */}
                    <TableHead className="  tracking-wider w-1/4">
                      Name
                    </TableHead>
                    <TableHead className="  tracking-wider ">
                      Count/Details
                    </TableHead>
                    <TableHead className="tracking-wider w-40">
                      Visible
                    </TableHead>
                    {/* Actions column */}
                    <TableHead className=" tracking-wider w-20">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-100">
                  {filters.map((filter) => (
                    <TableRow
                      key={filter.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-3 px-2 text-center text-gray-400 cursor-grab">
                        <GripVertical className="!h-8 !w-8" />
                      </TableCell>
                      <TableCell className="py-3 px-3 whitespace-nowrap  text-blue-600">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditSettings(filter);
                          }}
                          className="hover:underline"
                        >
                          {filter.name}
                        </a>
                      </TableCell>
                      <TableCell className="py-3 px-3 whitespace-nowrap ">
                        {filter.details}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Checkbox
                          checked={filter.visible}
                          onCheckedChange={() => toggleVisibility(filter.id)}
                          id={`filter-${filter.id}`}
                        />
                      </TableCell>
                      <TableCell className="py-3 px-3 whitespace-nowrap text-right">
                        <OrderActionsDropdown
                          actions={getFilterActions(filter)}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontal className="!h-8 !w-8" />
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Floating Save Button */}

        <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterationPage;
