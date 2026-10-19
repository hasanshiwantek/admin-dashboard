"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import CountrySection from "@/app/components/settings/localization/CountrySection";
import DateTimezoneSection from "@/app/components/settings/localization/DateTimezoneSection";
import LocalizationSidebar from "@/app/components/settings/localization/LocalizationSidebar";
import PhysicalDimensionsSection from "@/app/components/settings/localization/PhysicalDimensionsSection";
import StorefrontLanguagesSection from "@/app/components/settings/localization/StorefrontLanguagesSection";
import Form from "@/components/form/Form";
import PageLayout from "@/components/ui/PageLayout";
import { countryDefault, sections } from "./constant";
import { LocalizationFormValues } from "./type";

const LocalizationPage = () => {
  const [activeSection, setActiveSection] = useState("country");

  const form = useForm<LocalizationFormValues>({
    defaultValues: countryDefault,
  });

  const localizationSections = [
    { id: "country", component: <CountrySection /> },
    { id: "languages", component: <StorefrontLanguagesSection /> },
    { id: "dimensions", component: <PhysicalDimensionsSection /> },
    { id: "timezone", component: <DateTimezoneSection /> },
  ];

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
    <PageLayout
      backButton={{ label: "Settings", href: "/manage/settings" }}
      title="Localization"
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      headerClassName="mb-8"
      className="min-h-screen bg-background-light mx-auto w-full max-w-[1100px] px-0"
    >
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
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
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
    </PageLayout>
  );
};

export default LocalizationPage;
