import { FieldErrors, FieldValues } from "react-hook-form";
import { SectionConfig, SectionNavItem } from "./type";

export const sectionHasErrors = <T extends FieldValues>(
  section: SectionConfig,
  errors: FieldErrors<T>,
) => section.fields.some((field) => field in errors);

// Where to scroll after a failed submit
export const getFirstSectionWithErrors = <
  T extends FieldValues,
  S extends SectionConfig,
>(
  sections: S[],
  errors: FieldErrors<T>,
) => sections.find((section) => sectionHasErrors(section, errors));

// SectionNav items, flagging sections that hold an error
export const getNavSections = <T extends FieldValues>(
  sections: SectionConfig[],
  errors: FieldErrors<T>,
): SectionNavItem[] =>
  sections.map((section) => ({
    id: section.id,
    label: section.label,
    hasError: sectionHasErrors(section, errors),
  }));
