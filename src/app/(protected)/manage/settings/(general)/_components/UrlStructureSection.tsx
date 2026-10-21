import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { urlStructureSections } from "../constant";
import UrlStructureCard from "./UrlStructureCard";

const UrlStructureSection = () => (
  <ListRenderer
    data={urlStructureSections}
    keyExtractor={(section) => section.formatField}
    className="space-y-8!"
    renderItem={(section) => <UrlStructureCard section={section} />}
  />
);

export default UrlStructureSection;
