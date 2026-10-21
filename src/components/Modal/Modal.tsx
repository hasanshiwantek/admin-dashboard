"use client";

import Form from "@/components/form/Form";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";
import {
  MODAL_BODY_CLASS,
  MODAL_BODY_LOADING_CLASS,
  MODAL_CONTENT_CLASS,
  MODAL_DESCRIPTION_CLASS,
  MODAL_ERROR_CLASS,
  MODAL_FOOTER_CLASS,
  MODAL_FORM_CLASS,
  MODAL_HEADER_CLASS,
  MODAL_HEADER_WITH_TABS_CLASS,
  MODAL_SIZE_CLASS,
  MODAL_TABS_CLASS,
  MODAL_TITLE_CLASS,
} from "./constant";
import useModalContainer from "./ModalContainer";
import { ModalBodyProps, ModalFooterProps, ModalProps } from "./type";

// Body content: error banner on top, dimmed and locked under a spinner
// while `loading`
const ModalBodyContent = ({
  loading,
  loadingText,
  error,
  errorClassName,
  children,
}: ModalBodyProps) => (
  <>
    <div
      aria-busy={loading}
      className={cn(
        "flex flex-col gap-6 transition-opacity duration-200",
        loading && LOADING_DIM_CLASS,
      )}
    >
      {error && (
        <div role="alert" className={cn(MODAL_ERROR_CLASS, errorClassName)}>
          {error}
        </div>
      )}
      {children}
    </div>
    {loading && <LoadingOverlay text={loadingText} />}
  </>
);

const ModalFooter = ({
  pending,
  isSubmit,
  onSave,
  onCancel,
  saveText = "Save",
  loadingText = "Saving...",
  cancelText = "Cancel",
  hideCancel,
  saveDisabled,
  footerClassName,
  saveButtonClassName,
  cancelButtonClassName,
}: ModalFooterProps) => (
  <div className={cn(MODAL_FOOTER_CLASS, footerClassName)}>
    {!hideCancel && (
      <Button
        type="button"
        variant="link"
        size="xl"
        onClick={onCancel}
        disabled={pending}
        className={cn(
          "text-xl! text-blue-500! no-underline!",
          cancelButtonClassName,
        )}
      >
        {cancelText}
      </Button>
    )}
    <Button
      type={isSubmit ? "submit" : "button"}
      size="xl"
      onClick={isSubmit ? undefined : onSave}
      disabled={pending || saveDisabled}
      className={cn("btn-primary text-xl! 2xl:text-2xl!", saveButtonClassName)}
    >
      {pending ? loadingText : saveText}
    </Button>
  </div>
);

export function Modal<T extends FieldValues = FieldValues>({
  children,
  trigger,
  open,
  onOpenChange,
  defaultOpen,
  onOpen,
  onClose,
  title,
  description,
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  showCloseButton = true,
  contentLoading,
  contentLoadingText,
  error,
  errorClassName,
  isForm,
  form,
  onSubmit,
  onInvalid,
  footer,
  onSave,
  onCancel,
  saveText,
  loadingText,
  cancelText,
  hideCancel,
  loading,
  saveDisabled,
  closeOnSave,
  size = "md",
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  tabsClassName,
  tabClassName,
  activeTabClassName,
  bodyClassName,
  footerClassName,
  saveButtonClassName,
  cancelButtonClassName,
}: ModalProps<T>) {
  const {
    isOpen,
    setOpen,
    close,
    pending,
    handleSave,
    handleSubmit,
    handleCancel,
    currentTab,
    handleTabChange,
  } = useModalContainer({
    open,
    onOpenChange,
    defaultOpen,
    onOpen,
    onClose,
    onSave,
    onSubmit,
    onCancel,
    closeOnSave,
    activeTab,
    defaultTab,
    onTabChange,
    firstTabKey: tabs?.[0]?.key,
  });

  const withForm = !!isForm && !!form;
  const hasTabs = !!tabs?.length;
  // Tab `content` renders in the body (inside <Form>), not under the tab bar,
  // so AppTabs only gets the labels
  const tabBar = tabs?.map(({ content: _content, ...tab }) => tab);
  const activeTabContent = tabs?.find((tab) => tab.key === currentTab)?.content;
  const content = (
    <ModalBodyContent
      loading={contentLoading}
      loadingText={contentLoadingText}
      error={error}
      errorClassName={errorClassName}
    >
      {typeof children === "function" ? children({ close }) : children}
      {activeTabContent}
    </ModalBodyContent>
  );
  const bodyClass = cn(
    MODAL_BODY_CLASS,
    contentLoading && MODAL_BODY_LOADING_CLASS,
    bodyClassName,
  );

  const footerNode =
    footer === false
      ? null
      : (footer ?? (
          <ModalFooter
            pending={pending || !!loading}
            isSubmit={withForm}
            onSave={handleSave}
            onCancel={handleCancel}
            saveText={saveText}
            loadingText={loadingText}
            cancelText={cancelText}
            hideCancel={hideCancel}
            saveDisabled={saveDisabled || contentLoading}
            footerClassName={footerClassName}
            saveButtonClassName={saveButtonClassName}
            cancelButtonClassName={cancelButtonClassName}
          />
        ));

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(MODAL_CONTENT_CLASS, MODAL_SIZE_CLASS[size], className)}
      >
        {(title || description) && (
          <DialogHeader
            className={cn(
              MODAL_HEADER_CLASS,
              hasTabs && MODAL_HEADER_WITH_TABS_CLASS,
              headerClassName,
            )}
          >
            {title && (
              <DialogTitle className={cn(MODAL_TITLE_CLASS, titleClassName)}>
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription
                className={cn(MODAL_DESCRIPTION_CLASS, descriptionClassName)}
              >
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {hasTabs && (
          <AppTabs
            tabs={tabBar ?? []}
            activeTab={currentTab}
            onTabChange={handleTabChange}
            variant="underline"
            className={cn(MODAL_TABS_CLASS, tabsClassName)}
            tabClassName={tabClassName}
            activeTabClassName={activeTabClassName}
          />
        )}

        {withForm ? (
          <Form
            form={form}
            onSubmit={handleSubmit}
            onInvalid={onInvalid}
            className={MODAL_FORM_CLASS}
            bodyClassName={bodyClass}
            footer={footerNode ?? false}
          >
            {content}
          </Form>
        ) : (
          <>
            <div className={bodyClass}>{content}</div>
            {footerNode}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
