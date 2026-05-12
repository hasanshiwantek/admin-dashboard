"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}

export default function ConfirmationModal({
    open,
    onClose,
    onConfirm,
    title = "Confirmation",
    message = "Are you sure you want to capture funds for this order?",
    confirmText = "Ok",
    cancelText = "Cancel",
    loading = false,
}: ConfirmationModalProps) {

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            document.body.style.pointerEvents = "";
        }, 100);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="sm:max-w-[700px] p-0 gap-0 rounded-none"
                onEscapeKeyDown={handleClose}
                onPointerDownOutside={handleClose}
            >
                {/* Header - dark background */}
                <DialogHeader className="bg-[#3d4977] px-4 py-3 rounded-none">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="!text-white text-4xl font-medium">
                            {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* Body - message */}
                <div className="px-6 pt-10 pb-20">
                    <p className="text-[23px] text-gray-700">{message}</p>
                </div>

                {/* Footer - gray background */}
                <DialogFooter className="bg-gray-100 px-4 py-3 rounded-none flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="btn-outline-primary w-[50px] 2xl:!text-2xl h-12"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            handleClose();
                        }}
                        disabled={loading}
                        className="btn-outline-primary 2xl:!text-2xl h-12 !text-white !bg-[#64a2e4] w-[50px] border-none"
                    >
                        {loading ? "..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}