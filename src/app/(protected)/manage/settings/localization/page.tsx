"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Form from "@/components/form/Form";
import LocalizationSidebar from "@/app/components/settings/localization/LocalizationSidebar";
import CountrySection from "@/app/components/settings/localization/CountrySection";
import StorefrontLanguagesSection from "@/app/components/settings/localization/StorefrontLanguagesSection";
import PhysicalDimensionsSection from "@/app/components/settings/localization/PhysicalDimensionsSection";
import DateTimezoneSection from "@/app/components/settings/localization/DateTimezoneSection";
import { Button } from "@/components/ui/button";
import { LocalizationFormValues } from "./type";
import { countryDefault, sections } from "./constant";
import PageTitle from "@/components/ui/PageTitle";



const LocalizationPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("country");

  const form = useForm<LocalizationFormValues>({
    defaultValues: countryDefault
  });


  const localizationSections = [
    { id: "country", component: <CountrySection /> },
    { id: "languages", component: <StorefrontLanguagesSection /> },
    { id: "dimensions", component: <PhysicalDimensionsSection /> },
    { id: "timezone", component: <DateTimezoneSection /> },
  ];
//   const localizationSections = [
//   { id: "country", component: <CountrySection form={form} /> },
//   { id: "languages", component: <StorefrontLanguagesSection /> },
//   { id: "dimensions", component: <PhysicalDimensionsSection form={form} /> },
//   { id: "timezone", component: <DateTimezoneSection form={form} /> },
// ];
  const handleSectionClick = (id: string) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onSubmit = async (values: LocalizationFormValues) => {
    // Connect localization settings to your backend here.
    console.log("Localization settings:", values);
  };

  return (
    <div className="min-h-screen bg-background-light">
      <div className="mx-auto w-full max-w-[970px] px-5 py-8">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          <span>Settings</span>
        </Button>

       <PageTitle
  title="Localization"
  hideActionButton
  titleClassName="mb-8 text-[36px] font-light leading-tight text-[#172033]"
  containerClassName="mb-0"
  textContainerClassName="mb-0"
/>

        <Form
          form={form}
          onSubmit={onSubmit}
          bodyClassName="gap-0 border-0 bg-transparent p-0 shadow-none"
          footer={{
            submitText: "Save",
            cancelText: "Cancel",
            loading: form.formState.isSubmitting,
          }}
        >
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <LocalizationSidebar
              sections={sections}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />

            <main className="min-w-0 space-y-7">
              {localizationSections.map((item) => (
                <section key={item.id} id={item.id} className="scroll-mt-6">
                  {item.component}
                </section>
              ))}
            </main>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LocalizationPage;
