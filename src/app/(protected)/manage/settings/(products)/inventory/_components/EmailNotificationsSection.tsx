import InputField from "@/components/form/InputField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  emailNotificationFields,
  FIELD_CONTROL_CLASS,
  FIELD_LABEL_CLASS,
} from "../constant";

const EmailNotificationsSection = () => (
  <SectionCard title="Email notifications">
    <ListRenderer
      data={emailNotificationFields}
      keyExtractor={(field) => field.name}
      emptyComponent={<></>}
      className="space-y-5! p-0!"
      renderItem={(field) => (
        <InputField
          name={field.name}
          label={field.label}
          type="email"
          layout="vertical"
          placeholder="Enter an email address to enable this notification"
          labelClassName={FIELD_LABEL_CLASS}
          controlClassName={FIELD_CONTROL_CLASS}
        />
      )}
    />
  </SectionCard>
);

export default EmailNotificationsSection;
