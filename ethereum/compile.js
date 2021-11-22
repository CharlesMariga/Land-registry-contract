const fs = require("fs-extra");
const solc = require("solc");
const path = require("path");

// Delete the entire build folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Read the CampaignFactory.sol file
const landRegistrationPath = path.resolve(
  __dirname,
  "contracts",
  "LandRegistration.sol"
);

const landRegistrationSource = fs.readFileSync(landRegistrationPath, "utf-8");

// Compile the contract
const input = {
  language: "Solidity",
  sources: {
    "LandRegistration.sol": {
      content: landRegistrationSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Write the outputs to the build directory
fs.ensureDirSync(buildPath);
// `output` here contains the JSON output as specified in the documentation
for (let contract in output.contracts) {
  let contractName = Object.keys(output.contracts[contract])[0];
  fs.outputJsonSync(
    path.resolve(buildPath, `${contractName}.json`),
    output.contracts[contract][contractName]
  );
}
