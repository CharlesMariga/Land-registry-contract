import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0x8B3e7beD2EDD73D67C7501f390A708B1B637989d"
);

export default instance;
