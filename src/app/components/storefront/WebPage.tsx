"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import PageTitle from "@/components/ui/PageTitle";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createWebpage,
  getWebPageById,
  getWebPages,
  updateWebPage,
} from "@/redux/slices/storefrontSlice";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";

import {
  AdvancedOptions,
  ContactFields,
  DefaultWebPageValues,
  PageTypeEnums,
  PageTypeOptions,
  WebPageField,
} from "./constants";
import { WebPageSchema } from "@/validations/formValidations";
import type { WebPageFormValues } from "./types";
import { Button } from "@/components/ui/button";
import { REGEX } from "@/const/regex";
import { generatePageUrl } from "./utils";

const LIST_PATH = "/manage/storefront/web-pages";

const WebPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const webPages = useAppSelector((s: any) => s.storefront.webPages) ?? [];
  const urlSettingData = useAppSelector((s: any) => s.home?.urlSettingData);

  const form = useForm<WebPageFormValues>({
    resolver: yupResolver(WebPageSchema),
    defaultValues: DefaultWebPageValues,
  });

  const { control, reset, setValue, watch } = form;
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] = useState(false);
  const submitActionRef = useRef<"exit" | "keepEditing" | "addAnother">("exit");

  const pageType = useWatch({ control, name: WebPageField.PageType });
  const watchedName = useWatch({ control, name: WebPageField.PageName });
  const showTheseFields =
    useWatch({ control, name: WebPageField.ShowTheseFields }) ?? [];

  useEffect(() => {
    if (!isEdit || !id) return;
    dispatch(getWebPageById({ id }))
      .unwrap()
      .then((res) => reset(res?.data ?? res))
      .catch(console.error);
  }, [id, isEdit, dispatch, reset]);

  useEffect(() => {
    if (isUrlManuallyEdited || !watchedName) return;

    const url = generatePageUrl(watchedName, urlSettingData);
    if (url) {
      setValue(WebPageField.PageUrl, url);
    }
  }, [watchedName, isUrlManuallyEdited]);
  useEffect(() => {
    dispatch(getWebPages());
    dispatch(fetchUrlSettings("webpage"));
  }, [dispatch]);

  useEffect(() => {
    if (id) setIsUrlManuallyEdited(true);
  }, [id]);

  const onSubmit = async (values: WebPageFormValues) => {
    try {
      const result = isEdit
        ? await dispatch(updateWebPage({ id, data: values }))
        : await dispatch(createWebpage({ data: values }));

      if ((isEdit ? updateWebPage : createWebpage).fulfilled.match(result)) {
        dispatch(getWebPages());

        if (submitActionRef.current === "keepEditing" && isEdit) {
          const refreshed = await dispatch(getWebPageById({ id }));
          if (getWebPageById.fulfilled.match(refreshed)) {
            reset(refreshed.payload.data);
          }
        } else if (submitActionRef.current === "addAnother") {
          reset(DefaultWebPageValues);
          setIsUrlManuallyEdited(false);
        } else {
          router.push(LIST_PATH);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleContactField = (fieldId: string) => {
    const current = showTheseFields;
    const updated = current.includes(fieldId)
      ? current.filter((f: any) => f !== fieldId)
      : [...current, fieldId];
    setValue(WebPageField.ShowTheseFields, updated, { shouldDirty: true });
  };

  return (
    <div className="min-h-screen">
      <PageTitle
        title={isEdit ? "Edit a Web Page" : "Create a Web Page"}
        description='To create a web page (such as an "About Us" page or a contact form), start by choosing the type of page you want and then fill in the other details.'
        descriptionClassName="text-xl! 2xl:text-2xl!"
        hideActionButton
      />

      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: "Save and Exit",
          onCancel: () => router.push(LIST_PATH),
          loading: form.formState.isSubmitting,
          extraActions: (
            <button
              type="submit"
              className="btn-primary"
              onClick={() => {
                submitActionRef.current = isEdit ? "keepEditing" : "addAnother";
              }}
            >
              {isEdit ? "Save & Keep Editing" : "Save & Add Another"}
            </button>
          ),
        }}
      >
        <section className="bg-white shadow-sm border border-gray-100 rounded-sm p-10 space-y-6">
          <PageTitle title="Page Type" hideActionButton />
          <InputField
            name={WebPageField.PageType}
            required
            Component={RadioGroupField}
            control={control}
            options={PageTypeOptions}
          />
        </section>
        <section className="bg-white shadow-sm border border-gray-100 rounded-sm p-10 space-y-6">
          <PageTitle title="Web Page Details" hideActionButton />

          <InputField
            name={WebPageField.PageName}
            label="Page Name"
            required
            control={control}
            placeholder="Enter Page Name"
          />

          {pageType !== PageTypeEnums.Link && (
            <div className="flex items-end  gap-4">
              <InputField
                name={WebPageField.PageUrl}
                label="Page URL"
                control={control}
                onKeyDown={(e) => {
                  if (REGEX.URL_BLOCKED_CHARS.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData("text");
                  if (REGEX.URL_BLOCKED_CHARS.test(pasted)) {
                    e.preventDefault();
                  }
                }}
              />
              <Button
                type="button"
                className="btn-outline-primary !py-2 h-13"
                onClick={() => {
                  setIsUrlManuallyEdited(false);
                  const url = generatePageUrl(watchedName, urlSettingData);
                  if (url) {
                    setValue(WebPageField.PageUrl, url);
                  }
                }}
              >
                Reset
              </Button>
            </div>
          )}

          {(pageType === PageTypeEnums.WYSIWYG ||
            pageType === PageTypeEnums.ContactForm) && (
            <InputField
              name={WebPageField.PageContent}
              label="Page Content"
              Component={RichTextEditor}
              control={control}
              controlClassName="max-w-7xl"
            />
          )}

          {pageType === PageTypeEnums.Link && (
            <InputField
              name={WebPageField.Link}
              label="Link"
              required
              control={control}
              placeholder="https://"
            />
          )}

          {pageType === PageTypeEnums.RawHTML && (
            <InputField
              name={WebPageField.RawHtml}
              label="HTML Content"
              control={control}
              Component="textarea"
              rows={15}
              className="font-mono text-sm border rounded-md p-3 bg-gray-50"
              placeholder="Enter raw HTML here..."
            />
          )}

          {pageType === PageTypeEnums.ContactForm && (
            <>
              {/* Email Questions To */}
              <InputField
                name={WebPageField.EmailQuestionsTo}
                label="Email Questions to"
                control={control}
                placeholder="info@mystore.com"
              />
              {/* Show These Fields */}
              <div className="grid grid-cols-[220px_1fr] items-start gap-4">
                <Label className="font-normal text-gray-600 2xl:text-2xl! justify-center text-center pt-3">
                  Show These Fields
                </Label>
                <div className="space-y-2">
                  {ContactFields.map((f) => (
                    <div key={f.id} className="flex items-center gap-2">
                      <Checkbox
                        id={f.id}
                        checked={f.locked || showTheseFields.includes(f.id)}
                        disabled={f.locked}
                        onCheckedChange={() => toggleContactField(f.id)}
                      />
                      <Label htmlFor={f.id} className="cursor-pointer text-xl">
                        {f.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Spam Protection */}
              <div className="grid grid-cols-[220px_1fr] items-center gap-4">
                <Label className="font-normal text-gray-600 2xl:text-2xl! justify-center text-center pt-3">
                  Spam Protection
                </Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="spamProtection"
                    checked={showTheseFields.includes("spamProtection")}
                    onCheckedChange={() => toggleContactField("spamProtection")}
                  />
                  <Label
                    htmlFor="spamProtection"
                    className="cursor-pointer text-xl"
                  >
                    Add Manual Captcha
                  </Label>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="bg-white shadow-sm border border-gray-100 rounded-sm p-10 space-y-6">
          <PageTitle title="Navigation Menu Options" hideActionButton />
          <InputField
            name={WebPageField.ShowInNavigation}
            label="Navigation Menu"
            Component={CheckboxField}
            control={control}
            text="Yes, show this web page on the navigation menu"
          />
          <div className="grid grid-cols-[220px_1fr] items-start gap-4">
            <Label className="font-normal text-gray-600 2xl:text-2xl! justify-center text-center pt-3">
              Parent Page
            </Label>
            <div className="w-[300px] border rounded-md overflow-y-auto h-[160px] bg-white text-xl">
              {[
                { pageName: "-- No Parent Page --", id: 0 },
                ...(webPages.filter((item: any) => item.id != id) || []),
              ].map((tpl: any) => {
                const isSelected =
                  String(watch(WebPageField.ParentPage)) === String(tpl.id);
                return (
                  <div
                    key={tpl.id}
                    onClick={() =>
                      setValue(
                        WebPageField.ParentPage,
                        isSelected ? "" : String(tpl.id),
                        { shouldDirty: true },
                      )
                    }
                    className={cn(
                      "cursor-pointer px-3 py-1.5 hover:bg-gray-100",
                      isSelected && "bg-blue-600 text-white hover:bg-blue-600",
                    )}
                  >
                    {tpl.pageName}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="bg-white shadow-sm border border-gray-100 rounded-sm p-10 space-y-6">
          <PageTitle title="Advanced Options" hideActionButton />

          {AdvancedOptions.map(({ label, name }) => (
            <InputField
              key={name}
              name={name as any}
              label={`${label} (Optional)`}
              control={control}
            />
          ))}

          <InputField
            name={WebPageField.RestrictToCustomersOnly}
            label="Restrict to Customers Only"
            Component={CheckboxField}
            control={control}
            text="Yes, only allow customers who've logged in to view this page"
          />

          <InputField
            name={WebPageField.SortOrder}
            label="Sort Order (Optional)"
            control={control}
            type="number"
          />
        </section>
      </Form>
    </div>
  );
};

export default WebPage;
