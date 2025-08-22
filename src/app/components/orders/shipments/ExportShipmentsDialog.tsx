'use client'
import { useState } from 'react';
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Props = { trigger: React.ReactNode; onConfirm: (format: 'csv' | 'xml') => void };

export default function ExportShipmentsDialog({ trigger, onConfirm }: Props) {
  const [format, setFormat] = useState<'csv'|'xml'>('csv');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent className="min-w-[70rem] p-0 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-[#34313f]">
          <AlertDialogTitle className="!text-[2rem] font-light text-gray-700 !text-white">Export</AlertDialogTitle>
          <AlertDialogCancel asChild>
            <button className="!text-[2rem] p-0">×</button>
          </AlertDialogCancel>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <AlertDialogDescription className="text-gray-600">
            You can export as a CSV (Excel/Sheets) or as an XML file.
          </AlertDialogDescription>

          <div>
            <label className="block text-sm mb-1">Choose a file format</label>
            <Select value={format} onValueChange={(v)=>setFormat(v as 'csv'|'xml')}>
              <SelectTrigger className="w-60"><SelectValue placeholder="CSV" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="px-6 py-4 border-t">
          <AlertDialogCancel className="btn-outline-primary">Cancel</AlertDialogCancel>
          <AlertDialogAction className="btn-primary" onClick={() => onConfirm(format)}>
            Export shipments
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
