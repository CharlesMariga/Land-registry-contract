import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0xBb5b1942a151A3977F98614bfd6CB361004e8B2c"
);

export default instance;
