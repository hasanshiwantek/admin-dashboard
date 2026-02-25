"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OpenGraphProps {
  isEdit?: boolean;
}

export default function OpenGraph({ isEdit = false }: OpenGraphProps) {
  const { setValue, watch } = useFormContext();

  const objectType = watch("objectType");
  const imageOption = watch("imageOption") || "useThumbnail";

  // ✅ Fallback logic for checkboxes
  const useProductNameValue = watch("useProductName");
  const graphDescriptionValue = watch("graphDescription");

  // If backend value exists (edit mode), use it. Otherwise (new product), default checked (true)
  const useProductName = useProductNameValue ?? (!isEdit ? 1 : 0);
  const graphDescription = graphDescriptionValue ?? (!isEdit ? 1 : 0);

  return (
    <div id="openGraphSharing" className="p-10 bg-white shadow-lg rounded-sm">
      <h1 className="2xl:!text-[2.4rem]">Open Graph Sharing</h1>
      <div className="my-6">
        {/* Object Type */}
        <div className="my-6">
          <Label className="2xl:!text-2xl" htmlFor="objectType">
            Object Type
          </Label>
          <Select
            value={objectType}
            onValueChange={(value) => setValue("objectType", value)}
          >
            <SelectTrigger className="!max-w-[100%] w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Use Product Name */}
        <div className="my-6">
          <h2 className="2xl:!text-3xl">Title</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="useProductName"
              checked={!!useProductName}
              onCheckedChange={(checked) =>
                setValue("useProductName", checked ? 1 : 0)
              }
            />
            <Label className="2xl:!text-2xl" htmlFor="useProductName">
              Use product name
            </Label>
          </div>
        </div>

        {/* Use Meta Description */}
        <div className="my-6">
          <h2 className="2xl:!text-3xl">Description</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="graphDescription"
              checked={!!graphDescription}
              onCheckedChange={(checked) =>
                setValue("graphDescription", checked ? 1 : 0)
              }
            />
            <Label className="2xl:!text-2xl" htmlFor="graphDescription">
              Use meta description
            </Label>
          </div>
        </div>

        {/* Image Radio Group */}
        <div className="my-6">
          <h2 className="2xl:!text-3xl">Image</h2>
          <RadioGroup
            value={imageOption}
            onValueChange={(val) => setValue("imageOption", val)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="useThumbnail" id="useThumbnail" />
              <Label className="2xl:!text-2xl" htmlFor="useThumbnail">
                Use thumbnail image
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dontUse" id="dontUse" />
              <Label className="2xl:!text-2xl" htmlFor="dontUse">
                Don't use an image
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}