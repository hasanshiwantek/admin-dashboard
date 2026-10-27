import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import { SectionNavProps } from "./type";

// Sticky side nav for long forms; flags sections holding errors.
// Pair with useActiveSection and the helpers in ./utils
const SectionNav = ({
  sections,
  activeSection,
  onSectionClick,
}: SectionNavProps) => (
  <nav className="sticky top-6 hidden lg:block">
    <ListRenderer
      data={sections}
      keyExtractor={(section) => section.id}
      className="space-y-0!"
      renderItem={(section) => {
        const active = activeSection === section.id;

        return (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onSectionClick(section.id)}
            aria-current={active ? "location" : undefined}
            className={cn(
              "h-auto w-full justify-start gap-3 rounded-none border-l-2 px-5 py-3 text-[1.5rem]! font-normal hover:bg-transparent hover:text-primary-blue",
              active
                ? "border-primary-blue text-primary-blue"
                : "border-transparent text-text-heading",
            )}
          >
            {section.label}
            {section.hasError && (
              <CircleAlert
                aria-label="Has errors"
                className="size-6! fill-danger-red text-white"
              />
            )}
          </Button>
        );
      }}
    />
  </nav>
);

export default SectionNav;
