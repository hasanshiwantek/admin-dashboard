import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function AddModifierSheet() {
  return (
      <SheetContent side="right" className="h-[calc(100vh-5.5rem)] top-[5.5rem] !w-[calc(100vw-28.4rem)]  !max-w-none">
          <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <h2 className="text-2xl font-semibold mb-4">Add Modifier Option</h2>
             
          </SheetHeader>
      </SheetContent>
  );
}
