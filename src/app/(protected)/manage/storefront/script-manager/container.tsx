"use client";

import type { RowAction, TableSort } from "@/components/ui/Table/types";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { deleteScript, fetchScripts } from "@/redux/slices/storefrontSlice";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ScriptRecord } from "./type";

const useScriptManagerContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const scriptsResponse = useAppSelector(
    (state: any) => state?.storefront?.scriptData,
  );
  const { loading, error } = useAppSelector((state: any) => state?.storefront);

  const scripts = useMemo<ScriptRecord[]>(
    () =>
      Array.isArray(scriptsResponse?.script) ? scriptsResponse.script : [],
    [scriptsResponse],
  );
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const [sort, setSort] = useState<TableSort | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteScript, setPendingDeleteScript] =
    useState<ScriptRecord | null>(null);

  useEffect(() => {
    dispatch(fetchScripts());
  }, [dispatch]);

  const filteredScripts = useMemo(() => {
    const searchTerm = keyword.trim().toLocaleLowerCase();
    const matchingScripts = searchTerm
      ? scripts.filter((script) =>
          [
            script.script_name,
            script.location,
            script.placement,
            script.script_type,
          ].some((value) =>
            String(value ?? "")
              .toLocaleLowerCase()
              .includes(searchTerm),
          ),
        )
      : scripts;

    if (!sort) return matchingScripts;

    return [...matchingScripts].sort((a, b) => {
      const aValue = a[sort.key] ?? "";
      const bValue = b[sort.key] ?? "";
      const comparison =
        sort.key === "created_at"
          ? new Date(String(aValue)).getTime() -
            new Date(String(bValue)).getTime()
          : String(aValue).localeCompare(String(bValue), undefined, {
              numeric: true,
              sensitivity: "base",
            });

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [keyword, scripts, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredScripts.length / Number(perPage)),
  );
  const page = Math.min(currentPage, totalPages);
  const visibleScripts = filteredScripts.slice(
    (page - 1) * Number(perPage),
    page * Number(perPage),
  );

  const handleDelete = async () => {
    if (!pendingDeleteScript) return;

    try {
      const resultAction = await dispatch(
        deleteScript({ id: pendingDeleteScript.id }),
      );

      if (deleteScript.fulfilled.match(resultAction)) {
        dispatch(fetchScripts());
      }
    } catch (deleteError) {
      console.error("Error deleting script:", deleteError);
    } finally {
      setShowDeleteModal(false);
      setPendingDeleteScript(null);
    }
  };

  const getScriptRowActions = (
    script: ScriptRecord,
  ): RowAction<ScriptRecord>[] => [
    {
      label: "Edit",
      onClick: () =>
        router.push(`/manage/storefront/script-manager/edit/${script.id}`),
    },
    {
      label: "Delete",
      onClick: () => {
        setPendingDeleteScript(script);
        setShowDeleteModal(true);
      },
    },
  ];

  const actions = (
    <div className="flex items-center">
      <Button
        type="button"
        className="flex items-center gap-2 px-6! btn-outline-primary 2xl:text-2xl h-13 py-0 my-0"
        onClick={() => router.push("/manage/storefront/script-manager/add")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create a script
      </Button>
    </div>
  );

  return {
    actions,
    currentPage: page,
    error,
    filteredScriptCount: filteredScripts?.length,
    getScriptRowActions,
    handleDelete,
    keyword,
    loading,
    pageScripts: visibleScripts,
    pendingDeleteScript,
    perPage,
    refetchScripts: () => dispatch(fetchScripts()),
    router,
    setCurrentPage,
    setKeyword,
    setPendingDeleteScript,
    setPerPage,
    setShowDeleteModal,
    setSort,
    showDeleteModal,
    sort,
    totalPages,
  };
};

export default useScriptManagerContainer;
