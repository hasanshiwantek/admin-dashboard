"use client";

import { useParams } from "next/navigation";
import BannerForm from "../../BannerForm";

const EditBannerPage = () => {
  const { id } = useParams<{ id: string }>();
  return <BannerForm bannerId={id} />;
};

export default EditBannerPage;
