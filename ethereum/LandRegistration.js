import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0x1726fb06e1d55c5Ce3CdEA598F71223D376Bd48A"
);

export default instance;
