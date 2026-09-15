"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Ellipsis, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchAllReviews,
  approveReview,
  disapproveReview,
  deleteReview,
} from "@/redux/slices/reviewSlice";
import Spinner from "../../loader/Spinner";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

// ⭐ Star Rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AllReviews() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { reviews, loading, error, pagination } = useAppSelector(
    (state: any) => state.review,
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");

  useEffect(() => {
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
  }, [currentPage, perPage]);

  const totalPages = pagination?.lastPage || 1;

  // ── Filtered by keyword ──────────────────────────────────────────────────
  const filteredReviews = (reviews || []).filter((r: any) => {
    if (!keyword.trim()) return true;
    const kw = keyword.toLowerCase();
    return (
      r.productName?.toLowerCase().includes(kw) ||
      r.postedBy?.toLowerCase().includes(kw) ||
      r.status?.toLowerCase().includes(kw)
    );
  });

  // ── Selection helpers ────────────────────────────────────────────────────
  const isAllSelected =
    filteredReviews.length > 0 && selectedIds.length === filteredReviews.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredReviews.map((r: any) => r.id) : []);
  };

  const handleRowCheck = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  };

  // ── Bulk actions ─────────────────────────────────────────────────────────
  const handleDeleteSelected = async () => {
    if (!selectedIds.length) return;
    const ok = window.confirm(`Delete ${selectedIds.length} review(s)?`);
    if (!ok) return;
    await dispatch(deleteReview({ ids: selectedIds }));
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
    setSelectedIds([]);
  };

  const handleApproveSelected = async () => {
    if (!selectedIds.length) return;
    await dispatch(approveReview({ ids: selectedIds, status: "approved" }));
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
    setSelectedIds([]);
  };

  const handleDisapproveSelected = async () => {
    if (!selectedIds.length) return;
    await dispatch(
      disapproveReview({ ids: selectedIds, status: "disapproved" }),
    );
    dispatch(fetchAllReviews({ page: currentPage, pageSize: Number(perPage) }));
    setSelectedIds([]);
  };

  // ── Row dropdown ─────────────────────────────────────────────────────────
  const getRowActions = (review: any) => [
    {
      label: "Preview",
      onClick: () => {
        // ✅ small popup window open hoga — screenshot jaisa
        window.open(
          `/manage/products/reviews/preview/${review.id}`,
          "PreviewReview",
          "width=700,height=500,scrollbars=yes,resizable=yes",
        );
      },
    },
    {
      label: "Edit",
      onClick: () => router.push(`/manage/products/reviews/edit/${review.id}`),
    },
  ];

  // ── Date formatter ───────────────────────────────────────────────────────
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      {/* ── Page header ── */}
      <h1 className="!text-[30px] 2xl:!text-[3.2rem] !font-normal !text-[#34313F] !my-5">
        Reviews
      </h1>
      <p className="text-[#34313F] !text-[15px] 2xl:!text-[1.4rem] mb-6">
        When someone writes a review for a product from your site it will appear
        in the list below.
      </p>

      <div className="bg-white p-4 shadow-md">
        {/* ── Toolbar ── */}
        <div className="flex flex-wrap gap-3 items-center mb-2">
          {/* Bulk action buttons */}
          <button
            className="btn-outline-primary"
            onClick={handleDeleteSelected}
            disabled={!selectedIds.length}
          >
            Delete Selected
          </button>
          <button
            onClick={handleApproveSelected}
            disabled={!selectedIds.length}
            className="btn-outline-primary"
          >
            Approve Selected
          </button>
          <button
            onClick={handleDisapproveSelected}
            disabled={!selectedIds.length}
            className="btn-outline-primary"
          >
            Disapprove Selected
          </button>

          {/* Keyword filter */}
          {/* <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 ml-2 gap-2 focus-within:border-blue-400 transition">
                        <input
                            type="text"
                            placeholder="Filter by Keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="outline-none bg-transparent !text-xl 2xl:!text-[1.4rem] text-gray-600 placeholder:text-gray-400 w-52"
                        />
                        {keyword && (
                            <button onClick={() => setKeyword("")}>
                                <X size={16} className="text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 !text-xl 2xl:!text-[1.4rem] text-blue-600 hover:bg-blue-50 transition">
                        <Filter size={16} />
                        Filter
                    </button> */}
        </div>

        {/* ── Table ── */}
        <Table>
         <TableHeader>
  <TableRow className="bg-gray-50">
    <TableHead className="w-10 !py-[18px]">
      <Checkbox
        className="h-9 w-9 rounded-none mr-2"
        checked={isAllSelected}
        onCheckedChange={(checked: boolean) =>
          handleSelectAll(checked)
        }
      />
    </TableHead>

    <TableHead className="!py-[18px] text-[13px] 2xl:text-[15px] font-semibold !text-[#34313F]">
      Product
    </TableHead>

    <TableHead className="!py-[18px] text-[13px] 2xl:text-[15px] font-semibold !text-[#34313F]">
      Rating
    </TableHead>

    <TableHead className="!py-[18px] text-[13px] 2xl:text-[15px] font-semibold !text-[#34313F]">
      Posted By
    </TableHead>

    <TableHead className="!py-[18px] text-[13px] 2xl:text-[15px] font-semibold !text-[#34313F]">
      Date
    </TableHead>

    <TableHead className="!py-[18px] text-[13px] 2xl:text-[15px] font-semibold !text-[#34313F]">
      Status
    </TableHead>

    <TableHead className="!py-[18px] text-[13px] 2xl:text-[15px] font-semibold !text-[#34313F]">
      Action
    </TableHead>
  </TableRow>
</TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500 !text-xl"
                >
                  No reviews yet.
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review: any) => (
                <TableRow
                  key={review.id}
                  className="hover:bg-gray-50 !py-0 align-top"
                >
                  {/* Checkbox */}
                  <TableCell>
                    <Checkbox
                      className="h-9 w-9 rounded-none mr-2"
                      checked={selectedIds.includes(review.id)}
                      onCheckedChange={(checked: boolean) =>
                        handleRowCheck(review.id, checked)
                      }
                    />
                  </TableCell>

                  {/* Product name + type */}
                  <TableCell className="py-2">
                    <span
                      onClick={() => {
                        const availableStores = JSON.parse(
                          localStorage.getItem("availableStores") || "[]",
                        );
                        const selectedStoreId = Number(
                          localStorage.getItem("storeId"),
                        );
                        const selectedStore = availableStores.find(
                          (s: any) => s.id === selectedStoreId,
                        );
                        if (selectedStore?.baseUrl)
                          window.open(
                            `${selectedStore.baseUrl}${review?.product?.product_url[0] == "/" ? review?.product?.product_url.slice(1) : review?.product?.product_url}`,
                            "_blank",
                          );
                        else alert("Store URL or Product SKU not found");
                      }}
                      //  onClick={() => router.push(`/manage/products/reviews/edit/${review.id}`)}
                      className="!text-[#6F8DFD] !font-normal hover:underline cursor-pointer !text-[15px]  block max-w-[500px] whitespace-normal break-words"
                    >
                      {review?.product?.name}
                    </span>
                    {review.subject && (
                      <p className="!text-[#34313F] !text-lg 2xl:!text-[14px] !font-normal mt-1">
                        {review.subject}
                      </p>
                    )}
                  </TableCell>

                  {/* Stars */}
                  <TableCell>
                    <StarRating rating={review.rating ?? 0} />
                  </TableCell>

                  {/* Posted by */}
                  <TableCell className="text-[#34313F] !text-[15px] 2xl:!text-[1.4rem]">
                    {review?.name || review.user?.name}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="!text-[#34313F] !text-[15px] 2xl:!text-[1.4rem]">
                    {formatDate(review.created_at)}{" "}
                    {/* createdAt → created_at */}
                  </TableCell>

                  {/* Status */}
                  <TableCell
                    className={`!text-xl 2xl:!text-[15px] ${
                      review.approved === 1
                        ? "text-[#008000]"
                        : "text-[#34313f]"
                    }`}
                  >
                    {review.approved === 1 ? "Approved" : "Pending"}
                  </TableCell>

                  {/* Action dropdown */}
                  <TableCell>
                    <OrderActionsDropdown
                      actions={getRowActions(review)}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <Ellipsis className="!w-7 !h-7" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* ── Bottom pagination ── */}
        <div className="flex justify-end my-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            perPage={perPage}
            onPerPageChange={(val) => {
              setPerPage(val);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
