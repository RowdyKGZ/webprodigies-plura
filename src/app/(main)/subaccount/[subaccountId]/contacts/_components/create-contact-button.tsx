"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/app/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import ContactUserForm from "@/components/forms/contact-user-form";

type Props = {
  subaccountId: string;
};

export const CreateContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal();

  const handleCreateContact = async () => {
    setOpen(
      <CustomModal
        title="Create Or Update Contact information"
        subheading="Contacts are like customers."
      >
        <ContactUserForm subaccountId={subaccountId}></ContactUserForm>
      </CustomModal>
    );
  };

  return <Button onClick={handleCreateContact}>Create contact</Button>;
};
