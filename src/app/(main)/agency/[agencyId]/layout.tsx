import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import BlurPage from "@/components/global/blur-page";
import { Infobar } from "@/components/global/infobar";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (!agencyId) return redirect("/agency");

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  ) {
    return <Unauthorized />;
  }

  let allNoti: any = [];

  const notification = await getNotificationAndUser(agencyId);
  if (notification) {
    allNoti = notification;
  }

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <Infobar notifications={allNoti} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default layout;
