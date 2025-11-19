"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define filter configurations
const filterConfigs = {
  Category: {
    displayName: "Category",
    fields: [
      {
        id: "displayName",
        label: "Display Name",
        type: "input",
        defaultValue: "Category",
      },
      {
        id: "show",
        label: "Show",
        type: "select",
        options: ["10 Items", "15 Items", "5 Items"],
        defaultValue: "15 Items",
      },
      {
        id: "displayProductCount",
        label: "Display product count",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "collapsedByDefault",
        label: "Collapsed by default",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
  Brand: {
    displayName: "Brand",
    fields: [
      {
        id: "displayName",
        label: "Display Name",
        type: "input",
        defaultValue: "Brand",
      },
      {
        id: "sort",
        label: "Sort",
        type: "select",
        options: ["Alphabetically", "By option value order", "By item count"],
        defaultValue: "Alphabetically",
      },
      {
        id: "show",
        label: "Show",
        type: "select",
        options: ["5 Items", "10 Items", "15 Items"],
        defaultValue: "10 Items",
      },
      {
        id: "displayProductCount",
        label: "Display product count",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "collapsedByDefault",
        label: "Collapsed by default",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
  Price: {
    displayName: "Price",
    fields: [
      {
        id: "displayName",
        label: "Display Name",
        type: "input",
        defaultValue: "Price",
      },
      {
        id: "collapsedByDefault",
        label: "Collapsed by default",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
  Other: {
    displayName: "Other",
    fields: [
      {
        id: "displayName",
        label: "Display Name",
        type: "input",
        defaultValue: "Other",
      },
      {
        id: "hasFreeShipping",
        label: "Has Free Shipping",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "isFeatured",
        label: "Is Featured",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "inStock",
        label: "In Stock",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "displayProductCount",
        label: "Display product count",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "collapsedByDefault",
        label: "Collapsed by default",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
};

interface FilterSettingsPageProps {
  filterName: string;
  onBack: () => void;
  onSave: (settings: any) => void;
  onCancel: () => void;
  initialValues?: Record<string, any>;
}

const FilterSettingsPage: React.FC<FilterSettingsPageProps> = ({
  filterName,
  onBack,
  onSave,
  onCancel,
  initialValues = {},
}) => {
  const config = filterConfigs[filterName as keyof typeof filterConfigs];

  if (!config) {
    return <div>Filter configuration not found</div>;
  }

  // Initialize state with default values or provided initial values
  const [formData, setFormData] = useState(() => {
    const initialData: Record<string, any> = {};
    config.fields.forEach((field) => {
      initialData[field.id] =
        initialValues[field.id] ?? field.defaultValue ?? "";
    });
    return initialData;
  });

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "input":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className="w-full"
            />
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Select
              value={formData[field.id] || field.defaultValue}
              onValueChange={(value) => handleInputChange(field.id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.id] ?? field.defaultValue}
              onCheckedChange={(checked) =>
                handleInputChange(field.id, checked)
              }
            />
            <Label htmlFor={field.id} className=" cursor-pointer">
              {field.label}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto ">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-8 w-8" />
            <span className="text-xl uppercase tracking-wide">
              Product Filters
            </span>
          </button>
          <h1 className="!font-extralight">{config.displayName}</h1>
        </div>

        {/* Global Setting Card */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="p-6">
            <p className="">Global setting (all storefronts)</p>
          </CardContent>
        </Card>

        {/* Filter Settings Card */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Filter Settings</h2>
            <div className="space-y-6">
              {config.fields.map((field) => renderField(field))}
            </div>
          </CardContent>
        </Card>

        {/* Fixed Bottom Action Buttons */}
        <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
          <div className="flex justify-end gap-8 px-8">
            <button className="btn-outline-primary" onClick={onCancel}>
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSettingsPage;
