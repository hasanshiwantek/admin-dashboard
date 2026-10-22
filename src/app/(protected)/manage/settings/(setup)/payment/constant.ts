import { countriesListIconsRaw } from "@/const/location";
import type { SelectOption } from "@/components/ui/select";
import type {
  OfflinePaymentMethodConfig,
  PaymentConfigFormValues,
  PaymentCurrencyFormValues,
} from "./type";
import { toTitleCase } from "@/lib/utils";
import { countriesHint } from "./utils";

export const PAYMENT_ROUTE = "/manage/settings/payment";
export const PAYMENT_METHODS_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Online-Payment-Methods";

// Values are the URL slugs under PAYMENT_ROUTE
export enum PaymentTab {
  Configuration = "configuration",
  BankDeposit = "bankdeposit",
  CashOnDelivery = "cod",
  Check = "cheque",
  MoneyOrder = "moneyorder",
  PayInStore = "instore",
}

export const paymentTabRoute = (tab: PaymentTab) =>
  tab === PaymentTab.Configuration ? PAYMENT_ROUTE : `${PAYMENT_ROUTE}/${tab}`;

export enum Currency {
  USD = "USD",
}

export const currencyOptions: SelectOption[] = [
  { value: Currency.USD, label: "USD (US Dollars)" },
];

export const ALL_COUNTRIES = "all";

export const availableCountryOptions: SelectOption[] = [
  { value: ALL_COUNTRIES, label: "-- All countries --" },
  ...countriesListIconsRaw
    // The source list has TLS twice (East Timor, Timor-Leste); keep the first
    .filter(
      ({ value }, index, list) =>
        value !== "not-specified" &&
        list.findIndex((country) => country.value === value) === index,
    )
    .map(({ value, label }) => ({ value, label: toTitleCase(label) })),
];

export enum OfflinePaymentFormNames {
  DisplayName = "displayName",
  AvailableCountries = "availableCountries",
  Instructions = "instructions",
}

const DISPLAY_NAME_HINT =
  "The text in this box will be used to describe this payment method on your site.";
const AMOUNT_SHOWN_NOTE = "Keep in mind, the amount due is already shown.";

const offlinePaymentDefaults = (displayName: string, instructions: string) => ({
  [OfflinePaymentFormNames.DisplayName]: displayName,
  [OfflinePaymentFormNames.AvailableCountries]: [ALL_COUNTRIES],
  [OfflinePaymentFormNames.Instructions]: instructions,
});

export const offlinePaymentMethods: OfflinePaymentMethodConfig[] = [
  {
    tab: PaymentTab.BankDeposit,
    name: "Bank deposit",
    displayNameLabel: "Display Name",
    displayNameHint: DISPLAY_NAME_HINT,
    countriesLabel: "Available Countries",
    countriesHint: countriesHint("pay by bank deposit"),
    instructionsLabel: "Account Information",
    instructionsHint: `If a customer chooses to pay by bank deposit, they'll be shown the text you type into this box once they've completed their order. You should include any info the customer needs in order to finish paying. ${AMOUNT_SHOWN_NOTE} Type in %%OrderID%% to insert the order ID.`,
    defaults: offlinePaymentDefaults(
      "Bank deposit",
      [
        "Bank Name: ACME Bank",
        "Bank Branch: New York",
        "Account Name: John Smith",
        "Account Number: XXXXXXXXXXXX",
        "",
        "Type any special instructions in here.",
      ].join("\n"),
    ),
  },
  {
    tab: PaymentTab.CashOnDelivery,
    name: "Cash on delivery",
    displayNameLabel: "Display name",
    displayNameHint:
      "The text in this box will be used to label this payment method on your store.",
    countriesLabel: "Available countries",
    countriesHint: countriesHint("pay by cash on delivery"),
    instructionsLabel: "Delivery information",
    instructionsHint: `If a customer chooses to pay by cash on delivery, they'll be shown the text you type into this box once they've completed their order. You should include any info the customer needs in order to finish paying. ${AMOUNT_SHOWN_NOTE}`,
    defaults: offlinePaymentDefaults(
      "Cash on delivery",
      "Type your cash on delivery instructions in here.",
    ),
  },
  {
    tab: PaymentTab.Check,
    name: "Check",
    displayNameLabel: "Display Name",
    displayNameHint: DISPLAY_NAME_HINT,
    countriesLabel: "Available Countries",
    countriesHint: countriesHint("pay by check"),
    instructionsLabel: "Payment Information",
    instructionsHint: `If a customer chooses to pay by check, they'll be shown the text you type into this box once they've completed their order. You should tell customers where to send the check and any other information they need to finish paying. ${AMOUNT_SHOWN_NOTE}`,
    defaults: offlinePaymentDefaults(
      "Check",
      "Type instructions to pay by check in here.",
    ),
  },
  {
    tab: PaymentTab.MoneyOrder,
    name: "Money order",
    displayNameLabel: "Display Name",
    displayNameHint: DISPLAY_NAME_HINT,
    countriesLabel: "Available Countries",
    countriesHint: countriesHint("pay by money order"),
    instructionsLabel: "Payment Information",
    instructionsHint: `If a customer chooses to pay by money order, they'll be shown the text you type into this box once they've completed their order. You should tell customers where to send the money order and any other information they need to finish paying. ${AMOUNT_SHOWN_NOTE}`,
    defaults: offlinePaymentDefaults(
      "Money order",
      "Type instructions to pay by money order in here.",
    ),
  },
  {
    tab: PaymentTab.PayInStore,
    name: "Pay in-store",
    displayNameLabel: "Display Name",
    displayNameHint: DISPLAY_NAME_HINT,
    countriesLabel: "Available Countries",
    countriesHint: countriesHint("pay in store"),
    instructionsLabel: "Payment Information",
    instructionsHint: `If a customer chooses to pay in-store, they'll be shown the text you type into this box once they've completed their order. You should include any info the customer needs in order to finish paying. ${AMOUNT_SHOWN_NOTE}`,
    defaults: offlinePaymentDefaults(
      "Pay in Store",
      "Type instructions to pay by visiting your retail store in here.",
    ),
  },
];

export const paymentTabs = [
  { key: PaymentTab.Configuration, label: "Payment configuration" },
  ...offlinePaymentMethods.map(({ tab, name }) => ({ key: tab, label: name })),
];

export const TEST_CARD_NUMBER = "4111 1111 1111 1111";

export enum PaymentCurrencyFormNames {
  Currency = "currency",
}

export const paymentCurrencyDefaults: PaymentCurrencyFormValues = {
  [PaymentCurrencyFormNames.Currency]: Currency.USD,
};

export enum PaymentConfigFormNames {
  TestCardPayments = "testCardPayments",
}

export const paymentConfigDefaults: PaymentConfigFormValues = {
  [PaymentConfigFormNames.TestCardPayments]: true,
};
