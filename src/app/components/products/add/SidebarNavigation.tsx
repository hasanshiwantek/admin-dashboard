import React from 'react'
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';

const sections = [
  { id: "basic-info", label: "Basic information" },
  { id: "description", label: "Description" },
  { id: "images", label: "Images & videos" },
  { id: "productIdentifiers", label: "Product Identifiers" },
  { id: "pricing", label: "Pricing" },
  { id: "inventory", label: "Inventory" },
  { id: "variations", label: "Variations" },
  { id: "customizations", label: "Customizations" },
  { id: "storefrontDetails", label: "Storefront details" },
  { id: "customFields", label: "Custom fields" },
  { id: "relatedProducts", label: "Related products" },
  { id: "dimensionWeight", label: "Dimension & weight" },
  { id: "shippingDetails", label: "Shipping details" },
  { id: "purchasability", label: "Purchasability" },
  // { id: "giftWrapping", label: "Gift wrapping" },
  { id: "customsInformation", label: "Customs information" },
  { id: "seo", label: "SEO" },
  { id: "openGraphSharing", label: "Open graph sharing" },
];

export default function SidebarNavigation() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="w-[20rem] shadow-xs h-[calc(80vh-5.5rem)]  sticky top-[4rem] border-r bg-[var(--store-bg)] ">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-3">
          {sections.map((sec) => (
            <Button
              key={sec.id}
              variant="ghost"
              className="w-full justify-start text-[1.3rem] hover:text-blue-600 hover:bg-blue-100 transition-all cursor-pointer  py-5 text-gray-600"
              onClick={() => scrollTo(sec.id)}
            >
              {sec.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
