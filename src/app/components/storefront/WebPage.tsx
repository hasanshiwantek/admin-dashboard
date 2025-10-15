"use client";

import { useState } from "react";
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
const WebPage = () => {
  const [pageType, setPageType] = useState("wysiwyg");
  const methods = useForm({});
  const { control, setValue, watch, register } = methods;
  const selected = watch("template");
  const pageContent = watch("pageContent");
  const editorRef = useRef(null);
  // Initialize react-hook-form

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

  return (
    <FormProvider {...methods}>
      <div className="p-5 space-y-5">
        <div className="flex flex-col space-y-5">
          <h1 className="!font-extralight">Edit a Web Page</h1>
          <p>
            To create a web page (such as an "About Us" page or a contact form),
            start by choosing the type of page you want and then fill in the
            other details.
          </p>
        </div>

        {/* PAGE TYPE */}
        <div className="space-y-4 mt-10">
          <h1 className="!font-semibold text-lg">Page Type</h1>
          <div className="bg-white shadow-md p-10">
            <RadioGroup
              value={pageType}
              onValueChange={setPageType}
              className="space-y-2"
            >
              {options.map((opt) => (
                <div key={opt.id} className="flex items-start space-x-3">
                  <RadioGroupItem id={opt.id} value={opt.id} />
                  <Label htmlFor={opt.id}>{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
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
              <div className="flex items-center gap-4 " key={name}>
                <Label htmlFor={name} className="w-[140px] text-right">
                  {label}:
                </Label>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id={name}
                      {...field}
                      className=""
                      placeholder={`Enter ${label}`}
                    />
                  )}
                />
              </div>
            ))}
            <div className="flex items-start justify-start gap-4 ">
              <Label className="w-[140px] text-right">Page Content:</Label>
              <Editor
                apiKey="d2z6pu70qtywhkzox051ga0czhas02dp55gl9bxijefs4vxo"
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={pageContent || ""}
                onEditorChange={(content) => {
                  setValue("pageContent", content, { shouldDirty: true });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  directionality: "ltr", // ✅ fix RTL issue
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

        {/* Navigation Menu Options */}
        <div className="space-y-4 mt-10">
          <h1 className="!font-semibold text-lg">Navigation Menu Options</h1>
          <div className="bg-white shadow-md p-10 space-y-5">
            <div className="flex items-center gap-4 ">
              <Label>Navigation Menu</Label>
              <Checkbox />
              <Label>Yes, show this web page on the navigation menu</Label>
            </div>

            <div className="flex justify-start gap-15 items-start">
              <Label className="pt-1">Parent Page</Label>
              <div className="w-[300px] border rounded-md overflow-y-auto h-[180px] bg-white text-xl">
                {templates.map((tpl) => {
                  const isSelected = selected === tpl.value;

                  return (
                    <div
                      key={tpl.value}
                      onClick={() =>
                        setValue(
                          "template",
                          selected === tpl.value ? "" : tpl.value
                        )
                      }
                      className={cn(
                        "cursor-pointer px-3 py-1 ",
                        isSelected && "bg-blue-600 text-white"
                      )}
                    >
                      {tpl.label}
                    </div>
                  );
                })}
                <input type="hidden" {...register("template")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WebPage;
