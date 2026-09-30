import { BANNER_PLACEMENT_LABELS } from "./constant";
import { BannerLocationSource } from "./types";
import { getBannerLocationLink } from "./utils";

type BannerLocationCellProps = {
  banner: BannerLocationSource;
  baseUrl?: string;
};

const BannerLocationCell = ({ banner, baseUrl }: BannerLocationCellProps) => {
  const { label, href } = getBannerLocationLink(banner, baseUrl);
  const placement =
    banner.placement && BANNER_PLACEMENT_LABELS[banner.placement];

  if (!label) return <span>-</span>;

  return (
    <div className="flex items-center gap-1">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )}
      {placement && <span>({placement})</span>}
    </div>
  );
};

export default BannerLocationCell;
