"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import PageLayout from "@/components/ui/PageLayout";
import { Button } from "@/components/ui/Button";
import { Info, Loader2, X } from "lucide-react";
import type { FieldPath } from "react-hook-form";
import {
  SCRIPT_CATEGORY_OPTIONS,
  SCRIPT_LOAD_METHOD_OPTIONS,
  SCRIPT_LOCATION_OPTIONS,
  SCRIPT_MANAGER_ROUTE,
  SCRIPT_PLACEMENT_OPTIONS,
  ScriptFormNames,
  SCRIPT_TYPE_OPTIONS,
  ScriptType,
} from "./constant";
import { useScriptFormContainer } from "./container";
import type { ScriptFormValues } from "./types";
import PageTitle from "@/components/ui/PageTitle";

const Page = () => {
  const {
    addHash,
    fetchingScript,
    form,
    integrityHashes,
    isEdit,
    loading,
    removeHash,
    router,
    scriptType,
    submitScript,
    updateHash,
  } = useScriptFormContainer();

  if (fetchingScript) {
    return (
      <PageLayout
        title={`${isEdit ? "Edit" : "Create"} script`}
        className="mx-auto max-w-[900px]"
      >
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <span>Loading script...</span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${isEdit ? "Edit" : "Create"} script`}
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      className="mx-auto max-w-[900px]"
    >
      <Form<ScriptFormValues>
        form={form}
        onSubmit={submitScript}
        footer={{
          submitText: isEdit ? "Update" : "Save",
          loadingText: isEdit ? "Updating..." : "Creating...",
          loading,
          onCancel: () => router.push(SCRIPT_MANAGER_ROUTE),
        }}
      >
        <section className="flex w-full flex-col gap-8 pb-10">
          <InputField
            name={ScriptFormNames.ScriptName}
            label="Script name"
            layout="vertical"
            containerClassName="w-full"
            controlClassName="w-full"
            required
          />

          <InputField
            name={ScriptFormNames.Description}
            label={
              <span className="flex items-center gap-2">
                Description
                <span className="text-sm text-gray-500">optional</span>
              </span>
            }
            layout="vertical"
            containerClassName="w-full"
            controlClassName="w-full"
          />

          <InputField
            name={ScriptFormNames.Placement}
            label="Placement"
            layout="vertical"
            Component={RadioGroupField}
            options={SCRIPT_PLACEMENT_OPTIONS}
            className="flex flex-col gap-3"
            optionClassName="cursor-pointer"
          />

          <InputField
            name={ScriptFormNames.Location}
            label="Location"
            layout="vertical"
            Component={RadioGroupField}
            options={SCRIPT_LOCATION_OPTIONS.map((option) => ({
              ...option,
              label: (
                <span className="flex items-center">
                  {option.label}
                  <Info className="ml-1 h-4 w-4 text-gray-400" />
                </span>
              ),
            }))}
            className="flex flex-col gap-3"
            optionClassName="cursor-pointer"
          />

          <InputField
            name={ScriptFormNames.ScriptCategory}
            label="Script category"
            layout="vertical"
            Component={RadioGroupField}
            options={SCRIPT_CATEGORY_OPTIONS.map((option) => ({
              ...option,
              content: (
                <p className="ml-8 text-sm text-gray-600">
                  {option.description}
                </p>
              ),
            }))}
            className="flex flex-col gap-3"
            optionClassName="cursor-pointer"
          />

          <InputField
            name={ScriptFormNames.ScriptType}
            label="Script type"
            layout="vertical"
            Component={RadioGroupField}
            options={SCRIPT_TYPE_OPTIONS}
            className="flex flex-col gap-3"
            optionClassName="cursor-pointer"
          />

          {scriptType === ScriptType.URL ? (
            <>
              <InputField
                name={ScriptFormNames.LoadMethod}
                label="Load method"
                layout="vertical"
                Component={SelectField}
                options={SCRIPT_LOAD_METHOD_OPTIONS}
                placeholder="Select load method"
              />

              <InputField
                name={ScriptFormNames.ScriptUrl}
                label="Script URL"
                layout="vertical"
                placeholder="https://"
                containerClassName="w-full"
                controlClassName="w-full"
                className="w-full max-w-none"
                required
              />

              <div className="flex flex-col gap-3">
                <PageTitle
                  title="Integrity Hashes"
                  description="  The integrity hash is a security feature used by browsers to
                    verify that the script is delivered without unexpected
                    manipulation. For any scripts that live on the checkout
                    page, at least one integrity hash is required to meet PCI
                    4.0 &amp; 4.3 requirements. If your script is located on the
                    checkout page, please work with the script provider/host to
                    generate a hash and enter it here."
                  descriptionClassName="text-sm text-gray-600"
                  titleClassName="font-normal text-gray-600 2xl:text-2xl"
                  hideActionButton
                />

                <div className="space-y-3">
                  {integrityHashes.map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <InputField
                        name={
                          `${ScriptFormNames.IntegrityHashes}.${index}` as FieldPath<ScriptFormValues>
                        }
                        aria-label={`Integrity hash ${index + 1}`}
                        layout="vertical"
                        getValueOnChange={({ value }) =>
                          updateHash(index, String(value ?? ""))
                        }
                        runAfterOnChange
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHash(index)}
                        className="shrink-0"
                        aria-label={`Remove integrity hash ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <InputField
                    name={ScriptFormNames.CurrentIntegrityHash}
                    placeholder="Enter integrity hash"
                    layout="vertical"
                    containerClassName="w-full"
                    controlClassName="w-full"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addHash();
                      }
                    }}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addHash}
                  className="w-fit text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  + Add hash
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <label
                htmlFor={ScriptFormNames.ScriptContents}
                className="font-normal text-gray-600 2xl:text-2xl"
              >
                Script contents
              </label>
              <div className="border rounded-md">
                <div className="bg-gray-50 px-3 py-2 border-b">
                  <span className="font-mono text-sm">1</span>
                </div>
                <InputField
                  name={ScriptFormNames.ScriptContents}
                  layout="vertical"
                  isTextArea
                  required
                  placeholder="<script></script>"
                  containerClassName="w-full"
                  controlClassName="w-full"
                  className="min-h-[200px] w-full max-w-none border-0 rounded-none font-mono text-sm resize-none focus-visible:ring-0"
                />
              </div>
            </div>
          )}
        </section>
      </Form>
    </PageLayout>
  );
};

export default Page;
