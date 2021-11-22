import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metemask is running
  window.ethereum.enable();
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server or the user is not using metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/852308af2e4a4433b6a09bcd57d46392"
  );
  web3 = new Web3(provider);
}

export default web3;
