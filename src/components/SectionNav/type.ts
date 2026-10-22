export interface SectionNavItem {
  id: string;
  label: string;
  hasError?: boolean;
}

export interface SectionNavProps {
  sections: SectionNavItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

// A page section: its element id, nav label and the form fields it holds
export interface SectionConfig<
  TField extends string = string,
  TId extends string = string,
> {
  id: TId;
  label: string;
  fields: TField[];
}
