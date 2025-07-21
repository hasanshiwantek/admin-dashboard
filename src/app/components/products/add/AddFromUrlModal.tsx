"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PreviewItem } from "@/types/types";
type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  addUrlPreview: (preview: PreviewItem) => void;
};

export default function AddFromUrlModal({
  open,
  onOpenChange,
  addUrlPreview,
}: Props) {
  const [url, setUrl] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-4xl w-full p-10">
        <DialogHeader>
          <DialogTitle>Add Image/YouTube Video from URL</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="font-medium">URL</Label>
            <Input
              type="text"
              placeholder="http://"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Maximum image size is 8 MB.
            </p>
          </div>

          <div className="border   rounded p-8 flex items-center justify-center h-96 bg-muted">
            {url ? (
              <img
                src={url}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="text-muted-foreground text-center text-sm opacity-50">
                <img
                  src="/placeholder-image.svg"
                  alt="placeholder"
                  className="w-16 h-16 mx-auto mb-2"
                />
                Preview
              </div>
            )}
          </div>

          <span className="my-5">
            This API integrates with YouTube. By continuing, you agree to the{" "}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              YouTube Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Privacy Policy
            </a>
            .
          </span>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="text-xl cursor-pointer p-5">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="text-xl cursor-pointer p-5"
            disabled={!url}
            onClick={() => {
              addUrlPreview({
                file: null,
                url,
                description: "",
                selected: false,
                isThumbnail: false,
              });
              onOpenChange(false);
              setUrl("");
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
