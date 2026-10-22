import { RowAction } from "@/components/ui/Table/types";
import { useRouter } from "next/navigation";
import { locationColumns } from "./columns";
import {
  ADD_LOCATION_ROUTE,
  defaultLocations,
  editLocationRoute,
} from "./constant";
import { Location } from "./type";

const useLocationsPageContainer = () => {
  const router = useRouter();

  const rowActions = (location: Location): RowAction<Location>[] => [
    {
      label: "Edit",
      onClick: () => router.push(editLocationRoute(location.id)),
    },
  ];

  return {
    locations: defaultLocations,
    loading: false,
    columns: locationColumns,
    rowActions,
    handleAddLocation: () => router.push(ADD_LOCATION_ROUTE),
  };
};

export default useLocationsPageContainer;
