import Auth from "../../components/Auth";
import AdminLayout from "../../components/layouts/AdminLayout";
import LandsTable from "../../components/admin/LandsTable";
import Button from "../../components/BaseComponents/Button";
import { useEffect, useState } from "react";
import RegisterLandSideModal from "../../components/admin/RegisterLandSideModal";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";
import LandRegistration from "../../ethereum/LandRegistration";
import { v4 as uuidv4 } from "uuid";
import web3 from "../../ethereum/web3";

function Lands() {
  const [registerSideModalOpen, setRegisterSideModalOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lands, setLands] = useState([]);

  useEffect(() => {
    (async () => {
      // Get the accounts
      const accounts = await web3.eth.getAccounts();

      //Get land counts
      const landsCount = await LandRegistration.methods
        .landsCount()
        .call({ from: accounts[0] });

      // Get the lands
      const landIdsRequests = [];
      for (let i = 0; i < landsCount; i++) {
        landIdsRequests.push(
          LandRegistration.methods.landIdsArr(i).call({ from: accounts[0] })
        );
      }
      const landIdsArr = await Promise.all(landIdsRequests);
      const landsRequests = landIdsArr.map((el) =>
        LandRegistration.methods.lands(el).call({ from: accounts[0] })
      );

      const lands = await Promise.all(landsRequests);

      // Filter the land based on the adminAddress
      const landsArr = lands
        .map((land) => {
          return {
            landId: land.landId,
            surveyNumber: land.surveyNumber,
            county: land.county,
            location: land.location,
            ownerAddress: land.ownerAddress,
            adminAddress: land.adminAddress,
          };
        })
        .filter((land) => land.adminAddress === accounts[0]);

      console.log("Lands Arr: ", landsArr);

      setLands(landsArr);
    })();
  }, []);

  function openRegisterLandSideModal() {
    setRegisterSideModalOpen(true);
  }

  async function registerLand(
    location,
    surveyNumber,
    ownerAddress,
    marketValue
  ) {
    setLoadingData(true);
    console.log(location);
    console.log(surveyNumber);
    console.log(ownerAddress);
    console.log(marketValue);
    try {
      // Get accounts
      const accounts = await web3.eth.getAccounts();

      console.log("Accounts: ", accounts);

      const landId = uuidv4();

      // Register the land
      await LandRegistration.methods
        .registerLand(
          location,
          surveyNumber,
          ownerAddress,
          marketValue,
          accounts[0],
          landId
        )
        .send({ from: accounts[0] });

      // Get the admin details (County)
      const admin = await LandRegistration.methods
        .admins(accounts[0])
        .call({ from: accounts[0] });

      // Add the land to the lands arr
      lands.push({
        landId: landId,
        surveyNumber: surveyNumber,
        county: admin.county,
        location: location,
        ownerAddress: ownerAddress,
        adminAddress: accounts[0],
      });
      setLands(lands);

      setLoadingData(false);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setLoadingData(false);
    }

    setRegisterSideModalOpen(false);
  }

  function renderContent() {
    if (loadingData) {
      return <PageLoader />;
    } else if (errorMessage) {
      return <ErrorAlert errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <LandsTable lands={lands} />

          <RegisterLandSideModal
            title="Register Land"
            status={registerSideModalOpen}
            onClose={() => setRegisterSideModalOpen(false)}
            onRegisterLandFormSubmit={registerLand}
          />

          <div className="flex justify-end mt-3">
            <Button
              type="button"
              text="Register Land"
              onButtonclick={openRegisterLandSideModal.bind(this)}
            />
          </div>
        </div>
      );
    }
  }

  return <AdminLayout headerText="Lands List">{renderContent()}</AdminLayout>;
}

export default Auth(Lands);
