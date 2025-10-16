"use client";

import { useState, useRef, useEffect } from "react";
import {
  useForm,
  FormProvider,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createWebpage,
  getWebPageById,
  updateWebPage,
} from "@/redux/slices/storefrontSlice";
import { useRouter, useParams } from "next/navigation";
const templates = [
  { label: "-- No Parent Page --", value: "" },
  { label: "Product Condition", value: "172" },
  { label: "Help Center", value: "40" },
  { label: "Shipping Policy", value: "67" },
  { label: "Return Policy", value: "85" },
  { label: "Refund Policy", value: "170" },
  { label: "Terms & Conditions", value: "5" },
  { label: "Warranty", value: "8" },
  { label: "Can I Undo My Canceled Order?", value: "128" },
  { label: "Orders by Phone, fax, or Email", value: "129" },
  { label: "Refund Process", value: "145" },
  { label: "Benefits Of An Account", value: "38" },
  { label: "Currently Unavailable Items", value: "25" },
  { label: "Editing An Order", value: "20" },
  { label: "Editing Or Canceling A Return", value: "23" },
  { label: "Email Notifications", value: "15" },
  { label: "How to track a package", value: "29" },
  { label: "New Items", value: "57" },
  { label: "Open Box Items", value: "54" },
  { label: "PC Assembling Services", value: "55" },
  { label: "Price Match Guarantee", value: "32" },
  { label: "Problems Logging In", value: "39" },
  { label: "Products Specifications And Details", value: "24" },
  { label: "Products Warranties", value: "26" },
  { label: "Refurbished Items", value: "56" },
  { label: "Reporting a delivery issue", value: "28" },
  { label: "Resolving a Declined", value: "33" },
  {
    label: "Return Shipping Fees, Full Refunds & Partial Refunds",
    value: "21",
  },
  { label: "Time Sync Error", value: "37" },
  { label: "Track An Order", value: "14" },
  { label: "U.S. Payment Methods", value: "34" },
  { label: "U.S. shipping policy", value: "27" },
  { label: "Payment Policy", value: "12" },
  { label: "Shipping & Returns", value: "2" },
  { label: "About Us", value: "7" },
  { label: "Contact Us", value: "4" },
  { label: "Blog", value: "3" },
];

type FormValues = {
  pageType: "wysiwyg" | "link" | "contact" | "rawHtml"; // add this
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
};

const WebPage = () => {
  const [pageType, setPageType] = useState("wysiwyg");
  const methods = useForm<FormValues>({
    defaultValues: {
      pageName: "",
      pageUrl: "",
      pageContent: "",
      templateLayoutFile: "default",
      displayAsHomePage: false,
      restrictToCustomersOnly: false,
      sortOrder: 0,
    },
  });

  const { control, setValue, watch, register, handleSubmit, reset } = methods;
  const selected = watch("template");
  const pageContent = watch("pageContent");
  const editorRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();
  console.log("Id For Edit: ", id);

  const isEdit = !!id;

  const options = [
    {
      id: "wysiwyg",
      label: "Contain content created using the WYSIWYG editor below",
    },
    { id: "link", label: "Link to another website or document" },
    {
      id: "contact",
      label: "Allow people to send questions/comments via a contact form",
    },
    { id: "rawHtml", label: "Contain raw HTML entered in the text area below" },
  ];

  // Fetch page data if editing
  useEffect(() => {
    if (isEdit && id) {
      const fetchPage = async () => {
        try {
          const result = await dispatch(getWebPageById({ id: id }));
          if (getWebPageById.fulfilled.match(result)) {
            reset(result?.payload?.data);
            console.log("Web page by id: ", result?.payload);
          } else {
            console.error("Failed to fetch page:", result.payload);
          }
        } catch (err) {
          console.error("Error fetching page:", err);
        }
      };
      fetchPage();
    }
  }, [isEdit, id, dispatch, reset]);

  // Submission handler
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(isEdit ? "Editing page" : "Creating page", data);

    try {
      let result;
      if (isEdit && id) {
        result = await dispatch(updateWebPage({ id, data }));
      } else {
        result = await dispatch(createWebpage({ data }));
      }

      if ((isEdit ? updateWebPage : createWebpage).fulfilled.match(result)) {
        console.log("Success:", result.payload?.message);
        router.push("/manage/storefront/web-pages");
        reset();
      } else {
        console.error("Error:", result.payload);
      }
    } catch (err) {
      console.error("Something went wrong!", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 space-y-5">
          <div className="flex flex-col space-y-5 mt-10">

            <h1 className="!font-extralight">Edit a Web Page</h1>
            <p>
              To create a web page (such as an "About Us" page or a contact
              form), start by choosing the type of page you want and then fill
              in the other details.
            </p>
          </div>
          {/* PAGE TYPE */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg">Page Type</h1>
            <div className="bg-white shadow-md p-10">
              <Controller
                name="pageType" // must exist in FormValues
                control={control}
                defaultValue="wysiwyg"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-2"
                  >
                    {options.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-start space-x-3 ml-60"
                      >
                        <RadioGroupItem id={opt.id} value={opt.id} />
                        <Label htmlFor={opt.id}>{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          {/* WEB PAGE DETAILS */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg">Web Page Details</h1>
            <div className="bg-white shadow-md p-10 space-y-5">
              {[
                { label: "Page Name", name: "pageName" },
                { label: "Page URL", name: "pageUrl" },
              ].map(({ label, name }) => (
                <div className="flex items-center gap-4" key={name}>
                  <Label htmlFor={name} className="w-[140px] text-right">
                    {label}:
                  </Label>
                  <Controller
                    name={name as keyof FormValues}
                    control={control}
                    render={({ field }) => {
                      const { value, ...rest } = field;
                      return (
                        <Input
                          id={name}
                          {...rest}
                          value={
                            typeof value === "boolean"
                              ? String(value)
                              : value ?? ""
                          }
                          placeholder={`Enter ${label}`}
                        />
                      );
                    }}
                  />
                </div>
              ))}

              <div className="flex items-start justify-start gap-4">
                <Label className="w-[140px] text-right">Page Content:</Label>
                <Editor
                  apiKey="d2z6pu70qtywhkzox051ga0czhas02dp55gl9bxijefs4vxo"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  value={pageContent || ""}
                  onEditorChange={(content) =>
                    setValue("pageContent", content, { shouldDirty: true })
                  }
                  init={{
                    height: 400,
                    menubar: true,
                    directionality: "ltr",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                      "emoticons",
                      "hr",
                      "pagebreak",
                      "print",
                    ],
                    toolbar: `undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | 
             alignleft aligncenter alignright alignjustify | 
             outdent indent | numlist bullist | link image media table hr emoticons | 
             code fullscreen preview print | removeformat`,
                    branding: false,
                    default_link_target: "_blank",
                    toolbar_mode: "sliding",
                  }}
                />
              </div>
            </div>
          </div>

          {/* NAVIGATION MENU */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg">Navigation Menu Options</h1>
            <div className="bg-white shadow-md p-10 space-y-5">
              <div className="ml-20">
                {/* Navigation Menu Checkbox */}
                <Controller
                  name="showInNavigation"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex items-center gap-4">
                      <Label
                        htmlFor="showInNavigation"
                        className="cursor-pointer"
                      >
                        Navigation Menu
                      </Label>
                      <Checkbox
                        id="showInNavigation"
                        checked={value}
                        onCheckedChange={onChange}
                        className="mr-2"
                      />
                      <Label
                        htmlFor="showInNavigation"
                        className="cursor-pointer"
                      >
                        Yes, show this web page on the navigation menu
                      </Label>
                    </div>
                  )}
                />

                {/* Parent Page */}
                <div className="flex justify-start gap-15 items-start mt-4">
                  <Label className="pt-1">Parent Page</Label>
                  <div className="w-[300px] border rounded-md overflow-y-auto h-[180px] bg-white text-xl">
                    {templates.map((tpl) => {
                      const isSelected = watch("parentPage") === tpl.label;
                      return (
                        <div
                          key={tpl.label}
                          onClick={() =>
                            setValue(
                              "parentPage",
                              isSelected ? "" : tpl.label,
                              {
                                shouldDirty: true,
                              }
                            )
                          }
                          className={cn(
                            "cursor-pointer px-3 py-1",
                            isSelected && "bg-blue-600 text-white"
                          )}
                        >
                          {tpl.label}
                        </div>
                      );
                    })}
                    <input type="hidden" {...register("parentPage")} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADVANCED OPTIONS */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg">Advanced Options</h1>
            <div className="bg-white shadow-md p-10 space-y-5">
              {[
                { label: "Page Title", name: "pageTitle" },
                { label: "Meta Keywords", name: "metaKeywords" },
                { label: "Meta Description", name: "metaDescription" },
                { label: "Search Keywords", name: "searchKeywords" },
              ].map(({ label, name }) => (
                <div className="flex items-center gap-4 ml-20" key={name}>
                  <Label htmlFor={name} className="w-[160px] text-right">
                    {label} (Optional):
                  </Label>
                  <Controller
                    name={name as keyof FormValues}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={name}
                        {...field}
                        value={field.value as string | number | undefined}
                      />
                    )}
                  />
                </div>
              ))}

              {/* Template Layout File */}
              <div className="flex items-center gap-4 ml-20">
                <Label
                  htmlFor="templateLayoutFile"
                  className="w-[160px] text-right"
                >
                  Template Layout File:
                </Label>
                <Controller
                  name="templateLayoutFile"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select layout file" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="page-full-width">
                          page-full-width
                        </SelectItem>
                        <SelectItem value="multi-add-skus">
                          multi-add-skus
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col space-y-4 pt-4 ml-20">
                <Controller
                  name="displayAsHomePage"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <div className="flex items-center gap-8">
                      <Label className="w-[160px] text-right">
                        Display as Home Page
                      </Label>
                      <div className="flex items-center">
                        <Checkbox
                          id="displayAsHomePage"
                          checked={value}
                          onCheckedChange={onChange}
                          {...field}
                          className="mr-2"
                        />
                        <Label
                          htmlFor="displayAsHomePage"
                          className="cursor-pointer"
                        >
                          Yes, display this page as the home page of my store
                        </Label>
                      </div>
                    </div>
                  )}
                />

                <Controller
                  name="restrictToCustomersOnly"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <div className="flex items-center gap-8">
                      <Label className="w-[160px] text-right">
                        Restrict to Customers Only
                      </Label>
                      <div className="flex items-center">
                        <Checkbox
                          id="restrictToCustomersOnly"
                          checked={value}
                          onCheckedChange={onChange}
                          {...field}
                          className="mr-2"
                        />
                        <Label
                          htmlFor="restrictToCustomersOnly"
                          className="cursor-pointer"
                        >
                          Yes, only allow customers who've logged in to view
                          this page
                        </Label>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* Sort Order */}
              <div className="flex items-start gap-4 pt-4 ml-20">
                <Label htmlFor="sortOrder" className="w-[160px] text-right">
                  Sort Order (Optional):
                </Label>
                <Controller
                  name="sortOrder"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="sortOrder"
                      {...field}
                      type="number"
                      className="w-[100px]"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* FORM ACTION BUTTONS */}
          <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
            <button
              type="button"
              className="btn-outline-primary"
             onClick={()=>router.push("/manage/storefront/web-pages")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? "Update Page" : "Save and Exit"}
            </button>
            <button
              type="submit"
              className="btn-primary"
              onClick={() => router.push("/manage/storefront/web-pages")}
            >
              {isEdit ? "Update Page and Add Another" : "Save and Add Another"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default WebPage;
