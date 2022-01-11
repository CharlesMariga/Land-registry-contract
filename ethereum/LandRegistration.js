import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0x9f5CD3C4a78763d3F2C95816c7fBe40901b377f2"
);

export default instance;
