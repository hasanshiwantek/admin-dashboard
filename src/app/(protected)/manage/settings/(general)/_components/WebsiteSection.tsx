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
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import SettingsNotice from "../../_components/SettingsNotice";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const name = (field: WebsiteField) => fieldPath(GeneralSection.Website, field);

const WebsiteSection = () => (
  <div className="flex flex-col gap-8">
    <SettingsCard title="Search Engine Optimization">
      <InputField
        name={name(WebsiteField.HomePageTitle)}
        label="Home Page Title"
        controlClassName="max-w-md"
        afterFieldComponent={
          <HelpTooltip
            side="right"
           content="Specify a page title for the home page of your store, or leave blank to use the store name set above."
            iconClassName="fill-muted-plum-gray "
          />
        }
      />
      <InputField
        name={name(WebsiteField.MetaKeywords)}
        label="Meta Keywords"
        controlClassName="max-w-md"
        afterFieldComponent={
          <HelpTooltip
            side="right"
          content="The meta keywords to display in the header of each page on your site. These words should explain what you sell online. Separate each word with a comma, such as action dvd's, comedy dvd's, etc."
            iconClassName="fill-muted-plum-gray"
          />
        }
      />
      <InputField
        name={name(WebsiteField.MetaDescription)}
        label="Meta Description"
        controlClassName="max-w-md"
        afterFieldComponent={
          <HelpTooltip
            side="right"
            content="The meta description to display in the header on each page of your site. Use a brief sentence to describe your eCommerce shop as this is the text Google will use to describe your site in its search results."
            iconClassName="fill-muted-plum-gray"
          />
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
          <HelpTooltip
            side="right"
         content="Allowing your store to be browsed on both 'yourstore.com' and 'www.yourstore.com' may be seen by Google as duplicate content so it's a good idea to choose to display your store either with 'www' in the domain or without. You can choose which you'd prefer here. This will not affect any subdomains you setup under Setup & Tools -> DNS Records. While your store is still on a my.bigcommerce.com subdomain, you cannot redirect to www."
            iconClassName="fill-muted-plum-gray"
          />
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
