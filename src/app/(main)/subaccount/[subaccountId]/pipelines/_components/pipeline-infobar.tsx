"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Pipeline } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useModal } from "@/app/providers/modal-provider";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import CustomModal from "@/components/global/custom-modal";
import CreatePipelineForm from "@/components/forms/create-pipeline.form";

type Props = {
  subaccountId: string;
  pipelines: Pipeline[];
  pipelineId: string;
};

export const PipelineInfobar = ({
  pipelineId,
  pipelines,
  subaccountId,
}: Props) => {
  const { setClose, setOpen: setOpenModal } = useModal();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(pipelineId);

  const handleClickCreatePipeline = () => {
    setOpenModal(
      <CustomModal
        title="Create A Pipeline"
        subheading="Pipelines allows you to group tickets into lanes and track your business processes all in one place."
      >
        <CreatePipelineForm subAccountId={subaccountId} />
      </CustomModal>
    );
  };

  return (
    <div>
      <div className="flex items-end gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? pipelines.find((pipeline) => pipeline.id === value)?.name
                : "Select a pipeline..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandEmpty>No pipelines found.</CommandEmpty>
              <CommandGroup>
                {pipelines.map((pipeline) => (
                  <Link
                    key={pipeline.id}
                    href={`/subaccount/${subaccountId}/pipelines/${pipeline.id}`}
                  >
                    <CommandItem
                      key={pipeline.id}
                      value={pipeline.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === pipeline.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {pipeline.name}
                    </CommandItem>
                  </Link>
                ))}
                <Button
                  variant="secondary"
                  className="flex gap-2 w-full mt-4"
                  onClick={handleClickCreatePipeline}
                >
                  <Plus size={15} />
                  Create Pipeline
                </Button>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};