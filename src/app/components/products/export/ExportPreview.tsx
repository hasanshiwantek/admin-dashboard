"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Check } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import Spinner from "../../loader/Spinner";
const previewData = [
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500 " />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
];

export default function ExportPreview() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const allProducts = useAppSelector((state: any) => state?.product?.products);
  const { loading } = useAppSelector((state: any) => state.product);

  const totalItems = allProducts?.pagination?.total || 0;
  const pagination = allProducts?.pagination;
  const totalPages = pagination?.lastPage;
  const products = allProducts?.data;

  useEffect(() => {
    dispatch(fetchAllProducts({ page: currentPage, pageSize: perPage }));
  }, [dispatch, perPage, currentPage])

  return (
    <div>
      <p className=" text-muted-foreground 2xl:!text-2xl">
        The <strong>{totalItems?.toLocaleString()}</strong> products shown below
        will be exported when you click the continue button.
      </p>
      <div className="bg-white p-6 rounded-md border shadow-sm space-y-4">
        <div className="flex justify-end my-2">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
        <div className="overflow-auto border rounded">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead>Featured</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : products?.length === 0 && !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-gray-500 text-xl"
                  >
                    No products yet.
                  </TableCell>
                </TableRow>
              ) : (
                products?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="2xl:!text-2xl">{item?.id}</TableCell>
                    <TableCell className="2xl:!text-2xl">{item?.sku}</TableCell>
                    <TableCell className="2xl:!text-2xl">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-default">
                              {item?.name?.length > 50 ? `${item?.name?.slice(50)}...` : item?.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {item?.name}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="2xl:!text-2xl">{item?.price}</TableCell>
                    <TableCell className="2xl:!text-2xl">{item?.isVisible ? <Check className="h-8 w-8 text-green-500" /> : <IoMdClose className="h-6 w-6 text-red-500" />}</TableCell>
                    <TableCell className="2xl:!text-2xl">{item?.isFeatured ? <Check className="h-8 w-8 text-green-500" /> : <IoMdClose className="h-6 w-6 text-red-500" />}</TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end my-6">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>
    </div>
  );
}
