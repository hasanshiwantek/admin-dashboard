"use client";

import AppTabs from "@/components/ui/AppTabs/AppTabs";
import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/ui/PageLayout";
import Link from "next/link";
import { BasicTaxTab, basicTaxTabRoute } from "../../constant";
import { TaxZoneShellProps } from "./type";

const TaxZoneShell = ({
  isNew,
  title,
  tabs,
  activeTab,
  handleTabChange,
  children,
}: TaxZoneShellProps) => (
  <PageLayout
    title={title}
    titleProps={{
      titleClassName:
        "text-[36px] font-light leading-tight text-text-primary-light",
      description: isNew
        ? "Configure the settings for this tax zone below. Tax zones let you specify different tax rates depending on your customer's location."
        : undefined,
      descriptionClassName: "text-[1.4rem]! text-text-heading!",
      textContainerClassName: "gap-10",
      action: (
        <Button asChild variant="outline" size="xl">
          <Link href={basicTaxTabRoute(BasicTaxTab.Zones)}>
            Back to tax zones page
          </Link>
        </Button>
      ),
    }}
  >
    {tabs.length > 0 && (
      <AppTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        variant="underline"
        className="mb-6"
        tabClassName="px-5 text-[1.4rem]! font-normal text-muted-plum-gray"
        activeTabClassName="border-primary-blue text-text-heading"
      />
    )}

    {children}
  </PageLayout>
);

export default TaxZoneShell;
