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
  LEADING_SLASHES: /^\/+/,
  TRAILING_SLASHES: /\/+$/,

  // HTML
  // An <img>, <video> or <iframe> tag: shows something even with no text
  HTML_MEDIA_TAG: /<(img|video|iframe)\b/i,
  HTML_TAGS_AND_NBSP: /<[^>]*>|&nbsp;/g,

  // Numeric input
  NUMERIC_DIGIT: /^\d$/,
  WHOLE_NUMBER: /^\d+$/,
  DECIMAL_SANITIZE: /[^\d.]/g,
  DECIMAL_DUPLICATE_POINT: /\.(.*)\./g,
  DECIMAL_LEADING_ZEROS: /^0+(?=\d)/,
  // Gap before each group of three digits from the right, e.g. 1|234|567
  THOUSANDS_GROUP: /\B(?=(\d{3})+(?!\d))/g,
  SLUG_BLOCKED_CHARS: /[#$*&@!=+%`'":;<>{}[]|]/,

  // Blocked characters (for Page URL)
  URL_BLOCKED_CHARS: /[$*&@!=+%`'"^|]/,
};
