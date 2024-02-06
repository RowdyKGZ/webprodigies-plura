import React from "react";

import { getMedia } from "@/lib/queries";
import BlurPage from "@/components/global/blur-page";
import MediaComponent from "@/components/media";

type Props = {
  params: { subaccountId: string };
};

const MediaPage = async ({ params }: Props) => {
  const data = await getMedia(params.subaccountId);

  return (
    <BlurPage>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </BlurPage>
  );
};

export default MediaPage;
