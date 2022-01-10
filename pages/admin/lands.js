import Auth from "../../components/Auth";
import AdminLayout from "../../components/layouts/AdminLayout";
import LandsTable from "../../components/admin/LandsTable";
import Button from "../../components/BaseComponents/Button";
import { useState } from "react";
import RegisterLandSideModal from "../../components/admin/RegisterLandSideModal";

function Lands() {
  const [registerSideModalOpen, setRegisterSideModalOpen] = useState(false);

  function openRegisterLandSideModal() {
    setRegisterSideModalOpen(true);
  }

  return (
    <AdminLayout headerText="Lands List">
      <LandsTable lands={[]} />

      <RegisterLandSideModal
        title="Register Land"
        status={registerSideModalOpen}
        onClose={() => setRegisterSideModalOpen(false)}
      />

      <div className="flex justify-end mt-3">
        <Button
          type="button"
          text="Register Land"
          onButtonclick={openRegisterLandSideModal.bind(this)}
        />
      </div>
    </AdminLayout>
  );
}

export default Auth(Lands);
