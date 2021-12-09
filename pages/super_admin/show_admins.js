import React from "react";

import Table from "../../components/Table";
import Auth from "../../components/Auth";
import SuperAdminLayout from "../../components/layouts/SuperAdminLayout";
import web3 from "../../ethereum/web3";
import LandRegistration from "../../ethereum/LandRegistration";
import PageLoader from "../../components/PageLoader";
import ErrorAlert from "../../components/ErrorAlert";
class ShowAdmins extends React.Component {
  state = {
    loadingData: false,
    errorMessage: "",
    admins: [],
  };

  async componentDidMount() {
    // Show the loadin page
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

      this.setState({ admins: adminArr, loadingData: false });
    } catch (err) {
      this.setState({ loadingData: false, errorMessage: err.message });
    }
  }

  renderContent() {
    if (this.state.loadingData) {
      return <PageLoader />;
    } else if (this.state.errorMessage) {
      return <ErrorAlert errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <div>
          <Table admins={this.state.admins} />
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
