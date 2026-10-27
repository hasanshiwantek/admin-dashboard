import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import Link from "next/link";

export const getBlogColumns = () => [
  {
    key: "title",
    header: "Title",
    width: "40%",
    headClassName: "2xl:text-[1.6rem]!",
    className: "whitespace-normal break-words",
    render: (post: any) => (
      <Link
        href={`/manage/storefront/blog/edit/${post.id}`}
        className="text-blue-600 hover:underline capitalize 2xl:text-2xl! font-medium"
      >
        {post?.title || "Untitled"}
      </Link>
    ),
  },
{
  key: "author",
  header: "Author",
  width: "25%",
  headClassName: "2xl:text-[1.6rem]!",
  className: "2xl:text-2xl! ",
  render: (post: any) => (
    <div className="block whitespace-normal break-words">
    {replaceNullWithPlaceholder(post.author, "—")}
    </div>
  ),
},
  {
    key: "createdAt",
    header: "Published On",
    width: "25%",
    headClassName: "2xl:text-[1.6rem]!",
    className: "2xl:text-2xl!",
    render: (post: any) => formatDateTime(post?.createdAt),
  },
];
