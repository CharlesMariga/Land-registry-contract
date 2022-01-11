import LandOwnerLayout from "../../components/layouts/LandOwnerLayout";
import PersonalInformation from "../../components/landOwner/personalInformation";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";
import LandRegistration from "../../ethereum/LandRegistration";
import web3 from "../../ethereum/web3";
import UpdateDetailsSideModal from "../../components/landOwner/UpdateDetailsSideModal";
import Button from "../../components/BaseComponents/Button";

export default function Details() {
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [details, setDetails] = useState({});
  const [updateDetailsSideModalOpen, setUpdateDetailsSideModalOpen] =
    useState(false);

  useEffect(() => {
    (async () => {
      setLoadingData(true);
      try {
        // Get the accounts
        const accounts = await web3.eth.getAccounts();

        // Get the land owner details
        const landOwnerDetails = await LandRegistration.methods
          .landOwnersDetails(accounts[0])
          .call({ from: accounts[0] });

        const landOwner = {
          firstName: landOwnerDetails.firstName,
          middleName: landOwnerDetails.middleName,
          lastName: landOwnerDetails.lastName,
          gender: landOwnerDetails.gender,
          email: landOwnerDetails.email,
          phoneNumber: landOwnerDetails.phoneNumber,
          poBox: landOwnerDetails.poBox,
          location: landOwnerDetails.location,
        };

        // Update the state
        setDetails(landOwner);

        setLoadingData(false);
      } catch (err) {
        setErrorMessage(err.message);
        setLoadingData(false);
      }
    })();
  }, []);

  async function updateDetails(
    firstName,
    middleName,
    lastName,
    gender,
    email,
    phoneNumber,
    poBox,
    location
  ) {
    setLoadingData(true);
    try {
      // Get the accounts
      const accounts = await web3.eth.getAccounts();

      // Update the details
      await LandRegistration.methods
        .updateLandOwner(
          firstName,
          lastName,
          middleName,
          gender,
          email,
          phoneNumber,
          poBox,
          location
        )
        .send({ from: accounts[0] });

      // Update state
      setDetails({
        firstName,
        lastName,
        middleName,
        gender,
        email,
        phoneNumber,
        poBox,
        location,
      });

      setUpdateDetailsSideModalOpen(false);
      setLoadingData(false);
    } catch (err) {
      setErrorMessage(err.message);
      setLoadingData(false);
    }
  }

  function openUpdateDetailsSideModal() {
    setUpdateDetailsSideModalOpen(true);
  }

  function closeUpdateDetailsSideModal() {
    setUpdateDetailsSideModalOpen(false);
  }

  function renderContent() {
    if (loadingData) {
      return <PageLoader />;
    } else if (errorMessage) {
      return <ErrorAlert errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <PersonalInformation details={details} />

          <UpdateDetailsSideModal
            title="Update Personal Details"
            status={updateDetailsSideModalOpen}
            onClose={closeUpdateDetailsSideModal}
            onUpdateDetailsFormSubmit={updateDetails}
            details={details}
          />

          <div className="flex justify-end mt-3">
            <Button
              type="button"
              text="Update Personal Details"
              onButtonclick={openUpdateDetailsSideModal.bind(this)}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <LandOwnerLayout headerText="Profile">{renderContent()}</LandOwnerLayout>
  );
}
