import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { LaneDetail } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLanesWithTicketAndTags, getPipelineDetails } from "@/lib/queries";

import { PipelineInfobar } from "../_components/pipeline-infobar";

type Props = {
  params: { subaccountId: string; pipelinesId: string };
};

const PipelinePage = async ({ params }: Props) => {
  console.log(params, "Params");

  const pipelineDetails = await getPipelineDetails(params.pipelinesId);
  if (!pipelineDetails)
    return redirect(`/subaccount/${params.subaccountId}/pipelines`);

  const pipelines = await db.pipeline.findMany({
    where: { subAccountId: params.subaccountId },
  });

  const lanes = (await getLanesWithTicketAndTags(
    params.pipelinesId
  )) as LaneDetail[];

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
        <PipelineInfobar
          pipelineId={params.pipelinesId}
          subaccountId={params.subaccountId}
          pipelines={pipelines}
        />
        <div>
          <TabsTrigger value="view">Pipeline View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
  );
};

export default PipelinePage;
