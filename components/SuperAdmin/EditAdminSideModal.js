import React, { useEffect, useState } from "react";

import TextField from "../BaseComponents/TextField";
import SideModal from "../BaseComponents/SideModal";
import SelectInput from "../BaseComponents/SelectInput";
import counties from "../../data/counties";
import Button from "../BaseComponents/Button";

export default function EditAdminSideModal({
  status,
  onClose,
  title,
  admin,
  updateAdmin,
  selectedCounties,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [county, setCounty] = useState(1);
  const [address, setAddress] = useState("");

  useEffect(() => {
    console.log("Admin: ", admin);
    setFirstName(admin.firstName);
    setLastName(admin.lastName);
    setCounty(admin.county);
    setAddress(admin.address);
  }, [admin]);

  function submitEditAdminForm(e) {
    e.preventDefault();
    updateAdmin(firstName, lastName, county, address);
  }

  return (
    <div>
      <SideModal title={title} status={status} onClose={onClose}>
        <form onSubmit={(e) => submitEditAdminForm(e)}>
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
