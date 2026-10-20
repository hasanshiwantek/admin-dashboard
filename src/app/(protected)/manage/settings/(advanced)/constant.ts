// Advanced settings live in the (advanced) route group, so their URLs sit
// directly under /manage/settings (matching the settings list links)
export const SETTINGS_ROUTE = "/manage/settings";
export const STORE_LOGS_ROUTE = `${SETTINGS_ROUTE}/logs`;
export const USERS_ROUTE = `${SETTINGS_ROUTE}/users`;
export const ADD_USER_ROUTE = `${USERS_ROUTE}/add`;
export const editUserRoute = (id: number | string) => `${USERS_ROUTE}/${id}`;

// Shared title style for the advanced settings pages
export const ADVANCED_TITLE_PROPS = {
  titleClassName: "text-[3.8rem]! font-light! text-gray-900!",
  descriptionClassName: "text-[1.4rem]! text-gray-600!",
};
