import LandOwnerLayout from "../../components/layouts/LandOwnerLayout";
import { useState, useEffect } from "react";
import web3 from "../../ethereum/web3";
import LandRegistration from "../../ethereum/LandRegistration";
import SellRequetsTable from "../../components/landOwner/SellRequestsTable";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";

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
              requestedForSale: land.requestedForSale,
              requestedByAddress: land.requestedByAddress,
            };
          })
          .filter((land) => land.requestedForSale && land.requestedByAddress);

        console.log(landsArr);

        setLands(landsArr);
        setLoadingData(false);
      } catch (err) {
        setErrorMessage(err.message);
        setLoadingData(false);
      }
    })();
  }, []);

  async function acceptBuyingRequest(landId) {
    setLoadingData(true);

    try {
      // Get the accounts
      const accounts = await web3.eth.getAccounts();

      // Decline buying request
      await LandRegistration.methods
        .acceptBuyingRequest(landId)
        .send({ from: accounts[0] });

      // Update the state
      setLoadingData(false);
    } catch (err) {
      setErrorMessage(err.message);
      setLoadingData(false);
    }
  }

  async function declineBuyingRequest(landId) {
    setLoadingData(true);

    try {
      // Get the accounts
      const accounts = await web3.eth.getAccounts();

      // Decline buying request
      await LandRegistration.methods
        .declineBuyingRequest(landId)
        .send({ from: accounts[0] });

      // Update the state
      setLands(lands.filter((land) => land.landId != landId));
      setLoadingData(false);
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
        <SellRequetsTable
          lands={lands}
          acceptBuyingRequest={acceptBuyingRequest}
          declineBuyingRequest={declineBuyingRequest}
        />
      );
    }
  }

  return (
    <LandOwnerLayout headerText="Sell Requests">
      {renderContent()}
    </LandOwnerLayout>
  );
}
