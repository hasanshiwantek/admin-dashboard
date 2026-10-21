import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import { ADVANCED_TITLE_PROPS, USERS_ROUTE } from "../../constant";
import { UserFormLayoutProps } from "./type";
import UserFormFields from "./UserFormFields";

// Page shell shared by the add and edit user routes
const UserFormLayout = ({
  title,
  description,
  form,
  onSubmit,
  onCancel,
  loading,
  permissionGroups,
  isEdit,
}: UserFormLayoutProps) => (
  <PageLayout
    backButton={{ label: "Users", href: USERS_ROUTE }}
    title={title}
    titleProps={{ description, ...ADVANCED_TITLE_PROPS }}
  >
    <Form
      form={form}
      onSubmit={onSubmit}
      bodyClassName="relative gap-0 border-0 bg-transparent p-0"
      footer={{ submitText: "Save", onCancel, disabled: loading }}
    >
      <div
        className={cn(
          "transition-opacity duration-200",
          loading && LOADING_DIM_CLASS,
        )}
      >
        <UserFormFields permissionGroups={permissionGroups} isEdit={isEdit} />
      </div>
      {loading && <LoadingOverlay className="justify-start pt-40" />}
    </Form>
  </PageLayout>
);

export default UserFormLayout;
