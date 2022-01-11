import LandOwnerLayout from "../../components/layouts/LandOwnerLayout";
import web3 from "../../ethereum/web3";
import { useState, useEffect } from "react";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";
import LandRegistration from "../../ethereum/LandRegistration";
import LandOwnedTable from "../../components/landOwner/LandOwnedTable";

export default function BuyRequests() {
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lands, setLands] = useState([]);

  useEffect(() => {
    setLoadingData(true);
    (async () => {
      try {
        // Get the accounts
        const accounts = await web3.eth.getAccounts();

        //Get land count
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

        console.log(lands);

        // Filter the land based on the ownerAddress
        const landsArr = lands
          .map((land) => {
            return {
              landId: land.landId,
              surveyNumber: land.surveyNumber,
              county: land.county,
              location: land.location,
              ownerAddress: land.ownerAddress,
              adminAddress: land.adminAddress,
              marketValue: land.marketValue,
            };
          })
          .filter((land) => land.ownerAddress === accounts[0]);

        console.log(landsArr);

        setLands(landsArr);
        setLoadingData(false);
      } catch (err) {
        setErrorMessage(err.message);
        setLoadingData(false);
      }
    })();
  }, []);

  function updateLandsState(landId) {
    setLoadingData(false);
    setLands(
      lands.map((land) => {
        if (land.landId === landId) {
          land.availability = !land.availability;
        }

        return land;
      })
    );
  }

  async function toggleLandAvailability(landId, availability) {
    setLoadingData(true);

    try {
      // Get the accounts
      const accounts = await web3.eth.getAccounts();

      if (availability) {
        // Make unavailable
        await LandRegistration.methods
          .makeLandUnavailable(landId)
          .send({ from: accounts[0] });
      } else {
        // Make available
        // Change land availability
        await LandRegistration.methods
          .makeLandAvailable(landId)
          .send({ from: accounts[0] });
      }
      // Update state
      updateLandsState(landId);
    } catch (err) {
      setErrorMessage(err.message);
      setLoadingData(false);
    }
  }

  function renderContent() {
    if (loadingData) {
      return <PageLoader />;
    } else if (errorMessage) {
      return <ErrorAlert errorMessage={errorMessage} />;
    } else {
      return (
        <LandOwnedTable
          lands={lands}
          toggleLandAvailability={toggleLandAvailability}
        />
      );
    }
  }

  return (
    <LandOwnerLayout headerText="My Land">{renderContent()}</LandOwnerLayout>
  );
}
