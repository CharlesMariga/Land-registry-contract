import LandOwnerLayout from "../../components/layouts/LandOwnerLayout";
import { useState, useEffect } from "react";
import web3 from "../../ethereum/web3";
import LandRegistration from "../../ethereum/LandRegistration";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";
import AvailableLandTable from "../../components/landOwner/AvailableLandTable";

export default function SellRequests() {
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
              availability: land.availability,
              requestedForSale: land.requestedForSale,
              requestedByAddress: land.requestedByAddress,
            };
          })
          .filter(
            (land) =>
              land.availability &&
              land.ownerAddress !== accounts[0] &&
              !land.requestedForSale
          );

        console.log(landsArr);

        setLands(landsArr);
        setLoadingData(false);
      } catch (err) {
        setErrorMessage(err.message);
        setLoadingData(false);
      }
    })();
  }, []);

  async function sendRequestToBuyLand(landId) {
    setLoadingData(true);
    setErrorMessage("");

    try {
      // Get the accounts
      const accounts = await web3.eth.getAccounts();

      // Make request
      await LandRegistration.methods
        .makeRequestToBuy(landId)
        .send({ from: accounts[0] });

      // Update the state
      setLands(
        lands.map((land) => {
          if (land.landId === landId) {
            land.requestedForSale = true;
            land.requestedByAddress = accounts[0];
          }
          return land;
        })
      );
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
        <AvailableLandTable
          lands={lands}
          requestToBuyLand={sendRequestToBuyLand}
        />
      );
    }
  }

  return (
    <LandOwnerLayout headerText="Available Land">
      {renderContent()}
    </LandOwnerLayout>
  );
}
