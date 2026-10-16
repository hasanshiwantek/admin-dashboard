import { cn } from "@/lib/utils";
import { LocalizationSidebarProps } from "./type";




const LocalizationSidebar = ({
  sections,
  activeSection,
  onSectionClick,
}: LocalizationSidebarProps) => {
  return (
    <aside className="sticky top-6 hidden lg:block">
      <nav className="flex flex-col">
        {sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <div
              key={section.id}
               
              onClick={() => onSectionClick(section.id)}
              aria-current={active ? "location" : undefined}
              className={cn(`border-l-2 cursor-pointer px-5 py-3 text-left text-[16px]! transition-colors ${
                active
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-[#303747] hover:text-blue-600"
              }`)}
            >
              {section.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default LocalizationSidebar;
