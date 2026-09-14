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

export const AdvancedOptions = [
  { label: "Page Title", name: "pageTitle" },
  { label: "Meta Keywords", name: "metaKeywords" },
  { label: "Meta Description", name: "metaDescription" },
  { label: "Search Keywords", name: "searchKeywords" },
];

export const DefaultWebPageValues = {
  pageName: "",
  pageUrl: "",
  pageContent: "",
  templateLayoutFile: "default",
  displayAsHomePage: false,
  restrictToCustomersOnly: false,
  sortOrder: 0,
  link: "",
  emailQuestionsTo: "",
  showTheseFields: ["email", "comments"],
  rawHtml: "",
};
