const LOWERCASE_WORDS = ["and", "of", "the"];

// "ANTIGUA AND BARBUDA" -> "Antigua and Barbuda"
export const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index > 0 && LOWERCASE_WORDS.includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");

export const countriesHint = (paymentOption: string) =>
  `If the customer's billing country matches any of the available countries then they will have the option to ${paymentOption}.`;
