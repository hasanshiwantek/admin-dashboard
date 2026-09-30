import type { EmailMarketingFormNames } from "./constants";

export interface EmailMarketingGeneralSettings {
  [EmailMarketingFormNames.AllowNewsletterSubscriptions]: boolean;
  [EmailMarketingFormNames.CheckNewsletterBoxByDefault]: boolean;
  [EmailMarketingFormNames.ShowNewsletterSummary]: boolean;
  [EmailMarketingFormNames.NewsletterSummaryText]: string;
}
