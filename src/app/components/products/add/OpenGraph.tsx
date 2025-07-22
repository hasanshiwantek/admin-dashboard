// BasicInfoForm.tsx
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export default function OpenGraph() {

    const { register, setValue, watch } = useFormContext();
    const objectType = watch("objectType");
    const image = watch("image");

    return (
        <div id="openGraphSharing" className="p-10 bg-white shadow-lg rounded-sm ">
            <h1 >Open Graph Sharing</h1>
            <div className="my-6">
                <div className="my-6">
                    <Label htmlFor="objectType">Object Type</Label>
                    <Select
                        value={objectType}
                        onValueChange={(value) => setValue("objectType", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="physical">Physical</SelectItem>
                            <SelectItem value="digital">Digital</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="my-6">
                    <h2>Title</h2>
                    <div className="flex items-center space-x-2  ">
                        <Checkbox id="useProductName" {...register("useProductName")} />
                        <Label htmlFor="useProductName">Use product name</Label>
                    </div>
                </div>
                <div className="my-6">
                    <h2>Description</h2>
                    <div className="flex items-center space-x-2  ">
                        <Checkbox id="graphDescription" {...register("graphDescription")} />
                        <Label htmlFor="graphDescription">Use meta description</Label>
                    </div>
                </div>
                <div className="my-6">
                    <h2>Image</h2>
                    <RadioGroup
                        value={image}
                        className=""
                        onValueChange={(val) => setValue("image", val)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="useThumbnail" id="useThumbnail" />
                            <Label htmlFor="useThumbnail">Use thumbnail image</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dontUse" id="dontUse" />
                            <Label htmlFor="dontUse">Don't use an image</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}