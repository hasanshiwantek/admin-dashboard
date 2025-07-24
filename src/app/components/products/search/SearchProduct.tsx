"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Controller, useFormContext } from "react-hook-form";
import CategoryTreeSm from "../add/CategoryTreeSm"; 

const SearchProduct = () => {
    const { register, control } = useFormContext();

    return (
        <div className="p-10 ">
            <div className="flex flex-col space-y-5">
                <h1 className="!font-extralight">Search Products</h1>
                <p>
                    Search for specific products using the advanced search options below.
                </p>
            </div>

            {/* ADVANCED SEARCH */}
            <div className="my-10">
                <h1 className="my-5 ">Advanced Search</h1>
                <div className="bg-white shadow-md p-10 space-y-10">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="searchKeywords" className="w-[120px] text-right">
                            Search Keywords:
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-gray-400 cursor-pointer">
                                            <HiQuestionMarkCircle className="w-6 h-6" />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <strong>Search Keywords</strong>
                                        <br />
                                        The search keywords you type into this box will be used to
                                        search the following fields for all products: name.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input id="searchKeywords" {...register("searchKeywords")} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Label htmlFor="brandName" className="w-[120px] text-right">
                            Brand Name:
                        </Label>
                        <Controller
                            name="brandName"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Brand Names" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="allBrand">All Brand Names</SelectItem>
                                        <SelectItem value="hp">HP</SelectItem>
                                        <SelectItem value="dell">Dell</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="flex gap-4 items-start">
                        <Label htmlFor="categoryIds" className="w-[120px] text-right">
                            Categories
                        </Label>
                        <CategoryTreeSm name="categoryIds" />
                    </div>
                </div>
            </div>

            {/* SEARCH BY RANGE */}
            <div className="my-10">
                <h1 className="my-5">Search by Range</h1>
                <div className="bg-white shadow-md p-10 space-y-10">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="priceFrom" className="w-[90px] text-right">
                            Price Range:
                        </Label>
                        <span className="text-sm text-gray-600">From $</span>
                        <Input
                            id="priceFrom"
                            type="number"
                            className="w-[100px]"
                            {...register("priceFrom")}
                        />
                        <span className="text-sm text-gray-600">to $</span>
                        <Input
                            id="priceTo"
                            type="number"
                            className="w-[100px]"
                            {...register("priceTo")}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Label htmlFor="qtyFrom" className="w-[100px] text-right">
                            Quantity Sold:
                        </Label>
                        <span className="text-sm text-gray-600">From</span>
                        <Input
                            id="qtyFrom"
                            type="number"
                            className="w-[100px]"
                            {...register("qtyFrom")}
                        />
                        <span className="text-sm text-gray-600 ml-4">to</span>
                        <Input
                            id="qtyTo"
                            type="number"
                            className="w-[100px]"
                            {...register("qtyTo")}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Label htmlFor="invFrom" className="w-[100px] text-right">
                            Inventory Level:
                        </Label>
                        <span className="text-sm text-gray-600">From</span>
                        <Input
                            id="invFrom"
                            type="number"
                            className="w-[100px]"
                            {...register("invFrom")}
                        />
                        <span className="text-sm text-gray-600 ml-4">to</span>
                        <Input
                            id="invTo"
                            type="number"
                            className="w-[100px]"
                            {...register("invTo")}
                        />
                    </div>
                </div>
            </div>

            {/* SEARCH BY SETTING */}
            <div className="my-10">
                <h1 className="my-5 ">Search by Setting</h1>
                <div className="bg-white shadow-md p-10 space-y-10">
                    {[
                        { label: "Product Visibility", name: "visibility" },
                        { label: "Featured Product", name: "featured" },
                        { label: "Free Shipping", name: "freeShipping" },
                        { label: "Status", name: "status" },
                    ].map(({ label, name }) => (
                        <div className="flex items-center gap-4" key={name}>
                            <Label htmlFor={name} className="w-[140px] text-right">
                                {label}:
                            </Label>
                            <Controller
                                name={name}
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="No Preference" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">No Preference</SelectItem>
                                            {name === "visibility" && (
                                                <>
                                                    <SelectItem value="visible">
                                                        Only Visible Products
                                                    </SelectItem>
                                                    <SelectItem value="invisible">
                                                        Only Invisible Products
                                                    </SelectItem>
                                                </>
                                            )}
                                            {name === "featured" && (
                                                <>
                                                    <SelectItem value="featured">Featured</SelectItem>
                                                    <SelectItem value="not-featured">
                                                        Not Featured
                                                    </SelectItem>
                                                </>
                                            )}
                                            {name === "freeShipping" && (
                                                <SelectItem value="freeShipping">
                                                    Only Free Shipping
                                                </SelectItem>
                                            )}
                                            {name === "status" && (
                                                <>
                                                    <SelectItem value="purchased">
                                                        Can be Purchased
                                                    </SelectItem>
                                                    <SelectItem value="preOrdered">Pre-Order</SelectItem>
                                                    <SelectItem value="notPurchased">
                                                        Cannot Purchase
                                                    </SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* SEARCH BY SORTING */}
            <div className="my-10">
                <h1 className="my-5 ">Sort Order</h1>
                <div className="bg-white shadow-md p-10 space-y-10">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="sortBy" className="w-[140px] text-right">
                            Sort Order:
                        </Label>

                        <Controller
                            name="sortBy"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="ID" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="id">ID</SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                        <SelectItem value="price">Price</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <Controller
                            name="sortOrder"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ascending Order" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asc">Ascending Order</SelectItem>
                                        <SelectItem value="desc">Descending Order</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
