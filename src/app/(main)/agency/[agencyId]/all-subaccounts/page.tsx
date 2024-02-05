import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SubAccount } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { getAuthUserDetails } from "@/lib/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { DeleteButton } from "./_components/delete-button";

type Props = {
  params: { agencyId: string };
};

const allSubaccountsPage = async ({ params }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return;

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <Button>Create</Button>
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Account..." />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Sub accounts">
              {!!user.Agency?.SubAccount.length ? (
                user.Agency?.SubAccount.map((subaccount: SubAccount) => (
                  <CommandItem
                    key={subaccount.id}
                    className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                  >
                    <Link
                      href={`/subaccount/${subaccount.id}`}
                      className="flex gap-4 w-full h-full"
                    >
                      <div className="relative">
                        <Image
                          src={subaccount.subAccountLogo}
                          alt="Subaccount logo"
                          fill
                          className="rounded-md object-contain bg-muted/50 p-4"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {subaccount.name}
                          <span className="text-muted-foreground text-xs">
                            {subaccount.address}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-red-600 w-20 hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          Are you absolutly shure ?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                          This action cannout be undon. This will delete the
                          subaccount and all data related to the subaccount
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel className="mb-2">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subaccountId={subaccount.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  No subaccounts
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default allSubaccountsPage;
