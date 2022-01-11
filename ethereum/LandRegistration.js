import LandRegistration from "./build/LandRegistration.json";
import web3 from "./web3";

const instance = new web3.eth.Contract(
  LandRegistration.abi,
  "0x30A267873f94BF571153730820428c62B76a31EE"
);

export default instance;
