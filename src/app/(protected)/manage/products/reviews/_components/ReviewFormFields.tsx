import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import {
  RatingOptions,
  ReviewFormNames,
  ReviewStatusOptions,
} from "../[id]/constant";

const ReviewFormFields = () => (
  <>
    <InputField name={ReviewFormNames.Name} label="Review Title" required />
    <InputField
      name={ReviewFormNames.Comment}
      label="Review"
      isTextArea
      required
      controlClassName="max-w-md"
    />
    <InputField name={ReviewFormNames.UserName} label="Author" />
    <InputField
      name={ReviewFormNames.Approved}
      label="Status"
      required
      Component={SelectField}
      options={ReviewStatusOptions}
    />
    <InputField
      name={ReviewFormNames.Rating}
      label="Rating"
      required
      Component={SelectField}
      options={RatingOptions}
    />
  </>
);

export default ReviewFormFields;
