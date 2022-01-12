import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0xfA92bf1272921376b0db3488Fc76dfA6c8732213"
);

export default instance;
