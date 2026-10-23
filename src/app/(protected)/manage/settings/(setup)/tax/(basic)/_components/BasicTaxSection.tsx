import { BasicTaxSectionProps } from "./type";

// A heading above the page's white card(s), as Basic Tax lays them out
const BasicTaxSection = ({ title, toolbar, children }: BasicTaxSectionProps) => (
  <section className="flex flex-col gap-5">
    <h2 className="text-[1.8rem]! font-semibold! text-text-heading!">{title}</h2>
    {toolbar}
    {children}
  </section>
);

export default BasicTaxSection;
