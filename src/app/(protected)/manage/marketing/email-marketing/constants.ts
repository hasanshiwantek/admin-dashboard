import type { EmailMarketingGeneralSettings } from "./types";

export enum EmailMarketingFormNames {
  AllowNewsletterSubscriptions = "allowNewsletterSubscriptions",
  CheckNewsletterBoxByDefault = "checkNewsletterBoxByDefault",
  ShowNewsletterSummary = "showNewsletterSummary",
  NewsletterSummaryText = "newsletterSummaryText",
}

export const EmailMarketingGeneralSettingsDefaultValues: EmailMarketingGeneralSettings =
  {
    [EmailMarketingFormNames.AllowNewsletterSubscriptions]: true,
    [EmailMarketingFormNames.CheckNewsletterBoxByDefault]: false,
    [EmailMarketingFormNames.ShowNewsletterSummary]: false,
    [EmailMarketingFormNames.NewsletterSummaryText]: "",
  };
