import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0x65B9676bF6A0a190D4dD743d118c37238cd7403B"
);

export default instance;
