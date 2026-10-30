import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import SectionCard from "@/components/SectionCard/SectionCard";
import { BASIC_TAX_ROUTE } from "../constant";
import { TaxRulesSectionProps } from "./type";

const TaxRulesSection = ({ basicTaxEnabled, stats }: TaxRulesSectionProps) => (
  <SectionCard
    title="Tax rules"
    className="border-0 shadow-sm"
    titleClassName="text-[2.2rem]! font-semibold! text-text-heading!"
  >
    <SectionCard
      title="Basic Tax"
      titleClassName="text-[2rem]! font-normal! text-text-heading!"
      titleAdornment={
        <StatusBadge tone={basicTaxEnabled ? "success" : "neutral"}>
          {basicTaxEnabled ? "Enabled" : "Disabled"}
        </StatusBadge>
      }
      action={
        <Button asChild variant="outline">
          <Link href={BASIC_TAX_ROUTE}>Edit</Link>
        </Button>
      }
      className="p-8"
    >
      <p className="max-w-[84rem] text-[1.4rem]! leading-relaxed text-muted-plum-gray!">
        Configure your own tax classes, rates and zones. Basic tax will be used
        if your tax service is not targeted to a given country/subdivision, or
        is unavailable during a purchase. Basic tax rules will be used to
        display tax on your storefronts, when applicable.
      </p>

      <ListRenderer
        data={stats}
        keyExtractor={(stat) => stat.key}
        className="grid! max-w-[85rem] grid-cols-3 gap-6 space-y-0!"
        renderItem={(stat) => (
          <div className="flex flex-col items-center gap-2 rounded-sm bg-slate-100 px-6 py-8">
            <span className="text-[2.8rem] font-light text-text-heading">
              {stat.count}
            </span>
            <span className="text-[1.4rem] text-text-heading">
              {stat.label}
            </span>
          </div>
        )}
      />
    </SectionCard>
  </SectionCard>
);

export default TaxRulesSection;
