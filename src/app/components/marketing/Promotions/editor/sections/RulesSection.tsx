"use client";

import { useFormContext } from "@/components/form/Form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValidationError } from "@/components/ui/validation-error";
import { cn } from "@/lib/utils";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { PromotionField } from "../constant";
import RuleBuilder from "../RuleBuilder";
import RuleTemplateDialog from "../modals/RuleTemplateDialog";
import {
  CARD,
  CARD_DESCRIPTION,
  CARD_HEADER,
  CARD_TITLE,
  ERROR,
  ICON_BUTTON,
  LINK_BUTTON,
  PRIMARY_BUTTON,
  TEXT,
} from "../styles";
import { PromotionFormValues, RuleValues } from "../types";
import { PromotionLookups } from "../hooks/usePromotionLookups";
import { describeCondition, describeReward } from "../utils";

/** The rule open in the builder; `key` remounts the builder on a new rule. */
export type EditingRule = { rule: RuleValues; isNew: boolean; key: number };

const HEAD = cn(TEXT, "font-semibold! text-gray-800 py-4 px-4");
const CELL = cn(TEXT, "py-5 px-4 text-gray-800");

/**
 * `editing` is owned by the page, which shows only this section while a rule
 * is open in the builder (as BigCommerce does).
 */
const RulesSection = ({
  lookups,
  editing,
  setEditing,
}: {
  lookups: PromotionLookups;
  editing: EditingRule | null;
  setEditing: (editing: EditingRule | null) => void;
}) => {
  const { setValue, clearErrors, formState, watch } =
    useFormContext<PromotionFormValues>();
  // watch([...]) types enum-keyed fields as never, so the tuple is cast.
  const [currency, rule] = watch([
    PromotionField.Currency,
    PromotionField.Rule,
  ]) as [
    PromotionFormValues[PromotionField.Currency],
    PromotionFormValues[PromotionField.Rule],
  ];
  const ruleError = formState.errors[PromotionField.Rule]?.message;

  const [chooserOpen, setChooserOpen] = useState(false);

  const startEditing = (rule: RuleValues, isNew: boolean) => {
    setEditing({ rule, isNew, key: Date.now() });
    setChooserOpen(false);
  };

  const commit = (rule: RuleValues) => {
    setValue(PromotionField.Rule, rule, { shouldDirty: true });
    clearErrors(PromotionField.Rule);
    setEditing(null);
  };

  return (
    // While editing, the builder's fixed footer needs room below the card.
    <Card className={cn(CARD, editing && "mb-28")}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>
          Rules
          <ShoppingCart className="size-8" />
        </CardTitle>
        {!editing && (
          <CardDescription className={CARD_DESCRIPTION}>
            What conditions must a customer satisfy to receive the reward
            you&apos;re offering?
          </CardDescription>
        )}
        {editing && (
          <CardAction>
            <Button
              type="button"
              variant="link"
              className={LINK_BUTTON}
              onClick={() => setChooserOpen(true)}
            >
              Switch rule
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="px-0">
        {editing ? (
          <RuleBuilder
            key={editing.key}
            initialRule={editing.rule}
            isNew={editing.isNew}
            currency={currency}
            lookups={lookups}
            onSave={commit}
            onCancel={() => setEditing(null)}
          />
        ) : rule ? (
          <Table>
            <TableHeader>
              <TableRow className="border-t">
                <TableHead className={HEAD}>Condition</TableHead>
                <TableHead className={HEAD}>Reward</TableHead>
                <TableHead />
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b!">
                <TableCell className={CELL}>
                  {describeCondition(rule)}
                </TableCell>
                <TableCell className={CELL}>{describeReward(rule)}</TableCell>
                <TableCell className={CELL}>
                  <Button
                    type="button"
                    variant="link"
                    className={LINK_BUTTON}
                    onClick={() => startEditing(rule, false)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell className={cn(CELL, "w-16")}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete rule"
                    className={ICON_BUTTON}
                    onClick={() =>
                      setValue(PromotionField.Rule, null, {
                        shouldDirty: true,
                      })
                    }
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center gap-5 py-8 border-y border-gray-200">
            <p className={cn(TEXT, "text-gray-500")}>
              You don&apos;t have any discount rules for this promotion yet.
            </p>
            <Button
              type="button"
              size="xl"
              className={PRIMARY_BUTTON}
              onClick={() => setChooserOpen(true)}
            >
              <Plus className="size-6" />
              Add rule
            </Button>
            <ValidationError className={ERROR} message={ruleError} />
          </div>
        )}
      </CardContent>

      <RuleTemplateDialog
        open={chooserOpen}
        onClose={() => setChooserOpen(false)}
        onSelect={(rule) => startEditing(rule, editing?.isNew ?? true)}
      />
    </Card>
  );
};

export default RulesSection;
