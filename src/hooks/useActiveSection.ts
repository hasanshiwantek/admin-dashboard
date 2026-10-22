import { useEffect, useRef, useState } from "react";

// A section is active once its top scrolls above this line (px from the top)
const ACTIVE_LINE = 120;
// Scroll updates resume once scrolling has been idle this long (ms)
const SCROLL_IDLE = 150;

// Tracks which section (by element id) is at the top of the viewport while
// scrolling, and scrolls to a section when it's picked from a nav
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const idsKey = sectionIds.join(",");

  // While a nav click is scrolling, keep the clicked section highlighted
  const locked = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const unlockWhenIdle = () => {
    clearTimeout(unlockTimer.current);
    unlockTimer.current = setTimeout(() => {
      locked.current = false;
    }, SCROLL_IDLE);
  };

  useEffect(() => {
    const ids = idsKey.split(",");

    const updateActiveSection = () => {
      if (locked.current) return unlockWhenIdle();

      let current = ids[0];
      ids.forEach((id) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= ACTIVE_LINE) current = id;
      });
      setActiveSection(current);
    };

    // Capture catches scrolling in any container, not just the window
    document.addEventListener("scroll", updateActiveSection, {
      capture: true,
      passive: true,
    });
    updateActiveSection();

    return () => {
      document.removeEventListener("scroll", updateActiveSection, true);
      clearTimeout(unlockTimer.current);
    };
  }, [idsKey]);

  const scrollToSection = (id: string) => {
    locked.current = true;
    unlockWhenIdle();
    setActiveSection(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { activeSection, scrollToSection };
};

export default useActiveSection;
