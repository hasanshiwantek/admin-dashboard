import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchCategories,
  updateBulkCategory,
  updateCategory,
} from "@/redux/slices/categorySlice";
import { errorMessage, infoMessage } from "@/utils/message";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addSubcategoryRoute,
  CATEGORY_AUTO_EXPAND_DELAY,
  CATEGORY_DRAG_ACTIVATION,
  CATEGORY_ROOT_DROP_ID,
  categoryProductsRoute,
  categoryStorefrontUrl,
  editCategoryRoute,
} from "./constant";
import type { CategoryNode, CategoryPick } from "./type";
import {
  findCategoryNode,
  getCategoryTrailIds,
  getParentId,
  getSubtreeIds,
  trimSlashes,
} from "./utils";
import { getSelectedStore } from "@/utils/storage";

const EMPTY_TREE: CategoryNode[] = [];
const NO_PICK: CategoryPick = { id: null, path: "" };

const useCategoriesPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories =
    (useAppSelector(
      (state) => (state.category.categories as { data?: CategoryNode[] })?.data,
    ) as CategoryNode[] | undefined) ?? EMPTY_TREE;
  const loading = useAppSelector((state) => state.category.loading);

  const [selected, setSelected] = useState<CategoryNode[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [searchPick, setSearchPick] = useState<CategoryPick>(NO_PICK);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [moving, setMoving] = useState(false);
  const [deleteTargets, setDeleteTargets] = useState<CategoryNode[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: CATEGORY_DRAG_ACTIVATION,
    }),
  );

  const refresh = () => dispatch(fetchCategories());

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // The sidebar link re-opens this page with ?t= to start fresh
  const resetToken = searchParams.get("t");
  useEffect(() => {
    if (!resetToken) return;
    setSelected([]);
    setSearchPick(NO_PICK);
    dispatch(fetchCategories());
  }, [resetToken, dispatch]);

  const selectedIds = selected.map(({ id }) => id);

  const handleToggleSelect = (category: CategoryNode, checked: boolean) =>
    setSelected((current) =>
      checked
        ? [...current, category]
        : current.filter(({ id }) => id !== category.id),
    );

  const handleToggleExpand = (id: number) =>
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleSearchPick = (pick: { id: number; path: string }) => {
    setSearchPick(pick);
    setExpandedIds(
      (current) =>
        new Set([...current, ...getCategoryTrailIds(categories, pick.id)]),
    );
  };

  const setVisibility = async (category: CategoryNode, isVisible: boolean) => {
    const result = await dispatch(
      updateCategory({
        id: category.id,
        data: { name: category.name, isVisible },
      }),
    );
    if (updateCategory.rejected.match(result)) {
      return errorMessage(result.payload as string);
    }
    refresh();
  };

  const handleBulkVisibility = async (isVisible: boolean) => {
    if (!selected.length) return;
    const result = await dispatch(
      updateBulkCategory({
        data: {
          categories: selected.map((category) => ({ ...category, isVisible })),
        },
      }),
    );
    if (updateBulkCategory.rejected.match(result)) {
      return errorMessage(result.payload as string);
    }
    setSelected([]);
    refresh();
  };

  const confirmDelete = (targets: CategoryNode[]) => {
    setDeleteTargets(targets);
    setDeleteOpen(true);
  };

  const handleCategoryAction =
    (category: CategoryNode) => (action: ActionEnums) => {
      switch (action) {
        case ActionEnums.EDIT:
          return router.push(editCategoryRoute(category.id));
        case ActionEnums.CREATE:
          return router.push(addSubcategoryRoute(category.id));
        case ActionEnums.ENABLE:
          return setVisibility(category, true);
        case ActionEnums.DISABLE:
          return setVisibility(category, false);
        case ActionEnums.VIEW:
          return router.push(categoryProductsRoute(category.id));
        case ActionEnums.VIEW_STOREFRONT:
          return window.open(
            categoryStorefrontUrl(
              getSelectedStore()?.baseUrl,
              trimSlashes(category.slug ?? ""),
            ),
            "_blank",
          );
        case ActionEnums.DELETE:
          return confirmDelete([category]);
      }
    };

  const draggingCategory =
    draggingId !== null ? findCategoryNode(categories, draggingId) : null;
  // A category can't move into itself or anything under it
  const blockedDropIds = draggingCategory
    ? getSubtreeIds(draggingCategory)
    : [];

  // Hovering a collapsed category while dragging opens it, so nested
  // categories can be reached
  useEffect(() => {
    if (hoverId === null || expandedIds.has(hoverId)) return;
    if (!findCategoryNode(categories, hoverId)?.subcategories?.length) return;
    const timer = setTimeout(
      () => setExpandedIds((current) => new Set([...current, hoverId])),
      CATEGORY_AUTO_EXPAND_DELAY,
    );
    return () => clearTimeout(timer);
  }, [hoverId, expandedIds, categories]);

  const handleDragOver = ({ over }: DragOverEvent) =>
    setHoverId(typeof over?.id === "number" ? over.id : null);

  // Dropped on a category: nest it there. On the top strip: make it top-level
  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    setDraggingId(null);
    setHoverId(null);
    const dragged = findCategoryNode(categories, Number(active.id));
    if (!over || !dragged) return;

    const parentId = over.id === CATEGORY_ROOT_DROP_ID ? null : Number(over.id);
    if (parentId !== null && blockedDropIds.includes(parentId)) return;
    if (parentId === getParentId(categories, dragged.id)) return;

    setMoving(true);
    const result = await dispatch(
      updateCategory({
        id: dragged.id,
        data: {
          name: dragged.name,
          description: dragged.description,
          parentId,
        },
      }),
    );
    setMoving(false);
    if (updateCategory.rejected.match(result)) {
      errorMessage(result.payload as string);
      return;
    }
    // Show where it went
    if (parentId !== null) {
      setExpandedIds(
        (current) =>
          new Set([...current, ...getCategoryTrailIds(categories, parentId)]),
      );
    }
    refresh();
  };

  return {
    categories,
    // Only the first load swaps rows for a spinner; later refreshes dim them
    loading: loading && !categories.length,
    refreshing: (loading && categories.length > 0) || moving,
    selectedIds,
    allSelected: categories.length > 0 && selected.length === categories.length,
    handleSelectAll: (checked: boolean) =>
      setSelected(checked ? categories : []),
    handleToggleSelect,
    expandedIds,
    handleToggleExpand,
    searchPick,
    handleSearchPick,
    handleClearSearch: () => {
      setSearchPick(NO_PICK);
      refresh();
    },
    handleBulkVisibility,
    handleDeleteSelected: () => {
      if (!selected.length) {
        return infoMessage(
          "Please select at least one category before deleting.",
        );
      }
      confirmDelete(selected);
    },
    handleToggleVisibility: setVisibility,
    handleCategoryAction,
    sensors,
    draggingCategory,
    blockedDropIds,
    // The top strip is pointless for a category that's already top-level
    rootDropDisabled:
      draggingCategory !== null &&
      getParentId(categories, draggingCategory.id) === null,
    handleDragStart: ({ active }: DragStartEvent) =>
      setDraggingId(Number(active.id)),
    handleDragOver,
    handleDragEnd,
    handleDragCancel: () => {
      setDraggingId(null);
      setHoverId(null);
    },
    deleteTargets,
    deleteOpen,
    setDeleteOpen,
    handleDeleted: () => {
      setSelected([]);
      refresh();
    },
    refresh,
  };
};

export default useCategoriesPageContainer;
