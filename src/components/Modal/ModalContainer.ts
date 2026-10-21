import { useCallback, useState } from "react";
import { UseModalContainerArgs } from "./type";

// For modals whose logic needs to know when they're open (e.g. fetch on open).
// Use it inside the modal component and spread `modalProps` onto <Modal>;
// pages never hold this state, they only pass a `trigger`.
export const useModal = (defaultOpen = false) => {
  const [open, setOpen] = useState(defaultOpen);

  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    modalProps: { open, onOpenChange: setOpen },
  };
};

// Internal logic of <Modal>: open state (controlled or not), open/close
// callbacks, and save/submit that closes on success
const useModalContainer = ({
  open,
  onOpenChange,
  defaultOpen = false,
  onOpen,
  onClose,
  onSave,
  onSubmit,
  onCancel,
  closeOnSave = true,
  activeTab,
  defaultTab,
  onTabChange,
  firstTabKey,
}: UseModalContainerArgs) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalTab, setInternalTab] = useState(defaultTab);
  const [pending, setPending] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
      if (next) {
        onOpen?.();
      } else {
        setInternalTab(defaultTab); // reopen on the starting tab
        onClose?.();
      }
    },
    [isControlled, onOpenChange, onOpen, onClose, defaultTab],
  );

  const close = () => setOpen(false);

  // Active tab: controlled by the caller, else tracked here
  const currentTab = activeTab ?? internalTab ?? firstTabKey;
  const handleTabChange = (key: string) => {
    if (activeTab === undefined) setInternalTab(key);
    onTabChange?.(key);
  };

  // Runs the action; closes unless it returned false
  const runAndClose = async (action?: () => unknown) => {
    setPending(true);
    try {
      const result = await action?.();
      if (result !== false && closeOnSave) close();
    } finally {
      setPending(false);
    }
  };

  return {
    isOpen,
    setOpen,
    close,
    currentTab,
    handleTabChange,
    pending,
    handleSave: () => runAndClose(onSave),
    handleSubmit: (values: unknown) => runAndClose(() => onSubmit?.(values)),
    handleCancel: () => {
      onCancel?.();
      close();
    },
  };
};

export default useModalContainer;
