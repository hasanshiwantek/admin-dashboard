"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Filter } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import VisibilityToggle from "../dropdowns/VisibilityToggle";
import FeaturedToggle from "../dropdowns/FeaturedToggle";
import {
  fetchAllProducts,
  setSelectedProducts,
  searchAllProducts,
  updateProduct,
  deleteProduct,
} from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Checkbox } from "@/components/ui/checkbox";
import EditPriceSheet from "./EditPriceSheet";
import EditStockSheet from "./EditStockSheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "../loader/Spinner";
import { refetchProducts } from "@/lib/productUtils";
import { useSearchParams } from "next/navigation";
import { advanceSearchProduct } from "@/redux/slices/productSlice";

const filterTabs = [
  "All",
  "Featured",
  "Free shipping",
  "Out of stock",
  "Inventory low",
  "Last imported",
  "Visible",
  "Not visible",
];

export default function AllProducts() {
  const allProducts = useAppSelector((state: any) => state.product.products);
  const { loading, error } = useAppSelector((state: any) => state.product);
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const products = allProducts?.data;
  console.log("All Products data from frontend: ", products);

  const filteredProducts = [...(products || [])]
    .filter((product: any) => {
      switch (selectedTab) {
        case "Featured":
          return product.isFeatured === true;

        case "Free shipping":
          return (
            product.fixedShippingCost === 0 ||
            product.fixedShippingCost === null
          );

        case "Out of stock":
          return product.currentStock === 0;

        case "Inventory low":
          return product.currentStock <= product.lowStock;

        case "Visible":
          return product.isVisible === true;

        case "Not visible":
          return product.isVisible === false;

        default:
          return true; // "All" or unknown tab
      }
    })
    .sort((a: any, b: any) => {
      if (selectedTab === "Last imported") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      return 0;
    });

  console.log("Filtered Products: ", filteredProducts);

  const dispatch = useAppDispatch();
  const [featuredMap, setFeaturedMap] = useState<{ [key: number]: boolean }>(
    {}
  );
  const router = useRouter();
  const [visibilityMap, setVisibilityMap] = useState<{
    [key: number]: "ENABLED" | "DISABLED";
  }>({});
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const getDropdownActions = (product: any) => [
    {
      label: "Add to channels",
      onClick: () => console.log("Channel add clicked", product),
    },
    {
      label: "Remove from channels",
      onClick: () => console.log("Remove from channels clicked", product),
    },
    {
      label: "Add to categories",
      onClick: () => console.log("Add to categories clicked", product),
    },
    {
      label: "Remove from categories",
      onClick: () => console.log("Remove from categories", product),
    },
    {
      label: "Enable visibility",
      onClick: () => {
        console.log("Enable visibility clicked", product);
        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: [product?.id],
                  fields: {
                    isVisible: false,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
      },
    },
    {
      label: "Disable visibility",
      onClick: () => {
        console.log("Disable visibility clicked", product);

        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: [product?.id],
                  fields: {
                    isVisible: true,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
      },
    },
    {
      label: "Make featured",
      onClick: () => {
        console.log("Make featured clicked", product);
        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: [product?.id],
                  fields: {
                    isFeatured: true,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
      },
    },
    {
      label: "Make not featured",
      onClick: () => {
        console.log("Make not featured", product);
        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: [product?.id],
                  fields: {
                    isFeatured: false,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
      },
    },
    {
      label: "Delete",
      onClick: () => {
        console.log("Delete", product);
        dispatch(deleteProduct({ ids: [product.id] }));
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 400);
      },
    },
  ];

  const editdropdownActions = [
    {
      label: "Add to channels",
      onClick: () => console.log("Channel add clicked"),
    },
    {
      label: "Remove from channels",
      onClick: () => console.log("remove clicked"),
    },
    {
      label: "Add to categories",
      onClick: () => {
        console.log("Add to categories clicked");
      },
    },
    {
      label: "Remove from categories",
      onClick: () => {
        console.log("Remove from categories");
      },
    },
    {
      label: "Enable visiblity",
      onClick: () => {
        console.log("Enable visiblity clicked");
        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: selectedProductIds,
                  fields: {
                    isVisible: false,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
        setSelectedProductIds([]);
      },
    },
    {
      label: "Disable visiblity",
      onClick: () => {
        console.log("Disable visibility clicked");

        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: selectedProductIds,
                  fields: {
                    isVisible: true,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
        setSelectedProductIds([]);
      },
    },
    {
      label: "Make featured",
      onClick: () => {
        console.log("Make featured clicked");
        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: selectedProductIds,
                  fields: {
                    isFeatured: true,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
        setSelectedProductIds([]);
      },
    },
    {
      label: "Make Not featured",
      onClick: () => {
        console.log("Make Notfeatured clicked");
        dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: selectedProductIds,
                  fields: {
                    isFeatured: false,
                  },
                },
              ],
            },
          })
        );
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 200);
        setSelectedProductIds([]);
      },
    },
    {
      label: "Delete",
      onClick: () => {
        console.log("Delete", selectedProductIds);
        dispatch(deleteProduct({ ids: selectedProductIds }));
        setTimeout(() => {
          refetchProducts(dispatch);
        }, 400);
        setSelectedProductIds([]);
      },
    },
  ];

  // CHECKBOX SELECTION LOGIC
  const isAllSelected = selectedProductIds?.length === filteredProducts?.length;

  const handleSelectAllChange = (checked: boolean) => {
    const updated = checked ? filteredProducts?.map((p: any) => p.id) : [];
    setSelectedProductIds(updated);
    console.log("✅ Updated selectedProductIds (Select All):", updated);
  };

  const handleProductCheckboxChange = (id: number, checked: boolean) => {
    const updated = checked
      ? [...selectedProductIds, id]
      : selectedProductIds.filter((pid) => pid !== id);

    setSelectedProductIds(updated);
    console.log("✅ Updated selectedProductIds:", updated);
  };

  const handleEditInventory = () => {
    const selected = filteredProducts.filter((p: any) =>
      selectedProductIds.includes(p.id)
    );
    dispatch(setSelectedProducts(selected));
    router.push("/manage/products/inventory");
  };

  const handlebulkEdit = () => {
    const selected = filteredProducts.filter((p: any) =>
      selectedProductIds.includes(p.id)
    );
    dispatch(setSelectedProducts(selected));
    router.push("/manage/products/bulk-edit");
  };

  // PAGINATION LOGIC
  const pagination = allProducts?.pagination;
  console.log("Pagination: ", pagination);

  const totalPages = pagination?.lastPage;
  const [currentPage, setCurrentPage] = useState(pagination?.page || 1);
  const [perPage, setPerPage] = useState(
    pagination?.pageSize?.toString() || "50"
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}&limit=${perPage}`);
  };

  const handlePerPageChange = (value: string) => {
    setPerPage(value);
    setCurrentPage(1);
    router.push(`?page=1&limit=${value}`);
  };

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    if (queryObject[key]) {
      queryObject[key] = [...queryObject[key], value];
    } else {
      queryObject[key] = value;
    }
  });

  useEffect(() => {
    const page = Number(queryObject.page || 1);
    const pageSize = Number(queryObject.limit || queryObject.pageSize || 50);

    const filterKeys = Object.keys(queryObject).filter(
      (key) => !["page", "limit", "pageSize"].includes(key)
    );

    if (filterKeys.length > 0) {
      // 🔍 Run filtered search if extra filters exist
      dispatch(
        advanceSearchProduct({
          data: {
            ...queryObject,
            page,
            pageSize,
          },
        })
      );
    } else {
      // 📦 Default: Fetch all products
      dispatch(fetchAllProducts({ page, pageSize }));
    }
  }, [searchParams]); // reruns whenever URL changes

  // SearchPoduct Logic

  const handleSearchProduct = () => {
    if (searchTerm === "") {
      dispatch(fetchAllProducts({ page: currentPage, pageSize: perPage }));
    }
    dispatch(searchAllProducts({ query: searchTerm }));
    console.log(searchTerm);
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">
          Products
        </h1>
        <Link href={"/manage/products/add"}>
          <Button
            size="xl"
            className="!text-2xl btn-primary !flex !justify-start !items-center"
          >
            <Plus className="!w-6 !h-6" /> Add new
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 shadow-md">
        <div className="flex flex-wrap gap-5 mb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`!text-2xl px-5 py-2 rounded  cursor-pointer transition hover:bg-blue-100 ${
                selectedTab === tab
                  ? "bg-blue-100 border-blue-600 text-blue-600"
                  : " text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-10 items-center mb-5">
          <div
            className="flex justify-start items-center bg-white text-center !px-4 !py-4 rounded-md 
                         focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200 border border-gray-200  transition hover:border-blue-200 w-[80%]"
          >
            <i onClick={handleSearchProduct}>
              <IoSearchOutline
                size={20}
                color="gray"
                className="cursor-pointer"
              />
            </i>
            <input
              type="text"
              placeholder=" Search products"
              className=" !ml-3 bg-transparent !text-xl !font-medium outline-none placeholder:text-gray-400 w-[80%]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* <Input placeholder="Search products" className="max-w-[80%] !p-7 " /> */}
          <Link href={"/manage/products/search"}>
            <button className="btn-outline-primary flex justify-start gap-1 items-center">
              <Filter className="w-6 h-6" />
              Add filters
            </button>
          </Link>
          {/* <Checkbox/> */}
        </div>

        <div className="flex items-center justify-between border-t border-b border-gray-200 px-4 py-2 bg-white text-sm">
          {/* Left side: checkbox and product count */}
          <div className="flex items-center space-x-10">
            <div className="flex justify-start items-center gap-2">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked: boolean) =>
                  handleSelectAllChange(checked)
                }
              />
              <span className="text-gray-700 !text-xl">
                {filteredProducts?.length} of {pagination?.total} Products
              </span>
            </div>

            {selectedProductIds.length > 0 && (
              <div>
                <button className="btn-outline-primary">Export</button>
                <button
                  className="btn-outline-primary"
                  onClick={handlebulkEdit}
                >
                  Bulk edit
                </button>
                <button
                  className="btn-outline-primary"
                  onClick={handleEditInventory}
                >
                  Edit Inventory
                </button>
                <OrderActionsDropdown
                  actions={editdropdownActions}
                  trigger={
                    <button className="text-xl cursor-pointer btn-outline-primary">
                      •••
                    </button>
                  }
                />
              </div>
            )}

            {/* <div>
              <span className="!text-xl !text-blue-600 hover:bg-blue-100 cursor-pointer px-6 py-3 rounded-sm transition-all ">
                Select all products
              </span>
            </div> */}
          </div>

          {/* Right side: pagination and controls */}
          <div className="flex items-center space-x-10 text-gray-700">
            {/* Settings icon */}
            {/* <Settings className="w-8 h-8 text-gray-500" /> */}

            <div className="p-6">
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                perPage={perPage}
                onPerPageChange={handlePerPageChange}
              />
            </div>
          </div>
        </div>
        <div>
          <Table>
            <TableHeader className="h-18">
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Current stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : filteredProducts?.length === 0 && !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-gray-500 text-xl"
                  >
                    No products yet.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts?.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProductIds.includes(product.id)}
                        onCheckedChange={(checked: boolean) =>
                          handleProductCheckboxChange(product.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="flex items-center gap-2 ">
                      <Image
                        src={
                          product.image?.[1]?.path ||
                          product.image?.[0]?.path ||
                          null
                        }
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded !border object-contain !border-gray-300 p-2 shrink-0 w-28 h-24"
                      />

                      <span
                        onClick={() => {
                          router.push(`/manage/products/edit/${product.id}`);
                          console.log("navigated");
                        }}
                        className="!text-blue-600 hover:underline !text-xl !font-medium capitalize  cursor-pointer whitespace-normal break-words leading-snug max-w-[300px]"
                      >
                        {product.name}
                      </span>
                    </TableCell>
                    <TableCell className="relative  mx-4 ">
                      <FeaturedToggle
                        productId={product.id}
                        isFeatured={
                          featuredMap[product.id] ?? product.isFeatured
                        }
                        onChange={(id: any, value) => {
                          setFeaturedMap((prev) => ({ ...prev, [id]: value }));

                          dispatch(
                            updateProduct({
                              body: {
                                products: [
                                  {
                                    id: [id],
                                    fields: {
                                      isFeatured: value,
                                      // categoryIds:[1]
                                    },
                                  },
                                ],
                              },
                            })
                          );
                          refetchProducts(dispatch);
                        }}
                      />
                    </TableCell>

                    <TableCell>{product.sku}</TableCell>

                    <TableCell className="whitespace-normal break-words leading-snug max-w-[300px]">
                      {product.categories.map((cat: any) => cat.name)}
                    </TableCell>
                    <TableCell>
                      <EditStockSheet
                        product={product}
                        trigger={
                          <div className="group hover:text-blue-600 flex items-center gap-1 hover:bg-blue-100 p-4 rounded-md cursor-pointer transition-colors">
                            <a className="text-xl group-hover:opacity-100">
                              {product.currentStock}
                            </a>
                            <Pencil className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <EditPriceSheet
                        product={product}
                        trigger={
                          <div className="group hover:text-blue-600 flex items-center gap-1 hover:bg-blue-100 p-4 rounded-md cursor-pointer transition-colors">
                            <a className="text-xl group-hover:opacity-100">
                              {product.price}
                            </a>
                            <Pencil className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                      />
                    </TableCell>

                    <TableCell>{product.channels}</TableCell>
                    <TableCell className="relative hover:bg-blue-100 transition-all">
                      <VisibilityToggle
                        productId={product.id}
                        value={
                          visibilityMap[product.id] ?? product.isVisible
                            ? "ENABLED"
                            : "DISABLED"
                        }
                        onChange={(id, value) => {
                          const isVisible = value === "ENABLED";
                          setVisibilityMap((prev: any) => ({
                            ...prev,
                            [id]: isVisible,
                          }));
                          dispatch(
                            updateProduct({
                              body: {
                                products: [
                                  {
                                    id: [id],
                                    fields: {
                                      isVisible,
                                    },
                                  },
                                ],
                              },
                            })
                          );
                          refetchProducts(dispatch);
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <OrderActionsDropdown
                        actions={getDropdownActions(product)}
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-xl cursor-pointer"
                          >
                            •••
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end my-6">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            perPage={perPage}
            onPerPageChange={handlePerPageChange}
          />
        </div>
      </div>
    </div>
  );
}
