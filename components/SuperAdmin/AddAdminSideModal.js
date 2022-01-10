import React, { useState } from "react";

import SideModal from "../BaseComponents/SideModal";
import TextField from "../BaseComponents/TextField";
import SelectInput from "../BaseComponents/SelectInput";
import Button from "../BaseComponents/Button";
import counties from "../../data/counties";

export default function AddAdminSideModal({
  status,
  onClose,
  title,
  selectedCounties,
  addAdmin,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState(1);

  function submitAddAdminForm(e) {
    e.preventDefault();
    addAdmin(firstName, lastName, county, address);
  }

  return (
    <div>
      <SideModal title={title} status={status} onClose={onClose}>
        <form onSubmit={(e) => submitAddAdminForm(e)}>
          <div>
            <TextField
              label="First Name"
              placeholder="John"
              value={firstName}
              onInputChange={setFirstName}
            />
          </div>
          <div className="mt-3">
            <TextField
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onInputChange={setLastName}
            />
          </div>
          <div className="mt-3">
            <TextField
              label="Address"
              placeholder="0xF80f649Fd4612B74AD65a07982Bd48bE182C7e14"
              value={address}
              onInputChange={setAddress}
            />
          </div>
          <div className="mt-3">
            <SelectInput
              label="County"
              items={counties.filter(
                (el) => !selectedCounties.includes(el.name)
              )}
              value={county}
              onInputChange={setCounty}
            />
          </div>
          <div className="w-full flex justify-end mt-3">
            <Button type="submit" text="Submit" />
          </div>
        </form>
      </SideModal>
    </div>
  );
}
