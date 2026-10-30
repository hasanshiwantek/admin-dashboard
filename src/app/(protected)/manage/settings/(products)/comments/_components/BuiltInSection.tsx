import CheckboxField from "@/components/form/fields/CheckboxField";
import CheckboxListField from "@/components/form/fields/CheckboxListField";
import InputField from "@/components/form/InputField";
import Link from "next/link";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  CommentSettingsFormNames,
  commentTargetOptions,
  CUSTOM_REVIEW_FORM_STEPS_URL,
  PRODUCT_REVIEWS_LEARN_MORE_URL,
} from "../constant";

const LINK_CLASS = "text-[1.4rem]! text-link hover:underline";

const BuiltInSection = () => (
  <div className="flex flex-col gap-6">
    <p className="text-[1.4rem]! text-gray-700!">
      The built-in comment system gives your customers the ability to review and
      rate products.{" "}
      <Link
        href={PRODUCT_REVIEWS_LEARN_MORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        Learn more.
      </Link>
    </p>

    <SectionCard title="Built-in Settings">
      <InputField
        name={CommentSettingsFormNames.EnabledFor}
        label="Enable For"
        Component={CheckboxListField}
        options={commentTargetOptions}
        showSelectAll
        className="h-[17rem]"
        showColon = {true}
      />
      <InputField
        name={CommentSettingsFormNames.OnlyPastCustomers}
        Component={CheckboxField}
        text="Only accept product reviews from past customers"
      />
      <div className="grid grid-cols-[14rem_1fr] gap-x-8 2xl:grid-cols-[18rem_1fr]">
        <span />
        <p className="text-[1.4rem]! text-gray-700!">
          If you have customized your product review form you will need to{" "}
          <Link
            href={CUSTOM_REVIEW_FORM_STEPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            follow these steps
          </Link>
          .
        </p>
      </div>
    </SectionCard>
  </div>
);

export default BuiltInSection;
