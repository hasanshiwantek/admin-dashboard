"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { useAccess } from "@/hooks/useAccess";
import { useMemo } from "react";
import SettingsRouteItem from "./_components/SettingsRouteItem";
import { SettingsRoutesList } from "./constant";
import { SettingRoute } from "./types";

const SettingsPage = () => {
  const {  filterByAccess } = useAccess();

  // Drop groups/routes whose checks or permissions don't pass
  const settingsRoutes = useMemo(
    () =>
      filterByAccess(SettingsRoutesList)
        .map((group) => ({ ...group, routes: filterByAccess(group.routes) }))
        .filter((group) => group.routes.length),
    [filterByAccess],
  );

  return (
    <PageLayout>
      <PageTitle title="Settings" hideActionButton />
      <ListRenderer
        data={settingsRoutes}
        keyExtractor={(group) => group.group}
        className="space-y-[1.6rem]!"
        renderItem={(group) => (
          <div className="bg-white rounded-md shadow-sm p-[2.4rem]">
            <PageTitle
              title={group.group}
              titleClassName="text-[2.4rem]! font-normal! text-gray-800"
              textContainerClassName="mb-0"
              containerClassName="mb-[1.6rem]"
              hideActionButton
            />
            <ListRenderer
              data={group.routes}
              keyExtractor={(route) => route.id}
              className="space-y-0!"
              renderItem={(route: SettingRoute) => (
                <SettingsRouteItem route={route} />
              )}
            />
          </div>
        )}
      />
    </PageLayout>
  );
};

export default SettingsPage;
