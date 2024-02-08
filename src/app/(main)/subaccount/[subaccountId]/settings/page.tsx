import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import BlurPage from "@/components/global/blur-page";
import SubAccountDetails from "@/components/forms/subaccount-details";
import { UserDetails } from "@/components/forms/user-details";

type Props = {
  params: { subaccountId: string };
};

const SubaccountSettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const userDetails = await db.user.findUnique({
    where: { email: authUser.emailAddresses[0].emailAddress },
  });
  if (!userDetails) return null;

  const subaccount = await db.subAccount.findUnique({
    where: { id: params.subaccountId },
  });
  if (!subaccount) return;

  const agencyDetails = await db.agency.findUnique({
    where: { id: subaccount.agencyId },
    include: { SubAccount: true },
  });
  if (!agencyDetails) return;

  const subAccounts = agencyDetails.SubAccount;

  return (
    <BlurPage>
      <div className="flex lg:!flex-row flex-col gap-4">
        <SubAccountDetails
          agencyDetails={agencyDetails}
          details={subaccount}
          userId={userDetails.id}
          userName={userDetails.name}
        />

        <UserDetails
          type="subaccount"
          id={params.subaccountId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </BlurPage>
  );
};

export default SubaccountSettingsPage;
