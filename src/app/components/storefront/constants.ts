export enum PageTypeEnums {
  WYSIWYG = "1",
  Link = "2",
  ContactForm = "3",
  RawHTML = "4",
}

export const ContactFields = [
  { id: "email", label: "Email Address", locked: true },
  { id: "comments", label: "Question/Comment", locked: true },
  { id: "full_name", label: "Full Name", locked: false },
  { id: "company_name", label: "Company Name", locked: false },
  { id: "phone_number", label: "Phone Number", locked: false },
  { id: "order_number", label: "Order Number", locked: false },
  { id: "rma_number", label: "RMA Number", locked: false },
];

export const PageTypeOptions = [
  {
    label: "Contain content created using the WYSIWYG editor below",
    value: PageTypeEnums.WYSIWYG,
  },
  { label: "Link to another website or document", value: PageTypeEnums.Link },
  {
    label: "Allow people to send questions/comments via a contact form",
    value: PageTypeEnums.ContactForm,
  },
  {
    label: "Contain raw HTML entered in the text area below",
    value: PageTypeEnums.RawHTML,
  },
];

export const WebPageField = {
  PageType: "pageType",
  PageName: "pageName",
  PageUrl: "pageUrl",
  PageContent: "pageContent",
  Link: "link",
  EmailQuestionsTo: "emailQuestionsTo",
  ShowTheseFields: "showTheseFields",
  ShowInNavigation: "showInNavigation",
  ParentPage: "parentPage",
  RestrictToCustomersOnly: "restrictToCustomersOnly",
  SortOrder: "sortOrder",
  RawHtml: "rawHtml",
  PageTitle: "pageTitle",
  MetaKeywords: "metaKeywords",
  MetaDescription: "metaDescription",
  SearchKeywords: "searchKeywords",
} as const;
export const AdvancedOptions = [
  { label: "Page Title", name: WebPageField.PageTitle },
  { label: "Meta Keywords", name: WebPageField.MetaKeywords },
  { label: "Meta Description", name: WebPageField.MetaDescription },
  { label: "Search Keywords", name: WebPageField.SearchKeywords },
];
export const DefaultWebPageValues = {
  [WebPageField.PageType]: PageTypeEnums.WYSIWYG,
  [WebPageField.PageName]: "",
  [WebPageField.PageUrl]: "",
  [WebPageField.PageContent]: "",
  [WebPageField.Link]: "",
  [WebPageField.EmailQuestionsTo]: "",
  [WebPageField.ShowTheseFields]: ["email", "comments"],
  [WebPageField.ShowInNavigation]: false,
  [WebPageField.ParentPage]: "",
  [WebPageField.RestrictToCustomersOnly]: false,
  [WebPageField.SortOrder]: 0,
  [WebPageField.RawHtml]: "",
  [WebPageField.PageTitle]: "",
  [WebPageField.MetaKeywords]: "",
  [WebPageField.MetaDescription]: "",
  [WebPageField.SearchKeywords]: "",
};
