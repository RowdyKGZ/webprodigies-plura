"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Agency,
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";

import { useModal } from "@/app/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";

import { Button } from "../ui/button";
import Compass from "../icons/compass";
import { AspectRatio } from "../ui/aspect-ratio";
import { ChevronsUpDown, Menu, PlusCircleIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import SubAccountDetails from "../forms/subaccount-details";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constants";

type Props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOptions: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

export const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOptions,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setOpen } = useModal();

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:hidden flex"
      >
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side="left"
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full my-4 flex items-center justify-between py-8"
                variant="ghost"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">{details.name}</div>
                  <span className="text-muted-foreground">
                    {details.address}
                  </span>
                </div>

                <div>
                  <ChevronsUpDown size={16} />
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              {
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Account..." />

                  <CommandList className="pb-16">
                    <CommandEmpty>No result found</CommandEmpty>
                    {user.role === "AGENCY_OWNER" ||
                      user?.role === "AGENY_ADMIN"}
                    {user?.Agency && (
                      <CommandGroup heading="Agency">
                        <CommandItem className="!bg-transparent my-2 text-primary border-[1px]  border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                          {defaultOpen ? (
                            <Link
                              href={`/agency/${user?.Agency?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>

                              <div className="flex flex-col flex-1">
                                {user?.Agency?.name}
                                <span className="text-muted-foreground">
                                  {user?.Agency?.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>

                                <div className="flex flex-col flex-1">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      </CommandGroup>
                    )}

                    <CommandGroup heading="Accounts">
                      {!!subAccounts
                        ? subAccounts.map((subaccount) => (
                            <CommandItem key={subaccount.id}>
                              {defaultOpen ? (
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="Accounts logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>

                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              ) : (
                                <SheetClose asChild>
                                  <Link
                                    href={`/subaccount/${subaccount.id}`}
                                    className="flex gap-4 w-full h-full"
                                  >
                                    <div className="relative w-16">
                                      <Image
                                        src={subaccount.subAccountLogo}
                                        alt="Accounts logo"
                                        fill
                                        className="rounded-md object-contain"
                                      />
                                    </div>

                                    <div className="flex flex-col flex-1">
                                      {subaccount.name}
                                      <span className="text-muted-foreground">
                                        {subaccount.address}
                                      </span>
                                    </div>
                                  </Link>
                                </SheetClose>
                              )}
                            </CommandItem>
                          ))
                        : "No accounts"}
                    </CommandGroup>
                  </CommandList>

                  {(user?.role === "AGENCY_OWNER" ||
                    user?.role === "AGENCY_ADMIN") && (
                    <Button
                      className="w-full flex gap-2"
                      onClick={() => {
                        setOpen(
                          <CustomModal
                            title="Create a Subaccount"
                            subheading="You can swtich between your agency and the subaccount from the sidebar"
                          >
                            <SubAccountDetails
                              agencyDetails={user?.Agency as Agency}
                              userId={user?.id as string}
                              userName={user?.name}
                            />
                          </CustomModal>
                        );
                      }}
                    >
                      <PlusCircleIcon size={15} />
                      Create a subaccount
                    </Button>
                  )}
                </Command>
              }
            </PopoverContent>
          </Popover>

          <p className="text-muted-foreground text-xs mb-2">
            Menu Links <Separator className="mb-4" />
            <nav className="relative">
              <Command className="rounded-lg overflow-visible bg-transparent">
                <CommandInput placeholder="Search..." />
                <CommandList className="py-4 overflow-visible">
                  <CommandEmpty>No result found</CommandEmpty>
                  <CommandGroup className="overflow-visible">
                    {sidebarOptions.map((sidebarOption) => {
                      let value;
                      const result = icons.find(
                        (icon) => icon.value === sidebarOption.icon
                      );

                      if (result) {
                        value = <result.path />;
                      }
                      return (
                        <CommandItem
                          key={sidebarOption.id}
                          className="md:w-[260px] w-full"
                        >
                          <Link
                            href={sidebarOption.link}
                            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[260px]"
                          >
                            {value}
                            <span>{sidebarOption.name}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </nav>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
