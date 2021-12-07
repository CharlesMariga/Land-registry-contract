const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./build/LandRegistration.json");
const bcrypt = require("bcryptjs");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "wealth inject humble margin outside keen danger match smoke winner pistol fix",
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/852308af2e4a4433b6a09bcd57d46392",
});

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy the contract to account: ", accounts[0]);

    const passwordHash = await bcrypt.hash("pass1234", 12);
    console.log("PasswordHash: ", typeof passwordHash);

    const result = await new web3.eth.Contract(abi)
      .deploy({
        data: evm.bytecode.object,
        arguments: [passwordHash],
      })
      .send({ from: accounts[0], gas: "2000000" });

    console.log("Contract deployed to ", result.options.address);
  } catch (err) {
    console.log("ERROR💥💥: ", err);
  }
};

deploy();
