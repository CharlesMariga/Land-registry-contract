// SPDX-License-Identifier: GPL-3.0
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
}
