import { ReactNode } from "react";
import type useBasicTaxShellContainer from "../sharedContainer";

export type BasicTaxShellProps = ReturnType<typeof useBasicTaxShellContainer> & {
  children: ReactNode;
};

export interface BasicTaxSectionProps {
  title: string;
  /** Shown under the title, e.g. "Add a tax zone" */
  toolbar?: ReactNode;
  children: ReactNode;
}

export interface TaxClassRowProps {
  index: number;
  isDefault: boolean;
  isSaved: boolean;
  onAdd: (index: number) => void;
  onRemove: (index: number) => void;
}

export interface TaxClassesFieldsProps {
  rows: { key: string; isDefault: boolean; isSaved: boolean }[];
  onAdd: (index: number) => void;
  onRemove: (index: number) => void;
}
