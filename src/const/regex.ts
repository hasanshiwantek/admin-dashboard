export const REGEX = {
  // Slug
  PRODUCT_SLUG_INVALID_CHARS: /[^a-z0-9]+/g,
  PRODUCT_SLUG_CONSECUTIVE_HYPHENS: /-+/g,
  PRODUCT_SLUG_EDGE_HYPHENS: /^-+|-+$/g,

  // URL
  PRODUCT_URL_PLACEHOLDER: /%[^%]+%/g,
  PRODUCT_URL_MULTIPLE_SLASHES: /\/+/g,
  PRODUCT_URL_TRAILING_SLASH: /\/$/g,
  PRODUCT_URL_NORMALIZE: /^\/+|\/+$/g,

  // Numeric input
  NUMERIC_DIGIT: /^\d$/,
  WHOLE_NUMBER: /^\d+$/,
  DECIMAL_SANITIZE: /[^\d.]/g,
  DECIMAL_DUPLICATE_POINT: /\.(.*)\./g,
  DECIMAL_LEADING_ZEROS: /^0+(?=\d)/,
  SLUG_BLOCKED_CHARS: /[#$*&@!=+%`'":;<>{}[]|]/,

  // Blocked characters (for Page URL)
  URL_BLOCKED_CHARS: /[$*&@!=+%`'"^|]/,

  //Email
  EMAIL_LOCAL_PART: /^[^\s@]+$/,

  HAS_LETTER: /[a-zA-Z]/,
  HAS_NUMBER: /\d/,

  // HTTPS URL
  HTTPS_PREFIX: /^https:\/\//i,
};
