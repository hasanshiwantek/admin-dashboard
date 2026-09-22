import { Plus } from "lucide-react";
import Link from "next/link";
import { Button, ButtonProps } from "./button";

const PageTile = ({
  title = "",
  buttonProps = {
    size: "xl",
    className:
      "!text-2xl 2xl:!text-[1.6rem] btn-primary !flex !justify-start !items-center",
  },
}: {
  title: string;
  buttonProps?: ButtonProps;
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="!text-5xl 2xl:!text-[3.2rem] !font-extralight !text-gray-600 !my-5">
        {title}
      </h1>
      <Link href={"/manage/products/add"}>
        <Button {...buttonProps}>
          <Plus className="!w-6 !h-6" /> Add new
        </Button>
      </Link>
    </div>
  );
};

export default PageTile;
