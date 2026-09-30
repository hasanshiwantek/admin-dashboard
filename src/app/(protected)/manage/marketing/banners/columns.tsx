import EnableDisable from "@/components/common/EnableDisable";
import { ColumnDef } from "@/components/ui/Table/types";
import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import BannerLocationCell from "./BannerLocationCell";

type ColumnsProps = {
  toggleEnable: (banner: any) => void;
  baseUrl?: string;
};

const BannersColumn = ({
  toggleEnable,
  baseUrl,
}: ColumnsProps): ColumnDef<any>[] => [
  {
    key: "title",
    header: "Banner name",
    sortable: true,
    className: "2xl:text-[1.6rem]!",
    render: (row) => (
      <Link href={`/manage/marketing/banners/${row?.id}/edit`}>
        {row?.title}
      </Link>
    ),
  },
  {
    key: "locationType",
    header: "Location",
    sortable: true,
    className: "2xl:text-[1.6rem]!",
    render: (row) => <BannerLocationCell banner={row} baseUrl={baseUrl} />,
  },
  {
    key: "createdAt",
    header: "Date created",
    sortable: true,
    className: "2xl:text-[1.6rem]!",
    render: (row) => formatDateTime(row?.createdAt, DateTimeFormat.SHORT_DATE),
  },
  {
    key: "visible",
    header: "Visible",
    className: "2xl:text-[1.6rem]!",
    render(row) {
      return (
        <EnableDisable
          data={row}
          enabled={row?.visible}
          handleToggle={toggleEnable}
        />
      );
    },
  },
];

export default BannersColumn;
