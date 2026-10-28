import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";
import { ProductStorefrontLinkProps } from "./type";

const ProductStorefrontLink = ({ href, compact }: ProductStorefrontLinkProps) => (
  <Button
    asChild
    variant="link"
    className="h-auto gap-2 p-0 text-[1.6rem]! font-normal"
  >
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={compact ? "View on storefront" : undefined}
    >
      {!compact && "View on Storefront"}
      <ExternalLink className="size-6!" />
    </a>
  </Button>
);

export default ProductStorefrontLink;
