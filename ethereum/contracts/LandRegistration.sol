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
    
    address public superAdminAddress;
    string superAdminPassword;
    mapping (address => Admin) admins;
    mapping (address => bool) addresses;
    string [] public counties;
    address [] public adminsAdresses;
    
    constructor(string memory password) {
        superAdminPassword = password;
        superAdminAddress = msg.sender;
    }

    function equal(string memory a, string memory b) private pure returns(bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
    
    modifier restrictToSuperAdmin {
        require(msg.sender == superAdminAddress);
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

    function loginAdmin() public view returns(bool){
        require(addresses[msg.sender]);
        return true;
    }
}

