"use client";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { useRouter } from "next/navigation";
import { Lane, Ticket } from "@prisma/client";

import {
  LaneDetail,
  PipelineDetailsWithLanesCardsTagsTickets,
} from "@/lib/types";
import { useModal } from "@/app/providers/modal-provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomModal from "@/components/global/custom-modal";
import LaneForm from "@/components/forms/lane-from";

type Props = {
  lanes: LaneDetail[];
  pipelineId: string;
  subaccountId: string;
  pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets;
  updateLanesOrder: (lanes: Lane[]) => Promise<void>;
  updateTicketsOrder: (tickets: Ticket[]) => Promise<void>;
};

export const PipelineView = ({
  lanes,
  pipelineDetails,
  pipelineId,
  subaccountId,
  updateLanesOrder,
  updateTicketsOrder,
}: Props) => {
  const { setOpen } = useModal();
  const router = useRouter();

  const [allLanes, setAllLanes] = useState<LaneDetail[]>([]);

  useEffect(() => {
    setAllLanes(lanes);
  }, [lanes]);

  const handleAddLane = () => {
    setOpen(
      <CustomModal
        title=" Create A Lane"
        subheading="Lanes allow you to group tickets"
      >
        <LaneForm pipelineId={pipelineId} />
      </CustomModal>
    );
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{pipelineDetails?.name}</h1>

          <Button className="flex items-center gap-4" onClick={handleAddLane}>
            <Plus size={15} />
            Create Lane
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
};