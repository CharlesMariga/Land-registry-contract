import SideModal from "../BaseComponents/SideModal";
import TextField from "../../components/BaseComponents/TextField";
import { useEffect, useState } from "react";
import SelectInput from "../../components/BaseComponents/SelectInput";
import Button from "../../components/BaseComponents/Button";

const genders = [
  { id: "Male", name: "Male" },
  { id: "Female", name: "Female" },
  { id: "Others", name: "Others" },
];

export default function UpdateDetailsSideModal({
  title,
  status,
  onClose,
  onUpdateDetailsFormSubmit,
  details,
}) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(genders[0].id);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [poBox, setPoBox] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setFirstName(details.firstName);
    setMiddleName(details.middleName);
    setLastName(details.lastName);
    setGender(details.gender);
    setEmail(details.email);
    setPhoneNumber(details.phoneNumber);
    setPoBox(details.poBox);
    setLocation(details.location);
  }, [details]);

  function onSubmitForm(e) {
    e.preventDefault();
    onUpdateDetailsFormSubmit(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      phoneNumber,
      poBox,
      location
    );
  }

  return (
    <SideModal title={title} status={status} onClose={onClose}>
      <form onSubmit={(e) => onSubmitForm(e)}>
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
            label="Middle Name"
            placeholder="Mariga"
            value={middleName}
            onInputChange={setMiddleName}
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
            label="Gender"
            items={genders}
            value={gender}
            onInputChange={setGender}
          />
        </div>
        <div className="mt-3">
          <TextField
            type="email"
            label="Email"
            placeholder="name@email.com"
            value={email}
            onInputChange={setEmail}
          />
        </div>
        <div className="mt-3">
          <TextField
            label="Phone Number"
            placeholder="+254703447887"
            value={phoneNumber}
            onInputChange={setPhoneNumber}
          />
        </div>
        <div className="mt-3">
          <TextField
            label="P.O. Box"
            placeholder="7788-00100"
            value={poBox}
            onInputChange={setPoBox}
          />
        </div>
        <div className="mt-3">
          <TextField
            label="Location"
            placeholder="Ruaka"
            value={location}
            onInputChange={setLocation}
          />
        </div>
        <div className="w-full flex justify-end mt-3">
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </SideModal>
  );
}
