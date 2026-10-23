"use client";

import ActionButton from "@/components/ActionButton/ActionButton";
import Form from "@/components/form/Form";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import PageLayout from "@/components/ui/PageLayout";
import DeleteLocationModal from "@/Modals/LocationModals/DeleteLocationModal/DeleteLocationModal";
import SectionNav from "@/components/SectionNav/SectionNav";
import LocationAddressSection from "../_components/LocationAddressSection";
import LocationContactSection from "../_components/LocationContactSection";
import LocationDetailsSection from "../_components/LocationDetailsSection";
import LocationGeneralSection from "../_components/LocationGeneralSection";
import { LOCATIONS_ROUTE } from "../constant";
import useLocationFormPageContainer from "./container";

const LocationFormPage = () => {
  const {
    form,
    isEdit,
    record,
    isEnabled,
    title,
    navSections,
    activeSection,
    isUnitedStates,
    openingHours,
    openingHourColumns,
    specialHourRows,
    specialHourColumns,
    scrollToSection,
    handleCountryChange,
    handleAddSpecialHour,
    locationActions,
    handleLocationAction,
    deleteOpen,
    setDeleteOpen,
    handleDeleted,
    handleCancel,
    onSubmit,
    onInvalid,
  } = useLocationFormPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Locations", href: LOCATIONS_ROUTE }}
      title={title}
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
        titleAdornment: isEdit && (
          <StatusBadge tone={isEnabled ? "success" : "neutral"}>
            {isEnabled ? "Enabled" : "Disabled"}
          </StatusBadge>
        ),
        action: isEdit && record && (
          <ActionButton
            data={record}
            actions={locationActions}
            onAction={handleLocationAction}
            label="Location actions"
            triggerProps={{
              variant: "outline",
            }}
          />
        ),
      }}
      headerClassName="mb-4 border-b border-border-light pb-8"
      className="mx-auto min-h-screen w-full max-w-[130rem]"
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        bodyClassName="gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
        }}
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[24rem_minmax(0,1fr)]">
          <SectionNav
            sections={navSections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />

          <div className="flex min-w-0 flex-col gap-8">
            <LocationGeneralSection />
            <LocationAddressSection
              isUnitedStates={isUnitedStates}
              onCountryChange={handleCountryChange}
            />
            <LocationContactSection />
            <LocationDetailsSection
              openingHours={openingHours}
              openingHourColumns={openingHourColumns}
              specialHours={specialHourRows}
              specialHourColumns={specialHourColumns}
              onAddSpecialHour={handleAddSpecialHour}
            />
          </div>
        </div>
      </Form>

      {record && (
        <DeleteLocationModal
          location={{ id: record.id, name: record.name }}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onDeleted={handleDeleted}
        />
      )}
    </PageLayout>
  );
};

export default LocationFormPage;
