import { REGEX } from "@/const/regex";
import { useCallback, useRef, useState } from "react";

const getScrollParent = (node: HTMLElement): HTMLElement | null => {
  let parent = node.parentElement;
  while (parent && parent !== document.body) {
    if (REGEX.SCROLLABLE_OVERFLOW.test(getComputedStyle(parent).overflowY)) return parent;
    parent = parent.parentElement;
  }
  return null;
};

// Collapses once the scroll container (found from the element given to `ref`)
// scrolls past `collapseAt` px, and expands only back above `expandAt`
const useScrollCollapse = ({
  collapseAt,
  expandAt,
}: {
  collapseAt: number;
  expandAt: number;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const cleanup = useRef<(() => void) | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      cleanup.current?.();
      cleanup.current = null;
      if (!node) return;

      const container = getScrollParent(node);
      const target: HTMLElement | Window = container ?? window;
      const getScrollTop = () => (container ? container.scrollTop : window.scrollY);
      let frame = 0;

      const update = () => {
        frame = 0;
        const scrollTop = getScrollTop();
        setCollapsed((prev) =>
          prev ? scrollTop > expandAt : scrollTop > collapseAt,
        );
      };
      const handleScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      // Stops the browser re-anchoring the scroll on every frame while the
      // collapsing content animates, which makes it judder
      const scroller = container ?? document.documentElement;
      const previousAnchor = scroller.style.overflowAnchor;
      scroller.style.overflowAnchor = "none";

      target.addEventListener("scroll", handleScroll, { passive: true });
      update();
      cleanup.current = () => {
        target.removeEventListener("scroll", handleScroll);
        cancelAnimationFrame(frame);
        scroller.style.overflowAnchor = previousAnchor;
      };
    },
    [collapseAt, expandAt],
  );

  return { ref, collapsed };
};

export default useScrollCollapse;
