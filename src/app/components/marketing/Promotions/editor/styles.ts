/** Body text size used across the promotion editor. */
export const TEXT = "text-xl! 2xl:text-[1.6rem]!";

/** Field label / sub-heading. */
export const LABEL = "text-xl! 2xl:text-[1.6rem]! font-semibold! text-gray-800";

/** Section card (`Card`) and its parts. */
export const CARD = "rounded-sm shadow-sm border-0 p-10 gap-6";
export const CARD_HEADER = "px-0 items-center";
export const CARD_TITLE =
  "flex items-center gap-3 text-3xl! 2xl:text-[2.4rem]! font-normal! text-gray-800";
export const CARD_DESCRIPTION = `${TEXT} text-gray-700`;

/** `Button variant="link"` styled as BigCommerce's blue text actions. */
export const LINK_BUTTON = `${TEXT} h-auto p-0! text-blue-600! [&_svg]:size-7!`;

/** `Button variant="ghost" size="icon"` for row trash / edit icons. */
export const ICON_BUTTON = "size-13 text-blue-600 hover:text-blue-800 [&_svg]:size-7!";

/** `SelectField` sized for the inline rule sentences. */
export const SELECT = `${TEXT} w-auto min-w-[22rem] font-normal! bg-white border-[#d1d0d4]`;

/** `DatePicker` sized to sit next to a `TimeSelect`. */
export const DATE_PICKER = `${TEXT} w-[22rem] h-13 p-4! my-0! border-[#d1d0d4] text-gray-700! hover:bg-white`;

/** date-fns format, e.g. "Thu, Jan 08, 2026". */
export const DATE_FORMAT = "EEE, MMM dd, yyyy";

/** Primary action button text. */
export const PRIMARY_BUTTON = `btn-primary ${TEXT}`;

/** Validation message spacing. */
export const ERROR = "text-lg! 2xl:text-[1.4rem]! mt-2";
