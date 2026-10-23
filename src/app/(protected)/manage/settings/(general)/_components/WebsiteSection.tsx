import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import Link from "next/link";
import {
  GeneralSection,
  ROBOTS_LEARN_MORE_URL,
  WebsiteField,
  wwwRedirectOptions,
} from "../constant";
import { fieldPath } from "../utils";
import SettingsCard from "../../_components/SettingsCard";
import SettingsNotice from "../../_components/SettingsNotice";
import { CircleHelp } from "lucide-react";

const name = (field: WebsiteField) => fieldPath(GeneralSection.Website, field);

const WebsiteSection = () => (
  <div className="flex flex-col gap-8">
    <SettingsCard title="Search Engine Optimization">
      <InputField
        name={name(WebsiteField.HomePageTitle)}
        label="Home Page Title"
        controlClassName="max-w-md"
        afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
      <InputField
        name={name(WebsiteField.MetaKeywords)}
        label="Meta Keywords"
        controlClassName="max-w-md"
        afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
      <InputField
        name={name(WebsiteField.MetaDescription)}
        label="Meta Description"
        controlClassName="max-w-md"
        afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
      <InputField
        name={name(WebsiteField.WwwRedirect)}
        label="WWW/No WWW Redirect"
        Component={SelectField}
        options={wwwRedirectOptions}
        placeholder="-- Choose a redirect option --"
        controlClassName="max-w-md"
        afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
    </SettingsCard>

    <SettingsCard title="HTTPS">
      <SettingsNotice>
        All of your storefront website traffic is served via HTTPS. Requests to
        the HTTP version of your storefront will automatically be redirected to
        HTTPS.
      </SettingsNotice>
    </SettingsCard>

    <SettingsCard
      title="Search Engine Robots"
      description={
        <>
          For advanced users only, this section allows you to control which
          pages of your website will be crawled and indexed by search engines.{" "}
          <Link
            href={ROBOTS_LEARN_MORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:underline"
          >
            Learn More
          </Link>
        </>
      }
    >
      <InputField
        name={name(WebsiteField.RobotsTxt)}
        label="HTTPS robots.txt"
        isTextArea
      />
    </SettingsCard>
  </div>
);

export default WebsiteSection;
