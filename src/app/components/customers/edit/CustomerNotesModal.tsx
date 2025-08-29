'use client'

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks"
import { updateCustomer} from "@/redux/slices/customerSlice" // adjust if needed
import { Label } from "@/components/ui/label"

interface CustomerNotesModalProps {
  open: boolean
  onClose: () => void
  customerId: number | string | null
}

export default function CustomerNotesModal({ open, onClose, customerId }: CustomerNotesModalProps) {
  const dispatch = useAppDispatch()

  const [notes, setNotes] = useState("")

  const handleSave = async () => {
    await dispatch(updateCustomer({ id: customerId, data: { notes } }))
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Staff notes</DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground mb-2">
          Use the text box below to make notes on this customer.
        </p>

        <Label className="sr-only" htmlFor="staff-notes">Staff Notes</Label>
        <Textarea
          id="staff-notes"
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type internal staff notes here..."
          className="h-[80px]"
        />

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose} className="!text-lg !p-6">Cancel</Button>
          <Button onClick={handleSave} className="!text-lg !p-6">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
