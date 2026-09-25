"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { refetchWebpages } from "@/lib/storeFrontUtils";
import { convertOptionsToObject } from "@/lib/utils";
import {
  deleteWebPage,
  getWebPages,
  updateNavigation,
} from "@/redux/slices/storefrontSlice";
import { Check, Settings, Trash, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import { PageTypeOptions } from "./constants";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";

const WebPageTable = () => {
  const router = useRouter();

  const getDropdownActions = (page: any) => [
    {
      label: "Edit",
      onClick: () =>
        router.push(`/manage/storefront/web-pages/edit/${page.id}`),
    },
  ];
  const dispatch = useAppDispatch();
  const webPages = useAppSelector((state: any) => state.storefront.webPages);
  const loading = useAppSelector((state: any) => state.storefront.loading);

  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isAllSelected = selectedIds.length === webPages?.length;

  const toggleSelectAll = () => {
    const newSelected = isAllSelected
      ? []
      : webPages.map((brand: any) => brand.id);
    setSelectedIds(newSelected);
  };

  const toggleSelectOne = (id: number) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelected);
  };

  // Webpage DELETION LOGIC

  // const deleteWebpageHandler = async () => {
  //   if (selectedIds.length === 0) {
  //     alert("Please select at least one Webpage before deleting.");
  //     return; // stop here
  //   }
  //   const confirm = window.confirm("Delete Webpage?");
  //   if (!confirm) {
  //     return;
  //   } else {
  //     try {
  //       const resultAction = await dispatch(deleteWebPage({ id: selectedIds }));
  //       const result = (resultAction as any).payload;

  //       if ((resultAction as any).meta.requestStatus === "fulfilled") {
  //         setSelectedIds([]);
  //         setTimeout(() => {
  //           refetchWebpages(dispatch);
  //         }, 700);
  //       } else {
  //         console.error("❌ Failed to delete webpage:", result);
  //       }
  //     } catch (err) {
  //       console.error("❌ Unexpected error:", err);
  //     }
  //   }
  // };
const deleteWebpageHandler = () => {
  if (selectedIds.length === 0) {
    alert("Please select at least one Webpage before deleting.");
    return;
  }

  setShowDeleteModal(true);
};
  useEffect(() => {
    dispatch(getWebPages());
  }, [dispatch]);

  return (
    <div className="p-5">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col   gap-6 ">
          <h1 className="!font-light 2xl:!text-5xl">View Web Pages</h1>
          <p className="2xl:!text-2xl">
            Web pages are used to display content that doesn't change often. For
            example an 'About Us' or a 'Contact Us' page.
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <Link href={"/manage/storefront/web-pages/add"}>
            <button className="btn-outline-primary 2xl:!text-2xl">
              Create a Web Page
            </button>
          </Link>
          <button
            className="btn-outline-primary"
            onClick={deleteWebpageHandler}
          >
            <Trash className="!w-6 !h-6 2xl:!h-7" />
          </button>
        </div>
      </div>

      {/* BRANDS Table */}
      <div className="overflow-x-auto rounded-md border bg-white mt-2">
        <Table>
          <TableHeader className="!h-18 bg-gray-50">
            <TableRow className="">
              <TableHead className="w-10">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="text-left 2xl:!text-2xl">
                Page Name
              </TableHead>
              <TableHead className="text-left 2xl:!text-2xl">
                Page Type
              </TableHead>
              <TableHead className="text-left 2xl:!text-2xl">Visible</TableHead>
              <TableHead className="text-left 2xl:!text-2xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : webPages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-10 text-gray-500 text-xl"
                >
                  No Pages found.
                </TableCell>
              </TableRow>
            ) : (
              webPages.map((page: any) => (
                <TableRow key={page.id} className="!h-20">
                  <TableCell className="w-1/6">
                    <Checkbox
                      checked={selectedIds.includes(page.id)}
                      onCheckedChange={() => toggleSelectOne(page.id)}
                      aria-label={`Select ${page.pageName}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/manage/storefront/web-pages/edit/${page.id}`}
                      className="text-blue-600 hover:border-b-blue-600 hover:border-b-2 2xl:!text-2xl"
                    >
                      {page.pageName}
                    </Link>
                  </TableCell>
                  <TableCell className="2xl:!text-2xl">
                    {convertOptionsToObject(PageTypeOptions)[page.pageType]}
                  </TableCell>

                  <TableCell className="2xl:!text-2xl">
                    {page.isPageVisible ? (
                      <Check
                        className="text-green-500 w-8 h-8 cursor-pointer"
                        onClick={() => {
                          dispatch(
                            updateNavigation({
                              id: page.id,
                              data: {
                                isPageVisible: false,
                              },
                            }),
                          )
                            .unwrap()
                            .then(() => {
                              dispatch(getWebPages());
                            });
                        }}
                      />
                    ) : (
                      <X
                        className="text-red-500 w-8 h-8 cursor-pointer"
                        onClick={() => {
                          dispatch(
                            updateNavigation({
                              id: page.id,
                              data: {
                                isPageVisible: true,
                              },
                            }),
                          )
                            .unwrap()
                            .then(() => {
                              dispatch(getWebPages());
                            });
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <OrderActionsDropdown
                      actions={getDropdownActions(page)}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-xl cursor-pointer"
                        >
                          <Settings className="!w-6 !h-6 text-gray-500" />
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
      <ConfirmationModal
  open={showDeleteModal}
  onOpenChange={setShowDeleteModal}
  variant="warning"
  title="Delete Webpages?"
  description="Are you sure you want to delete the selected webpages?"
  onConfirm={async () => {
    try {
      const resultAction = await dispatch(
        deleteWebPage({ id: selectedIds })
      );
      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        setSelectedIds([]);

        setTimeout(() => {
          refetchWebpages(dispatch);
        }, 700);
      } else {
        console.error("❌ Failed to delete webpage:", result);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    } finally {
      setShowDeleteModal(false);
    }
  }}
/>
    </div>
  );
};

export default WebPageTable;
