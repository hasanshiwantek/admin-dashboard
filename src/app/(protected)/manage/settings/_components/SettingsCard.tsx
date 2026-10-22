import PageTitle from "@/components/ui/PageTitle";
import { cn } from "@/lib/utils";
import { SettingsCardProps } from "./type";

// White card that groups related settings under a title
const SettingsCard = ({
  id,
  title,
  description,
  titleAdornment,
  action,
  children,
  className,
}: SettingsCardProps) => (
  <section
    id={id}
    className={cn(
      "flex flex-col gap-5 rounded-sm border border-gray-200 bg-white p-10",
      className,
    )}
  >
    {title && (
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <PageTitle
            title={title}
            description={description}
            hideActionButton
            containerClassName="mb-0"
            textContainerClassName="mb-0 gap-3"
            descriptionClassName="text-[1.4rem]! text-gray-600!"
          />
          {titleAdornment}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

export default SettingsCard;
