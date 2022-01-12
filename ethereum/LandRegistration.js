import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0xcE54D08741B0FA7a93d474d514A45Eaa94B9c2e2"
);

export default instance;
