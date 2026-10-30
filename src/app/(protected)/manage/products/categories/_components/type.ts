import { ActionItem } from "@/components/ActionButton/type";
import { ActionEnums } from "@/const/appConstants";
import { ReactNode, Ref } from "react";
import type { CategoryNode, CategoryPick } from "../type";

export interface CategoryRowProps {
  category: CategoryNode;
  level?: number;
  selectedIds: number[];
  expandedIds: Set<number>;
  /** The dragged category and its sub-categories: they can't take the drop */
  blockedDropIds: number[];
  onToggleSelect: (category: CategoryNode, checked: boolean) => void;
  onToggleExpand: (id: number) => void;
  onToggleVisibility: (category: CategoryNode, visible: boolean) => void;
  onAction: (category: CategoryNode) => (action: ActionEnums) => void;
}

export interface CategoryRootDropZoneProps {
  /** The dragged category is already top-level */
  disabled: boolean;
}

export interface CategoryFieldLabelProps {
  text: string;
  optional?: boolean;
  tooltip?: string;
  description?: string;
}

export interface CategoryFormSectionProps {
  title: string;
  children: ReactNode;
}

export interface CategoryFormFieldsProps {
  categoryTree: CategoryNode[];
  channelOptions: { value: string; label: string }[];
  onNameChange: (change: { name: string; value: unknown }) => void;
  onSlugChange: () => void;
  onResetSlug: () => void;
}

export interface CategoryPagerProps {
  current: number;
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export interface CategoryFormHeaderProps<T> {
  title: string;
  pager: CategoryPagerProps | null;
  record: T | null;
  actions: ActionItem[];
  onAction: (record: T) => (action: ActionEnums) => void;
}

export interface CategoryImageFieldProps {
  value?: File | string | null;
  onChange?: (value: File | null) => void;
  onBlur?: () => void;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export interface SortOrderStepperProps {
  value?: number | string | null;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  min?: number;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export interface CategorySearchProps {
  categoryTree: CategoryNode[];
  value: CategoryPick;
  onChange: (pick: { id: number; path: string }) => void;
  onClear: () => void;
}
