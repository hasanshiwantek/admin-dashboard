import BackNavigationButton from "@/components/ui/BackNavigationButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS_ROUTE } from "../constant";
import ProductStorefrontLink from "./ProductStorefrontLink";
import { HeaderRevealProps, ProductPageHeaderProps } from "./type";

// Folds its content away and fades it back in
const HeaderReveal = ({ open, children, className }: HeaderRevealProps) => (
  <div
    aria-hidden={!open}
    className={cn(
      "grid",
      open
        ? "grid-rows-[1fr] opacity-100 [transition:grid-template-rows_200ms_cubic-bezier(0.2,0,0,1),opacity_200ms_ease-out]"
        : "pointer-events-none grid-rows-[0fr] opacity-0 [transition:grid-template-rows_200ms_cubic-bezier(0.2,0,0,1),opacity_120ms_ease-out]",
      className,
    )}
  >
    <div className="min-h-0 overflow-hidden">{children}</div>
  </div>
);

// Sticky page header that collapses once the page scrolls: the back link and
// actions fold away, the title shrinks and a back arrow takes their place
const ProductPageHeader = ({
  compact,
  headerRef,
  title,
  storefrontUrl,
  action,
  onBack,
}: ProductPageHeaderProps) => (
  <header
    ref={headerRef}
    className={cn(
      "sticky top-0 z-30 -mx-20 border-b px-20 transition-[padding,background-color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      compact
        ? "border-border-light bg-white py-4 shadow-xs"
        : "border-border-light bg-store-bg pt-0 pb-6",
    )}
  >
    <div className="flex items-end justify-between gap-6">
      <div className="flex min-w-0 flex-col">
        <HeaderReveal open={!compact}>
          <BackNavigationButton
            label="View products"
            href={PRODUCTS_ROUTE}
            onClick={onBack}
            labelClassName="uppercase tracking-wide font-medium!"
            className="mb-3"
          />
        </HeaderReveal>
        <div className="flex min-w-0 items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Back to products"
            tabIndex={compact ? 0 : -1}
            onClick={onBack}
            className={cn(
              "shrink-0 overflow-hidden text-slate-gray-blue transition-[width,margin,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:text-deep-royal-blue",
              compact
                ? "mr-4 w-9 opacity-100"
                : "pointer-events-none mr-0 w-0 opacity-0",
            )}
          >
            <ArrowLeft className="size-7!" />
          </Button>
          <h1
            className={cn(
              "truncate font-light leading-tight text-text-primary-light transition-[font-size] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              compact ? "text-[2rem]!" : "text-[3.6rem]!",
            )}
          >
            {title}
          </h1>
          {storefrontUrl && (
            <span className="ml-4 shrink-0">
              <ProductStorefrontLink href={storefrontUrl} compact={compact} />
            </span>
          )}
        </div>
      </div>
      {action && (
        <HeaderReveal open={!compact} className="shrink-0">
          {action}
        </HeaderReveal>
      )}
    </div>
  </header>
);

export default ProductPageHeader;
