
type Section = {
  id: string;
  label: string;
};

type LocalizationSidebarProps = {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
};

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
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionClick(section.id)}
              aria-current={active ? "location" : undefined}
              className={`border-l-2 px-5 py-3 text-left text-[16px]! transition-colors ${
                active
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-[#303747] hover:text-blue-600"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default LocalizationSidebar;
