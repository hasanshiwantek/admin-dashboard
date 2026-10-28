export interface SectionNavItem {
  id: string;
  label: string;
  hasError?: boolean;
  /** Draws a divider above the item, starting a new group */
  separatorBefore?: boolean;
}

export interface SectionNavProps {
  sections: SectionNavItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  /** e.g. a larger `top` while a sticky page header covers the default */
  className?: string;
}

// A page section: its element id, nav label and the form fields it holds
export interface SectionConfig<
  TField extends string = string,
  TId extends string = string,
> {
  id: TId;
  label: string;
  fields: TField[];
  separatorBefore?: boolean;
}
