import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { state: string; code: string };
};

const SubaccountPage = async ({ searchParams }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  if (!agencyId) return <Unauthorized />;

  const user = await getAuthUserDetails();
  if (!user) return;

  const getFirstSubaccountWitchAccess = user.Permissions.find(
    (permission) => permission.access === true
  );

  if (searchParams.state) {
    const statePath = searchParams.state.split("___")[0];
    const stateSubaccountId = searchParams.state.split("___")[1];
    if (!stateSubaccountId) return <Unauthorized />;

    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`
    );
  }

  if (getFirstSubaccountWitchAccess) {
    return redirect(
      `/subaccount/${getFirstSubaccountWitchAccess.subAccountId}`
    );
  }

  return <Unauthorized />;
};

export default SubaccountPage;
