import { ProductSectionGroupHeadingProps } from "./type";

// Centered title over a group of section cards, e.g. "Product Information"
const ProductSectionGroupHeading = ({
  title,
  description,
}: ProductSectionGroupHeadingProps) => (
  <div className="flex flex-col items-center gap-2 pt-4 text-center">
    <h2 className="text-[2.4rem]! font-normal text-text-heading!">{title}</h2>
    <p className="text-[1.4rem]! text-gray-600!">{description}</p>
  </div>
);

export default ProductSectionGroupHeading;
