"use client";
import React, { useState, useEffect } from "react";
import { Plus, MoreHorizontal, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn button
import { Switch } from "@/components/ui/switch"; // Shadcn switch
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn table
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchBlogs, deleteBlog } from "@/redux/slices/storefrontSlice";
import { useRouter } from "next/navigation";
import { refetchBlogs } from "@/lib/storeFrontUtils";
import Spinner from "../loader/Spinner";
// Mock data
const posts = [
  {
    id: "00706M",
    title: "Explore Dell 00706M Power Supply",
    author: "Jane Doe",
    publishedOn: "Jan 10, 2024",
    status: "published",
  },
  {
    id: "001859D",
    title: "Review: Dell 0001859D Power Supply",
    author: "John Smith",
    publishedOn: "Jan 10, 2024",
    status: "published",
  },
  {
    id: "001A",
    title: "Upcoming Trends in Enterprise Storage",
    author: "Alice Johnson",
    publishedOn: "N/A",
    status: "draft",
  },
];

export default function BlogTable() {
  const { blogs, loading, error } = useAppSelector(
    (state: any) => state.storefront
  );
  const posts = blogs?.data;
  const [activeTab, setActiveTab] = useState("published");
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const filteredPosts = posts?.filter((p: any) =>
  //   activeTab === "published" ? p.status === "published" : p.status === "draft"
  // );

  const editdropdownActions = (post: any) => [
    {
      label: "View",
    },
    {
      label: "Edit",
      onClick: () => router.push(`/manage/storefront/blog/edit/${post.id}`),
    },
    {
      label: "Delete",
      onClick: async () => {
        const confirm = window.confirm("Delete blog?");
        if (!confirm) {
          return;
        } else {
          try {
            const resultAction = await dispatch(deleteBlog({ id: post?.id }));
            const result = (resultAction as any).payload;

            if ((resultAction as any).meta.requestStatus === "fulfilled") {
              console.log("✅ blog deleted successfully:", result);
              setTimeout(() => {
                refetchBlogs(dispatch);
              }, 700);
            } else {
              console.error("❌ Failed to delete blog:", result);
            }
          } catch (err) {
            console.error("❌ Unexpected error:", err);
          }
        }
      },
    },
    {
      label: "Unpublish",
    },
  ];

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h1 className="!font-light">Blog</h1>
        <Link
          href="https://nts-ecommerce.vercel.app/blogs"
          target="_blank"
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View blog <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className=" bg-white  rounded-md shadow-sm p-10 ">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {["published", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-xl font-medium transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-4 border-b border-gray-100 p-2 rounded-md bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Link href={"/manage/storefront/blog/add"}>
              <button title="New Post" className="btn-outline-primary">
                <Plus className="h-6 w-6" />
              </button>
            </Link>
            <button title="More Actions" className="btn-outline-primary">
              <MoreHorizontal className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm font-medium text-gray-700">
                Blog visibility
              </span>
              <Switch
                checked={visible}
                onCheckedChange={() => setVisible(!visible)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="!h-18">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published On</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <p className="text-red-600 font-semibold">
                    ⚠️ Failed to load blogs
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{error}</p>
                </TableCell>
              </TableRow>
            ) : posts?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-gray-500"
                >
                  No blog posts found.
                </TableCell>
              </TableRow>
            ) : (
              posts?.map((post: any) => (
                <TableRow key={post.id} className="!h-18">
                  <TableCell className="font-medium">
                    <Link
                      href={`/manage/storefront/blog/edit/${post.id}`}
                      className="text-blue-600 hover:border-b capitalize"
                    >
                      {post.title || "Untitled"}
                    </Link>
                  </TableCell>

                  <TableCell>{post.author || "—"}</TableCell>

                  <TableCell>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    <OrderActionsDropdown
                      actions={editdropdownActions(post)}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-xl cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <a
            href="#"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            View 10 <ChevronDown className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
