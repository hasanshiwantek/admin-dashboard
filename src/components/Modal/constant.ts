import { ModalSize } from "./type";

export const MODAL_SIZE_CLASS: Record<ModalSize, string> = {
  sm: "sm:max-w-[480px]",
  md: "sm:max-w-[600px]",
  lg: "sm:max-w-[700px]",
  xl: "sm:max-w-[760px]",
};

export const MODAL_CONTENT_CLASS =
  "flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0";
export const MODAL_HEADER_CLASS = "shrink-0 border-b px-6 pt-6 pb-4";
export const MODAL_TITLE_CLASS = "text-xl font-semibold text-text-heading-light";
export const MODAL_DESCRIPTION_CLASS = "text-sm text-gray-500";
// With tabs, the tab bar's own bottom border is the header divider, so the
// header drops its border and bottom padding (otherwise two lines show)
export const MODAL_HEADER_WITH_TABS_CLASS = "border-b-0 pb-0";
// AppTabs underline bar, flush under the header
export const MODAL_TABS_CLASS = "mb-0 shrink-0 bg-white px-6 pt-4";

// <Form> is styled for full pages (card body, fixed footer); these classes
// make its body scroll inside the dialog
export const MODAL_FORM_CLASS = "flex-1 overflow-hidden pb-0!";
export const MODAL_BODY_CLASS =
  "flex flex-1 flex-col gap-6 overflow-y-auto rounded-none border-0 px-6 py-6";
// While loading the body stops scrolling so the overlay covers what's visible
export const MODAL_BODY_LOADING_CLASS = "relative overflow-hidden";
export const MODAL_ERROR_CLASS =
  "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700";
export const MODAL_FOOTER_CLASS =
  "flex shrink-0 items-center justify-end gap-4 border-t bg-white px-6 py-4";
