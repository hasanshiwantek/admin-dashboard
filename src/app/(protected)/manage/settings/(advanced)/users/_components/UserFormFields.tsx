import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import SectionCard from "@/components/SectionCard/SectionCard";
import { UserField, userRoleOptions } from "../constant";
import PermissionGroupField from "./PermissionGroupField";
import { UserFormFieldsProps } from "./type";

// The fields shared by the add and edit user pages (rendered inside <Form>)
const UserFormFields = ({ permissionGroups, isEdit }: UserFormFieldsProps) => (
  <div className="flex flex-col gap-8">
    <SectionCard title="Personal Information">
      <InputField
        name={UserField.FirstName}
        label="First Name"
        required
        placeholder="John"
        controlClassName="max-w-md"
      />
      <InputField
        name={UserField.LastName}
        label="Last Name"
        required
        placeholder="Doe"
        controlClassName="max-w-md"
      />
      <InputField
        name={UserField.Email}
        label="Email"
        required={!isEdit}
        type="email"
        placeholder="john@example.com"
        disabled={isEdit}
        hint={isEdit ? "A user's email can't be changed." : undefined}
        controlClassName="max-w-md"
      />
      <InputField
        name={UserField.PhoneNumber}
        label="Phone Number"
        required
        type="tel"
        placeholder="+92 300 1234567"
        controlClassName="max-w-md"
      />
    </SectionCard>

    <SectionCard title="Permissions">
      <InputField
        name={UserField.UserRole}
        label="User Role"
        Component={SelectField}
        options={userRoleOptions}
        placeholder="Select user role"
        disabled={isEdit}
        controlClassName="max-w-md"
      />
      <ListRenderer
        data={permissionGroups}
        keyExtractor={(group) => group.group}
        emptyComponent={<></>}
        className="space-y-5! p-0!"
        renderItem={(group) => (
          <InputField
            name={UserField.Permissions}
            label={group.group}
            labelClassName="capitalize"
            Component={PermissionGroupField}
            group={group}
          />
        )}
      />
    </SectionCard>
  </div>
);

export default UserFormFields;
