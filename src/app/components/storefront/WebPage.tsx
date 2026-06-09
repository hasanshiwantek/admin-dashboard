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
// import { Editor } from "@tinymce/tinymce-react";

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
  getWebPages,
  updateWebPage,
} from "@/redux/slices/storefrontSlice";
import { useRouter, useParams } from "next/navigation";
import DescriptionEditorQuill from "../products/add/DescriptionEditorQuill";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import { generateSlug } from "@/const/data";

type FormValues = {
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
  // link type
  link: string;
  // contact type
  emailQuestionsTo: string;
  showTheseFields: string[];
  // rawHtml type
  rawHtml: string;
};
const CONTACT_FIELDS = [
  { id: "email", label: "Email Address", locked: true },
  { id: "comments", label: "Question/Comment", locked: true },
  { id: "full_name", label: "Full Name", locked: false },
  { id: "company_name", label: "Company Name", locked: false },
  { id: "phone_number", label: "Phone Number", locked: false },
  { id: "order_number", label: "Order Number", locked: false },
  { id: "rma_number", label: "RMA Number", locked: false },
];
const WebPage = () => {
  // const [pageType, setPageType] = useState("wysiwyg");
  const methods = useForm<FormValues>({
    defaultValues: {
      pageName: "",
      pageUrl: "",
      pageContent: "",
      templateLayoutFile: "default",
      displayAsHomePage: false,
      restrictToCustomersOnly: false,
      sortOrder: 0,
      // 
      link: "",
      emailQuestionsTo: "",
      showTheseFields: ["email", "comments"],
      rawHtml: "",
    },
  });

  const { control, setValue, watch, register, handleSubmit, reset } = methods;
  const selected = watch("template");
  const pageContent = watch("pageContent");
  const webPages = useAppSelector((state: any) => state?.storefront?.webPages);
  const urlSettingData = useAppSelector(
    (state: any) => state.home?.urlSettingData
  );
  const pageType = watch("pageType");
  const showTheseFields = watch("showTheseFields") || [];
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();
  const watchedName = watch("pageName");
  const isEdit = !!id;

  const options = [
    {
      id: "1",
      label: "Contain content created using the WYSIWYG editor below",
    },
    { id: "2", label: "Link to another website or document" },
    {
      id: "3",
      label: "Allow people to send questions/comments via a contact form",
    },
    { id: "4", label: "Contain raw HTML entered in the text area below" },
  ];

  // Fetch page data if editing
  useEffect(() => {
    if (isEdit && id) {
      const fetchPage = async () => {
        try {
          const result = await dispatch(getWebPageById({ id: id }));
          if (getWebPageById.fulfilled.match(result)) {
            reset(result?.payload?.data);
          } else {
          }
        } catch (err) {
        }
      };
      fetchPage();
    }
  }, [isEdit, id, dispatch, reset]);

  // Submission handler
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let result;
      if (isEdit && id) {
        result = await dispatch(updateWebPage({ id, data }));
      } else {
        result = await dispatch(createWebpage({ data }));
      }

      if ((isEdit ? updateWebPage : createWebpage).fulfilled.match(result)) {
        router.push("/manage/storefront/web-pages");
        reset();
      } else {
      }
    } catch (err) {
      console.error("Something went wrong!", err);
    }
  };
  const toggleContactField = (fieldId: string) => {
    const current = showTheseFields;
    const updated = current.includes(fieldId)
      ? current.filter((f) => f !== fieldId)
      : [...current, fieldId];
    setValue("showTheseFields", updated, { shouldDirty: true });
  };



  useEffect(() => {
    if (!isUrlManuallyEdited) {
      if (urlSettingData?.format_type == "seo_optimized_short") {
        if (watchedName) {
          const slug = generateSlug(watchedName);
          setValue("pageUrl", `/${slug}`);
        }
      } else if (urlSettingData?.format_type == "seo_optimized_long") {
        if (watchedName) {
          const slug = generateSlug(watchedName);
          setValue("pageUrl", `/pages/${slug}`);
        }
      }
      const formatType = urlSettingData?.format_type;
      const customFormat = urlSettingData?.custom_format;

      if (formatType === "custom" && customFormat) {
        if (watchedName) {
          const replacements = {
            "%pagename%": watchedName ? generateSlug(watchedName) : "",
          };

          const finalUrl = Object.entries(replacements)
            .reduce(
              (url, [key, value]) => url.replace(new RegExp(key, "gi"), value),
              customFormat
            )
            .replace(/%[^%]+%/g, "")
            .replace(/\/+/g, "/")
            .replace(/\/$/g, "");
          if (finalUrl) {
            setValue("pageUrl", finalUrl);
          }
        }
      }

    }
  }, [watchedName, isUrlManuallyEdited]);
  useEffect(() => {
    dispatch(getWebPages());
  }, [dispatch]);
  useEffect(() => {
    if (id) {
      setIsUrlManuallyEdited(true)
    }
  }, [id])
  useEffect(() => {
    dispatch(fetchUrlSettings("webpage"));
  }, [])
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 space-y-5">
          <div className="flex flex-col space-y-5 mt-10">
            <h1 className="!font-extralight 2xl:!text-5xl">
              {isEdit ? "Edit" : "Create"} a Web Page
            </h1>
            <p className="2xl:!text-2xl">
              To create a web page (such as an "About Us" page or a contact
              form), start by choosing the type of page you want and then fill
              in the other details.
            </p>
          </div>

          {/* PAGE TYPE */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg 2xl:!text-[2.4rem]">Page Type</h1>
            <div className="bg-white shadow-md p-10">
              <Controller
                name="pageType"
                control={control}
                defaultValue={"1"}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-2"
                  >
                    {options.map((opt) => (
                      <div key={opt.id} className="flex items-start space-x-3 ml-60">
                        <RadioGroupItem id={opt.id} value={opt.id} />
                        <Label className="2xl:!text-2xl" htmlFor={opt.id}>
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          {/* WEB PAGE DETAILS */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg 2xl:!text-[2.4rem]">Web Page Details</h1>
            <div className="bg-white shadow-md p-10 space-y-5">

              {/* Page Name — always visible */}
              <div className="flex items-center gap-4">
                <Label htmlFor="pageName" className="w-[140px] text-right 2xl:!text-2xl">
                  Page Name:
                </Label>
                <Controller
                  name="pageName"
                  control={control}
                  render={({ field }) => (
                    <Input id="pageName" {...field} placeholder="Enter Page Name" />
                  )}
                />
              </div>

              {/* Page URL — always visible */}
              {pageType != "2" && <div className="flex items-center gap-4">
                <Label htmlFor="pageUrl" className="w-[140px] text-right 2xl:!text-2xl">
                  Page URL:
                </Label>
                <Controller
                  name="pageUrl"
                  control={control}
                  render={({ field }) => (
                    <Input id="pageUrl"
                      {...field}
                      onKeyDown={(e) => {
                        if (/[$*&@!=+%`'"^|]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pasted = e.clipboardData.getData("text");
                        if (/[$*&@!=+%`'"^|]/.test(pasted)) {
                          e.preventDefault();
                        }
                      }} onChange={(e) => {
                        field.onChange(e);
                        setIsUrlManuallyEdited(true);
                      }} placeholder="Enter Page URL" />
                  )}
                />
                <button className="btn-outline-primary !py-2" type="button" onClick={() => {
                  setIsUrlManuallyEdited(false)
                  if (urlSettingData?.format_type == "seo_optimized_short") {
                    if (watchedName) {
                      const slug = generateSlug(watchedName);
                      setValue("pageUrl", `/${slug}`);
                    }
                  } else if (urlSettingData?.format_type == "seo_optimized_long") {
                    if (watchedName) {
                      const slug = generateSlug(watchedName);
                      setValue("pageUrl", `/pages/${slug}`);
                    }
                  }
                  const formatType = urlSettingData?.format_type;
                  const customFormat = urlSettingData?.custom_format;

                  if (formatType === "custom" && customFormat) {
                    if (watchedName) {
                      const replacements = {
                        "%pagename%": watchedName ? generateSlug(watchedName) : "",
                      };

                      const finalUrl = Object.entries(replacements)
                        .reduce(
                          (url, [key, value]) => url.replace(new RegExp(key, "gi"), value),
                          customFormat
                        )
                        .replace(/%[^%]+%/g, "")
                        .replace(/\/+/g, "/")
                        .replace(/\/$/g, "");
                      if (finalUrl) {
                        setValue("pageUrl", finalUrl);
                      }
                    }
                  }
                }}
                >Reset</button>
              </div>}

              {/* WYSIWYG */}
              {pageType == "1" && (
                <div className="flex items-start justify-start gap-4">
                  <Label className="w-[140px] text-right 2xl:!text-2xl">Page Content:</Label>
                  <DescriptionEditorQuill
                    fieldName="pageContent"
                    label="Page Content"
                    height={300}
                  />
                </div>
              )}

              {/* LINK */}
              {pageType == "2" && (
                <div className="flex items-center gap-4">
                  <Label htmlFor="link" className="w-[140px] text-right 2xl:!text-2xl">
                    Link:
                  </Label>
                  <Controller
                    name="link"
                    control={control}
                    render={({ field }) => (
                      <Input id="link" {...field} placeholder="https://" />
                    )}
                  />
                </div>
              )}

              {/* CONTACT FORM */}
              {pageType == "3" && (
                <div className="space-y-5">
                  {/* Page Content editor */}
                  <div className="flex items-start justify-start gap-4">
                    <Label className="w-[140px] text-right 2xl:!text-2xl">Page Content:</Label>
                    <DescriptionEditorQuill
                      fieldName="pageContent"
                      label="Page Content"
                      height={300}
                    />
                  </div>

                  {/* Email Questions To */}
                  <div className="flex items-center gap-4">
                    <Label htmlFor="emailQuestionsTo" className="w-[180px] text-right 2xl:!text-2xl">
                      Email Questions to:
                    </Label>
                    <Controller
                      name="emailQuestionsTo"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="emailQuestionsTo"
                          {...field}
                          placeholder="info@mystore.com"
                          className="max-w-[300px]"
                        />
                      )}
                    />
                  </div>

                  {/* Show These Fields */}
                  <div className="flex items-start gap-4">
                    <Label className="w-[180px] text-right pt-1 2xl:!text-2xl">
                      Show These Fields:
                    </Label>
                    <div className="space-y-2">
                      {CONTACT_FIELDS.map((f) => (
                        <div key={f.id} className="flex items-center gap-2">
                          <Checkbox
                            id={f.id}
                            checked={f.locked || showTheseFields.includes(f.id)}
                            disabled={f.locked}
                            onCheckedChange={() => toggleContactField(f.id)}
                          />
                          <Label htmlFor={f.id} className="cursor-pointer 2xl:!text-xl">
                            {f.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spam Protection */}
                  <div className="flex items-center gap-4">
                    <Label className="w-[180px] text-right 2xl:!text-2xl">
                      Spam Protection:
                    </Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="spamProtection"
                        checked={showTheseFields.includes("spamProtection")}
                        onCheckedChange={() => toggleContactField("spamProtection")}
                      />
                      <Label htmlFor="spamProtection" className="cursor-pointer 2xl:!text-xl">
                        Add Manual Captcha
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* RAW HTML */}
              {pageType == '4' && (
                <div className="flex items-start gap-4">
                  <Label htmlFor="rawHtml" className="w-[140px] text-right 2xl:!text-2xl">
                    HTML Content:
                  </Label>
                  <Controller
                    name="rawHtml"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="rawHtml"
                        {...field}
                        rows={15}
                        className="flex-1 border rounded-md p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter raw HTML here..."
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATION MENU */}
          <div className="space-y-4 mt-10">
            <h1 className="!font-semibold text-lg 2xl:!text-[2.4rem]">Navigation Menu Options</h1>
            <div className="bg-white shadow-md p-10 space-y-5">
              <div className="ml-20">
                <Controller
                  name="showInNavigation"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex items-center gap-4">
                      <Label htmlFor="showInNavigation" className="cursor-pointer 2xl:!text-2xl">
                        Navigation Menu
                      </Label>
                      <Checkbox
                        id="showInNavigation"
                        checked={value}
                        onCheckedChange={onChange}
                        className="mr-2"
                      />
                      <Label htmlFor="showInNavigation" className="cursor-pointer 2xl:!text-2xl">
                        Yes, show this web page on the navigation menu
                      </Label>
                    </div>
                  )}
                />

                <div className="flex justify-start gap-15 items-start mt-4">
                  <Label className="pt-1 2xl:!text-2xl">Parent Page</Label>
                  <div className="w-[300px] border rounded-md overflow-y-auto h-[160px] bg-white text-xl">
                    {[{ pageName: "-- No Parent Page --", id: 0 }, ...(webPages.filter((item: any) => item.id != id) || [])]?.map((tpl: any) => {
                      const isSelected =String(watch("parentPage")) === String(tpl.id);
                      return (
                        <div
                          key={tpl.id}
                          onClick={() =>
                            setValue("parentPage", isSelected ? "" : String(tpl.id), {
                              shouldDirty: true,
                            })
                          }
                          className={cn(
                            "cursor-pointer px-3 py-1",
                            isSelected && "bg-blue-600 text-white"
                          )}
                        >
                          {tpl.pageName}
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
            <h1 className="!font-semibold text-lg 2xl:!text-[2.4rem]">Advanced Options</h1>
            <div className="bg-white shadow-md p-10 space-y-5">
              {[
                { label: "Page Title", name: "pageTitle" },
                { label: "Meta Keywords", name: "metaKeywords" },
                { label: "Meta Description", name: "metaDescription" },
                { label: "Search Keywords", name: "searchKeywords" },
              ].map(({ label, name }) => (
                <div className="flex items-center gap-4 ml-20" key={name}>
                  <Label htmlFor={name} className="w-[190px] text-right 2xl:!text-2xl">
                    {label} (Optional):
                  </Label>
                  <Controller
                    name={name as keyof FormValues}
                    control={control}
                    render={({ field }) => (
                      <Input id={name} {...field} value={field.value as string} />
                    )}
                  />
                </div>
              ))}

              <div className="flex items-center gap-4 ml-20">
                <Label htmlFor="templateLayoutFile" className="w-[190px] text-right 2xl:!text-2xl">
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
                        <SelectItem value="page-full-width">page-full-width</SelectItem>
                        <SelectItem value="multi-add-skus">multi-add-skus</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-4 pt-4 ml-20">
                <Controller
                  name="restrictToCustomersOnly"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <div className="flex items-center gap-8">
                      <Label className="w-[180px] text-right 2xl:!text-2xl">
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
                        <Label htmlFor="restrictToCustomersOnly" className="cursor-pointer 2xl:!text-2xl">
                          Yes, only allow customers who've logged in to view this page
                        </Label>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div className="flex items-start gap-4 pt-4 ml-20">
                <Label htmlFor="sortOrder" className="w-[190px] text-right 2xl:!text-2xl">
                  Sort Order (Optional):
                </Label>
                <Controller
                  name="sortOrder"
                  control={control}
                  render={({ field }) => (
                    <Input id="sortOrder" {...field} type="number" className="w-[100px]" />
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
              onClick={() => router.push("/manage/storefront/web-pages")}
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
