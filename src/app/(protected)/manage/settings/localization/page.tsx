
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

type LocalizationFormValues = {
  country: string;
};

const LocalizationPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("country");

  const form = useForm<LocalizationFormValues>({
    defaultValues: {
      country: "United States",
    },
  });

  const sections = [
    { id: "country", label: "Country" },
    { id: "languages", label: "Storefront Languages" },
    { id: "dimensions", label: "Physical dimensions" },
    { id: "timezone", label: "Date and timezone" },
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
    <div className="min-h-screen bg-background-light">
      <div className="mx-auto w-full max-w-[970px] px-5 py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          <span>Settings</span>
        </button>

        <h1 className="mb-8 text-[36px] font-light leading-tight text-[#172033]">
          Localization
        </h1>

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
              <section id="country" className="scroll-mt-6">
                <CountrySection />
              </section>

              <section id="languages" className="scroll-mt-6">
                <StorefrontLanguagesSection />
              </section>

              <section id="dimensions" className="scroll-mt-6">
                <PhysicalDimensionsSection />
              </section>

              <section id="timezone" className="scroll-mt-6">
                <DateTimezoneSection />
              </section>
            </main>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LocalizationPage;
