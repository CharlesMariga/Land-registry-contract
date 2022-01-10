import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0x28898127545124423ddE7aa629a3daAFDB997C84"
);

export default instance;
