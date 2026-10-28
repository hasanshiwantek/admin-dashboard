"use client";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  createScripts,
  fetchScriptById,
  updateScript,
} from "@/redux/slices/storefrontSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ScriptSchema } from "@/validations/formValidations";
import {
  ScriptCategory,
  SCRIPT_FORM_DEFAULT_VALUES,
  ScriptLoadMethod,
  ScriptLocation,
  SCRIPT_MANAGER_ROUTE,
  ScriptFormNames,
  ScriptPlacement,
  ScriptType,
} from "./constant";
import type { ScriptFormValues } from "./types";
import {
  getLoadedScriptFormValues,
  toCamelCaseRecord,
  toSnakeCase,
} from "./utils";

export function useScriptFormContainer() {
  const params = useParams<{ id?: string }>();
  const scriptId = params?.id;
  const isEdit = Boolean(scriptId && scriptId !== "add");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<ScriptFormValues>({
    resolver: yupResolver(ScriptSchema),
    defaultValues: SCRIPT_FORM_DEFAULT_VALUES,
  });
  const { reset, watch } = form;

  const [integrityHashes, setIntegrityHashes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingScript, setFetchingScript] = useState(false);
  const scriptType = watch(ScriptFormNames.ScriptType);
  const currentHash = watch(ScriptFormNames.CurrentIntegrityHash) || "";

  useEffect(() => {
    if (!isEdit || !scriptId) return;

    setFetchingScript(true);
    dispatch(fetchScriptById({ id: scriptId }))
      .unwrap()
      .then((response) => {
        const scriptData = toCamelCaseRecord(response?.data);

        if (Object.keys(scriptData).length === 0) return;

        const loadedScriptType =
          scriptData[ScriptFormNames.ScriptType] === ScriptType.SCRIPT
            ? ScriptType.SCRIPT
            : ScriptType.URL;

        const loadedValues = getLoadedScriptFormValues(
          scriptData,
          loadedScriptType,
        );
        reset(loadedValues);
        setIntegrityHashes(loadedValues[ScriptFormNames.IntegrityHashes] ?? []);
      })
      .catch((error: unknown) => {
        console.error("Failed to fetch script:", error);
      })
      .finally(() => {
        setFetchingScript(false);
      });
  }, [dispatch, isEdit, reset, scriptId]);

  const submitScript = async (values: ScriptFormValues) => {
    const formValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        if (key === ScriptFormNames.CurrentIntegrityHash) return false;
        if (
          values[ScriptFormNames.ScriptType] === ScriptType.URL &&
          key === ScriptFormNames.ScriptContents
        ) {
          return false;
        }
        if (
          values[ScriptFormNames.ScriptType] === ScriptType.SCRIPT &&
          key === ScriptFormNames.ScriptUrl
        ) {
          return false;
        }
        return true;
      }),
    );
    const payload = toSnakeCase({
      ...formValues,
      integrityHashes,
    });

    setLoading(true);
    try {
      if (isEdit && scriptId) {
        const resultAction = await dispatch(
          updateScript({ id: scriptId, data: payload }),
        );
        if (updateScript.fulfilled.match(resultAction)) {
          setTimeout(() => router.push(SCRIPT_MANAGER_ROUTE), 600);
        }
      } else {
        const resultAction = await dispatch(createScripts(payload));
        if (createScripts.fulfilled.match(resultAction)) {
          setTimeout(() => router.push(SCRIPT_MANAGER_ROUTE), 600);
        } else {
          console.error(
            "Failed to create script:",
            resultAction.payload || resultAction.error,
          );
        }
      }
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addHash = () => {
    const nextHashes = [...integrityHashes, currentHash];
    setIntegrityHashes(nextHashes);
    form.setValue(ScriptFormNames.IntegrityHashes, nextHashes);
    form.setValue(ScriptFormNames.CurrentIntegrityHash, "");
  };

  const updateHash = (index: number, value: string) => {
    const nextHashes = integrityHashes.map((hash, hashIndex) =>
      hashIndex === index ? value : hash,
    );
    setIntegrityHashes(nextHashes);
    form.setValue(ScriptFormNames.IntegrityHashes, nextHashes);
  };

  const removeHash = (index: number) => {
    const nextHashes = integrityHashes.filter(
      (_, hashIndex) => hashIndex !== index,
    );
    setIntegrityHashes(nextHashes);
    form.setValue(ScriptFormNames.IntegrityHashes, nextHashes);
  };

  return {
    addHash,
    fetchingScript,
    form,
    integrityHashes,
    isEdit,
    loading,
    removeHash,
    router,
    scriptType,
    submitScript,
    updateHash,
  };
}
