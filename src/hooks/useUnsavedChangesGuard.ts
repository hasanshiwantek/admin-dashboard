import { useSafeBack } from "@/hooks/useSafeBack";
import { useEffect, useRef, useState } from "react";

// Guards a form with unsaved changes against closing the tab, the browser
// back button and in-app "back"/"cancel". While dirty, an extra history entry
// catches the back button so the page can ask first (pair with
// UnsavedChangesModal).
const useUnsavedChangesGuard = (isDirty: boolean, fallbackPath: string) => {
  const goBack = useSafeBack(fallbackPath);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const guardEntry = useRef(false);
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;
  // Navigation waiting for the guard entry to be popped (see leaveForm)
  const pendingNav = useRef<(() => void) | null>(null);

  const pushGuardEntry = () => {
    window.history.pushState(null, "", window.location.href);
    guardEntry.current = true;
  };

  useEffect(() => {
    if (isDirty && !guardEntry.current) pushGuardEntry();
  }, [isDirty]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirtyRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (pendingNav.current) {
        const navigate = pendingNav.current;
        pendingNav.current = null;
        return navigate();
      }
      if (!guardEntry.current) return;
      guardEntry.current = false;
      if (isDirtyRef.current) setLeaveOpen(true);
      else goBack();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [goBack]);

  // Drops the guard entry before navigating, so the form keeps one history
  // entry and back returns to the page it was opened from
  const leaveForm = (navigate: () => void = goBack) => {
    if (!guardEntry.current) return navigate();
    guardEntry.current = false;
    pendingNav.current = navigate;
    window.history.back();
  };

  // Back/cancel from the page itself: asks first when there are changes
  const requestLeave = () => {
    if (guardEntry.current) window.history.back();
    else goBack();
  };

  const confirmLeave = () => {
    setLeaveOpen(false);
    goBack();
  };

  const stay = () => {
    setLeaveOpen(false);
    pushGuardEntry();
  };

  return {
    leaveOpen,
    setLeaveOpen,
    requestLeave,
    confirmLeave,
    stay,
    leaveForm,
  };
};

export default useUnsavedChangesGuard;
