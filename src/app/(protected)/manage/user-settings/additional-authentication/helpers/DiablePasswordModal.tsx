"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Lock } from "lucide-react";

export default function DisablePasswordModal({
    open,
    onOpenChange,
    onConfirm,
    loading
}: {
    open: boolean;
    loading: boolean;
    onOpenChange: (value: boolean) => void;
    onConfirm: (password: string) => void;
}) {
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const handleConfirm = () => {
        if (!password.trim()) {
            setShowError(true);
            return;
        }
        onConfirm(password); // ✅ pass password to parent
    };

    useEffect(() => {
        setPassword("");
        setShowError(false);
    }, [])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-[440px] p-8">

                {/* ✅ Header with lock icon */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <DialogTitle className="text-base font-medium">
                            Confirm your password
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                            For security purposes, please enter your current password to continue.
                        </DialogDescription>
                    </div>
                </div>

                {/* ✅ Divider */}
                <div className="border-t pt-5">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setShowError(false);
                            }}
                            className="!max-w-full"
                        />
                        {showError && (
                            <p className="text-sm text-red-500">Please enter your password</p>
                        )}
                    </div>
                </div>

                {/* ✅ Footer */}
                <div className="flex justify-end gap-2 pt-6">
                    <Button
                        variant="outline"
                        type="button"
                        className="text-lg p-5"
                        onClick={() => {
                            setPassword("");
                            setShowError(false);
                            onOpenChange(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"  
                        className="text-lg p-5"
                        disabled={!password.trim() || loading}
                        onClick={handleConfirm}
                    >
                        {loading ? "Confirming..." : "Confirm"}
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
}