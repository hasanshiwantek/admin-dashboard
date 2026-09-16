export type WebPageFormValues = {
  pageType: string; // add this
  pageName: string;
  pageUrl: string;
  pageContent: string;
  parentPage: string;
  template: string;
  pageTitle: string;
  showInNavigation: boolean;
  metaKeywords: string;
  metaDescription: string;
  searchKeywords: string;
  templateLayoutFile: string;
  displayAsHomePage: boolean;
  restrictToCustomersOnly: boolean;
  sortOrder: string | number;
  link: string;
  emailQuestionsTo: string;
  showTheseFields: string[];
  rawHtml: string;
};
