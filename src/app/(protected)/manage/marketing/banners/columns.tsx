import EnableDisable from "@/components/common/EnableDisable";
import { ColumnDef } from "@/components/ui/Table/types";
import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime } from "@/lib/utils";
import { AppDispatch } from "@/redux/store";
import { capitalize } from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

type ColumnsProps = {
  router: AppRouterInstance;
  dispatch: AppDispatch;
  refetch: () => void;
  toggleEnable: (banner: any) => void;
};

const BannersColumn = ({
  router,
  dispatch,
  refetch,
  toggleEnable,
}: ColumnsProps): ColumnDef<any>[] => [
  {
    key: "title",
    header: "Banner name",
    sortable: true,
    className: "2xl:!text-[1.6rem]",
    render: (row) => (
      <Link
        href={`/manage/marketing/banners/${row?.id}/edit`}
        className="text-link 2xl:!text-[1.6rem]"
      >
        {row?.title}
      </Link>
    ),
  },
  {
    key: "locationType",
    header: "Location",
    sortable: true,
    className: "2xl:!text-[1.6rem]",
    render: (row) => capitalize(row?.locationType),
  },
  {
    key: "createdAt",
    header: "Date created",
    sortable: true,
    className: "2xl:!text-[1.6rem]",
    render: (row) => formatDateTime(row?.createdAt, DateTimeFormat.SHORT_DATE),
  },
  {
    key: "visible",
    header: "Visible",
    className: "2xl:!text-[1.6rem]",
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
