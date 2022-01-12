// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract LandRegistration {
    struct Admin {
        string firstName;
        string lastName;
        address adminAddress;
        string county;
        bool active;
    }

    struct Land {
        string county;
        string location;
        string surveyNumber;
        address ownerAddress;
        string marketValue;
        bool availability;
        bool requestedForSale;
        address requestedByAddress;
        string landId;
        address adminAddress;
    }

    struct LandOwner {
        string firstName;
        string lastName;
        string middleName;
        string gender;
        string email;
        string phoneNumber;
        string poBox;
        string location;
        address landOwnerAddress;
    }
    
    address public superAdminAddress;
    string superAdminPassword;
    mapping (address => Admin) public admins;
    mapping (address => bool) addresses;
    string [] public counties;
    address [] public adminsAdresses;
    string [] public landIdsArr;
    mapping (string => bool) public landIdsMapping;
    mapping (string => Land) public lands;
    uint256 public landsCount;
    mapping (address => bool) public landOwners;
    mapping (address => LandOwner) public landOwnersDetails;
    
    constructor(string memory password) {
        superAdminPassword = password;
        superAdminAddress = msg.sender;
        landsCount = 0;
    }

    function equal(string memory a, string memory b) private pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
    
    modifier restrictToSuperAdmin {
        require(msg.sender == superAdminAddress);
        _;
    }

    modifier restrictToAdmin {
        require(addresses[msg.sender]);
        _;
    }

    function getSuperAdminPassword() public view restrictToSuperAdmin returns(string memory) {
        return superAdminPassword;
    }
    
    function addAdmin(string memory firstName, string memory lastName, string memory county, address adminAddress) public restrictToSuperAdmin {
        if (equal(admins[adminAddress].county, "")) {
            counties.push(county);
        }
        Admin storage newAdmin = admins[adminAddress];
        newAdmin.firstName = firstName;
        newAdmin.lastName = lastName;
        newAdmin.adminAddress = adminAddress;
        newAdmin.county = county;
        newAdmin.active = true;

        adminsAdresses.push(address(adminAddress));
        addresses[adminAddress] = true;
    }

    function getAdmin(address adminAddress) public view restrictToSuperAdmin returns(Admin memory) {
        return admins[adminAddress];
    }
    
    function deactivateAdmin(address adminAddress) public restrictToSuperAdmin {
        admins[adminAddress].active = false;
    }
    
    function activateAdmin(address adminAddress) public restrictToSuperAdmin {
        admins[adminAddress].active = true;
    }

    function getAdminAddresses() public view restrictToSuperAdmin returns(address [] memory) {
        return adminsAdresses;
    }

    function editAdmin(string memory _firstName, string memory _lastName, string memory _county, address _adminAddress) public restrictToSuperAdmin {
        Admin storage adminToEdit = admins[_adminAddress];
        adminToEdit.firstName = _firstName;
        adminToEdit.lastName = _lastName;
        adminToEdit.county = _county;
    }

    function loginAdmin() public view restrictToAdmin returns(bool){
        return true;
    }

    function getLandIds() public view restrictToAdmin returns(string [] memory) {
        return landIdsArr;
    }

    function registerLand(string memory _location, string memory _surveryNumber, address _ownerAddress, string memory _marketValue, address _adminAddress, string memory _landId) public restrictToAdmin {
        require(!landIdsMapping[_landId]);

        // Add the landId to the landIdsMapping
        landIdsMapping[_landId] = true;

        // Add the landId to the landIdsArr
        landIdsArr.push(_landId);

        // Create a new land struct
        Land storage newLand = lands[_landId];
        newLand.county = admins[_adminAddress].county;
        newLand.location = _location;
        newLand.surveyNumber = _surveryNumber;
        newLand.ownerAddress = _ownerAddress;
        newLand.marketValue = _marketValue;
        newLand.availability = false;
        newLand.requestedForSale = false;
        newLand.requestedByAddress = address(0);
        newLand.landId = _landId;
        newLand.adminAddress = _adminAddress;

        landsCount = landsCount + 1;
    }

    function registerLandOwner() public returns(bool){
        if (landOwners[msg.sender]) return true;
        landOwners[msg.sender] = true;

        LandOwner storage newLandOwner = landOwnersDetails[msg.sender];
        newLandOwner.firstName = "";
        newLandOwner.lastName = "";
        newLandOwner.middleName = "";
        newLandOwner.gender = "";
        newLandOwner.email = "";
        newLandOwner.phoneNumber = "";
        newLandOwner.poBox = "";
        newLandOwner.location = "";
        newLandOwner.landOwnerAddress = msg.sender;

        return true;
    }

    function updateLandOwner(string memory _firstName, string memory _lastName, string memory _middleName, string memory _gender, string memory _email, string memory _phoneNumber, string memory _poBox, string memory _location) public {
        LandOwner storage landOwnerToEdit = landOwnersDetails[msg.sender];
        landOwnerToEdit.firstName = _firstName;
        landOwnerToEdit.lastName = _lastName;
        landOwnerToEdit.middleName = _middleName;
        landOwnerToEdit.gender = _gender;
        landOwnerToEdit.email = _email;
        landOwnerToEdit.phoneNumber = _phoneNumber;
        landOwnerToEdit.poBox = _poBox;
        landOwnerToEdit.location = _location;
    }

    // Make Land Available
    function makeLandAvailable(string memory _landId) public {
        Land storage landToEdit = lands[_landId];
        landToEdit.availability = true;
    }

    // Make Land Unavailable
    function makeLandUnavailable(string memory _landId) public {
        Land storage landToEdit = lands[_landId];
        landToEdit.availability = false;
    }

    // Make request to buy
    function makeRequestToBuy(string memory _landId) public {
        Land storage landToEdit = lands[_landId];
        landToEdit.requestedForSale = true;
        landToEdit.requestedByAddress = msg.sender;
    }
}


// "charles", "mariga", "nairobi", "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
// "ruaka", "1234", "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c", "12000", "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "abc123"
// "charles", "njenga", "mariga", "male", "charles@gamil.com", "+254722334556", "8899-00100", "Westlands"