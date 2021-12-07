// SPDX-License-Identifier: GPL-3.0
pragma solidity > 0.7.0 < 0.9.0;

contract LandRegistration {
    struct Admin {
        string firstName;
        string lastName;
        address adminAddress;
        bool isValue;
        bool active;
    }
    
    address public superAdminAddress;
    string superAdminPassword;
    mapping (string => Admin) public admins;
    string [] public counties;
    
    constructor(string memory password) {
        superAdminPassword = password;
        superAdminAddress = msg.sender;
    }
    
    modifier restrictToSuperAdmin {
        require(msg.sender == superAdminAddress);
        _;
    }

    function getSuperAdminPassword() public view restrictToSuperAdmin returns(string memory) {
        return superAdminPassword;
    }
    
    function addAdmin(string memory firstName, string memory lastName, string memory county, address adminAddress) public restrictToSuperAdmin {
        if (!admins[county].isValue) {
            counties.push(county);
        }
        Admin storage newAdmin = admins[county];
        newAdmin.firstName = firstName;
        newAdmin.lastName = lastName;
        newAdmin.adminAddress = adminAddress;
        newAdmin.isValue = true;
        newAdmin.active = true;
    }
    
    function deactivateAdmin(string memory county) public restrictToSuperAdmin {
        admins[county].active = false;
    }
    
    function activateAdmin(string memory county) public restrictToSuperAdmin {
        admins[county].active = true;
    }
}