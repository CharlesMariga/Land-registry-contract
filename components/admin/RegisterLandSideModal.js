import { useState } from "react";
import SideModal from "../BaseComponents/SideModal";
import TextField from "../BaseComponents/TextField";
import Button from "../BaseComponents/Button";

export default function RegisterLandSideModal({
  title,
  status,
  onClose,
  onRegisterLandFormSubmit,
}) {
  const [location, setLocation] = useState("");
  const [surveryNumber, setSurveryNumber] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [marketValue, setMarketValue] = useState("");

  function onSubmitForm(e) {
    e.preventDefault();
    onRegisterLandFormSubmit(
      location,
      surveryNumber,
      ownerAddress,
      marketValue
    );
  }

  return (
    <SideModal title={title} status={status} onClose={onClose}>
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div>
          <TextField
            label="Location"
            placeholder="Nairobi"
            value={location}
            onInputChange={setLocation}
          />
        </div>
        <div className="mt-3">
          <TextField
            label="Survery Number"
            placeholder="abc123"
            value={surveryNumber}
            onInputChange={setSurveryNumber}
          />
        </div>
        <div className="mt-3">
          <TextField
            label="Owner Address"
            placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
            value={ownerAddress}
            onInputChange={setOwnerAddress}
          />
        </div>
        <div className="mt-3">
          <TextField
            label="Market Value (ksh)"
            placeholder="120,000"
            value={marketValue}
            onInputChange={setMarketValue}
          />
        </div>
        <div className="w-full flex justify-end mt-3">
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </SideModal>
  );
}
