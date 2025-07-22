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
  { id: "giftWrapping", label: "Gift wrapping" },
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
    //  <ScrollArea className="w-68 border-r p-4 sticky top-0 h-screen w-48">
    //   {sections.map((sec) => (
    //     <Button
    //       key={sec.id}
    //       variant="ghost"
    //       className="w-full justify-start my-1 text-[1.2rem]"
    //       onClick={() => scrollTo(sec.id)}
    //     >
    //       {sec.label}
    //     </Button>
    //   ))}
    // </ScrollArea>

    <ScrollArea className="w-70 h-175 border-r fixed sticky top-0">
    <div className="p-4 space-y-4 ">
    {sections.map((sec) => (
      <Button
        key={sec.id}
        variant="ghost"
        className="w-full justify-start text-2xl hover:text-blue-600 hover:bg-blue-100 transition-all cursor-pointer p-6 text-gray-600"
        onClick={() => scrollTo(sec.id)}
      >
        {sec.label}
      </Button>
    ))}
  </div>
</ScrollArea>

  );
}
