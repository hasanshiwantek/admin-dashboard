import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { paymentTabRoute } from "../constant";
import { OfflinePaymentMethodRowProps } from "./type";

const OfflinePaymentMethodRow = ({ method }: OfflinePaymentMethodRowProps) => (
  <div className="flex items-center justify-between gap-4 px-12 py-8">
    <p className="text-[1.5rem]! font-semibold text-text-heading!">
      {method.name}
    </p>
    <Button asChild variant="outline">
      <Link href={paymentTabRoute(method.tab)}>Set up</Link>
    </Button>
  </div>
);

export default OfflinePaymentMethodRow;
