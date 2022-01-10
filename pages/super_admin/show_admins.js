import React from "react";

import AdminsTable from "../../components/SuperAdmin/AdminsTable";
import Auth from "../../components/Auth";
import SuperAdminLayout from "../../components/layouts/SuperAdminLayout";
import web3 from "../../ethereum/web3";
import LandRegistration from "../../ethereum/LandRegistration";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";
import AddAdminSideModal from "../../components/SuperAdmin/AddAdminSideModal";
import EditAdminSideModal from "../../components/SuperAdmin/EditAdminSideModal";
import Button from "../../components/BaseComponents/Button";
import counties from "../../data/counties";
class ShowAdmins extends React.Component {
  state = {
    loadingData: false,
    errorMessage: "",
    admins: [],
    addAdminSideModalOpen: false,
    editAdminSideModalOpen: false,
    adminToEdit: {},
    selectedCounties: [],
  };

  async componentDidMount() {
    // Show the loading page
    this.setState({ errorMessage: "", loadingData: true });

    try {
      // Get accounts
      const accounts = await web3.eth.getAccounts();

      // Get the addresses
      const addresses = await LandRegistration.methods
        .getAdminAddresses()
        .call({ from: accounts[0] });

      const requests = addresses.map((el) =>
        LandRegistration.methods.getAdmin(el).call({ from: accounts[0] })
      );

      const admins = await Promise.all(requests);

      const adminArr = admins.map((el) => {
        return {
          firstName: el.firstName,
          lastName: el.lastName,
          address: el.adminAddress,
          county: el.county,
          active: el.active,
          imageUrl: "https://www.natours.dev/img/users/default.jpg",
        };
      });

      adminArr.forEach((el) => {
        this.state.selectedCounties.push(el.county);
        this.setState({
          selectedCounties: this.state.selectedCounties,
        });
      });
      this.setState({ admins: adminArr, loadingData: false });
    } catch (err) {
      this.setState({ loadingData: false, errorMessage: err.message });
    }
  }

  updateAdminsArrayInState(status, index) {
    this.setState({
      loadingData: false,
      admins: this.state.admins.map((el, i) => {
        if (index === i) {
          el.active = status ? 0 : 1;
        }

        return el;
      }),
    });
  }

  async toggleAdminStatus(index) {
    this.setState({ loadingData: true });

    // Get the address of the admin and the current status
    const admin = this.state.admins[index];
    const adminAddress = admin.address;
    const status = admin.active;

    // Call the deactivateAdmin or activateAdmin methods on the contract
    // Get accounts
    const accounts = await web3.eth.getAccounts();

    try {
      if (status) {
        // Deactivate
        await LandRegistration.methods
          .deactivateAdmin(adminAddress)
          .send({ from: accounts[0] });

        // Update state
        this.updateAdminsArrayInState(status, index);
      } else {
        // Activate
        await LandRegistration.methods
          .activateAdmin(adminAddress)
          .send({ from: accounts[0] });

        // Update state
        this.updateAdminsArrayInState(status, index);
      }
    } catch (err) {
      this.setState({ loadingData: false, errorMessage: err.message });
    }
  }

  openAddAdminSideModal() {
    this.setState({ addAdminSideModalOpen: true });
  }

  closeAddAdminSideModal() {
    this.setState({ addAdminSideModalOpen: false });
  }

  openEditAdminSideModalOpen(admin) {
    const { firstName, lastName, address } = admin;
    const county = counties.find((el) => el.county === admin.county);
    this.setState({
      editAdminSideModalOpen: true,
      adminToEdit: { firstName, lastName, county, address },
    });
  }

  closeEditAdminSideModal() {
    this.setState({ editAdminSideModalOpen: false });
  }

  async updateAdmin(firstName, lastName, county, address) {
    this.setState({ loadingData: true });

    try {
      // Get accounts
      const accounts = await web3.eth.getAccounts();
      await LandRegistration.methods
        .editAdmin(firstName, lastName, counties[county - 1].name, address)
        .send({ from: accounts[0] });

      // Update the admins state array
      this.state.admins = this.state.admins.map((el) => {
        if (el.address === address) {
          el.firstName = firstName;
          el.lastName = lastName;
          el.county = counties[county - 1].name;
        }

        return el;
      });

      this.setState({ admins: this.state.admins });

      this.setState({ loadingData: false });
    } catch (err) {
      this.setState({ loadingData: false, errorMessage: err.message });
    }

    this.closeEditAdminSideModal();
  }

  async addAdmin(firstName, lastName, county, address) {
    this.setState({ loadingData: true });

    try {
      // Get accounts
      const accounts = await web3.eth.getAccounts();

      await LandRegistration.methods
        .addAdmin(firstName, lastName, counties[county - 1].name, address)
        .send({ from: accounts[0] });

      // Add the admin to the admins array
      const admin = {
        firstName: firstName,
        lastName: lastName,
        address,
        county: counties[county - 1].name,
        active: 1,
        imageUrl: "https://www.natours.dev/img/users/default.jpg",
      };

      this.state.admins.push(admin);
      this.setState({ admin: this.state.admins });

      // Add the county to the counties array
      this.state.selectedCounties.push(counties[county].name);
      this.setState({ selectedCounties: this.state.selectedCounties });
      this.setState({ loadingData: false });
    } catch (err) {
      this.setState({ loadingData: false, errorMessage: err.message });
    }

    this.closeAddAdminSideModal();
  }

  renderContent() {
    if (this.state.loadingData) {
      return <PageLoader />;
    } else if (this.state.errorMessage) {
      return <ErrorAlert errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <div>
          <AdminsTable
            admins={this.state.admins}
            toggleAdminStatus={this.toggleAdminStatus.bind(this)}
            onEditClick={this.openEditAdminSideModalOpen.bind(this)}
          />

          <AddAdminSideModal
            status={this.state.addAdminSideModalOpen}
            onClose={this.closeAddAdminSideModal.bind(this)}
            title="Add Admin"
            selectedCounties={this.state.selectedCounties}
            addAdmin={this.addAdmin.bind(this)}
          />

          <EditAdminSideModal
            status={this.state.editAdminSideModalOpen}
            onClose={this.closeEditAdminSideModal.bind(this)}
            title="Edit Admin"
            admin={this.state.adminToEdit}
            updateAdmin={this.updateAdmin.bind(this)}
            selectedCounties={this.state.selectedCounties}
          />

          <div className="flex justify-end mt-3">
            <Button
              type="button"
              text="Add New Admin"
              onButtonclick={this.openAddAdminSideModal.bind(this)}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <SuperAdminLayout headerText="Administrators">
        {this.renderContent()}
      </SuperAdminLayout>
    );
  }
}

export default Auth(ShowAdmins);
