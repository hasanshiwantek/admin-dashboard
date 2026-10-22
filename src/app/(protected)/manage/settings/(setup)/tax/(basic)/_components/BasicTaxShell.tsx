"use client";

import AppTabs from "@/components/ui/AppTabs/AppTabs";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/ui/PageLayout";
import Link from "next/link";
import { TAX_ROUTE } from "../../constant";
import { BasicTaxShellProps } from "./type";

const BasicTaxShell = ({
  tabs,
  activeTab,
  handleTabChange,
  children,
}: BasicTaxShellProps) => (
  <PageLayout
    title="Tax"
    titleProps={{
      titleClassName:
        "text-[36px] font-light leading-tight text-text-primary-light",
      action: (
        <Button asChild size="xl" className="btn-primary">
          <Link href={TAX_ROUTE}>Back to configured services</Link>
        </Button>
      ),
    }}
  >
    <AppTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      variant="underline"
      className="mb-6"
      tabClassName="px-5 text-[1.4rem]! font-normal text-muted-plum-gray"
      activeTabClassName="border-primary-blue text-text-heading"
    />

    {children}
  </PageLayout>
);

export default BasicTaxShell;
