import PageTitle from "@/components/ui/PageTitle";
import { cn } from "@/lib/utils";
import { SettingsCardProps } from "./type";

// White card that groups related settings under a title
const SettingsCard = ({
  title,
  description,
  children,
  className,
}: SettingsCardProps) => (
  <section
    className={cn(
      "flex flex-col gap-5 rounded-sm border border-gray-200 bg-white p-6",
      className,
    )}
  >
    {title && (
      <PageTitle
        title={title}
        description={description}
        hideActionButton
        containerClassName="mb-0"
        textContainerClassName="mb-0 gap-3"
        descriptionClassName="text-[1.4rem]! text-gray-600!"
      />
    )}
    {children}
  </section>
);

export default SettingsCard;
