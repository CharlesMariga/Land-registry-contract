import React, { Component } from "react";
import bcrypt from "bcryptjs";

import Image from "next/image";
import web3 from "../ethereum/web3";
import LandRegistration from "../ethereum/LandRegistration";
import { Router } from "../routes";
import { signToken } from "../utils/token";

import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import LoadingButton from "../components/BaseComponents/LoadingButton";

export default class Admin extends Component {
  state = {
    password: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  };

  async loginSuperAdmin(e) {
    e.preventDefault();
    this.setState({ errorMessage: "", loading: true });

    try {
      // Get the super admin's password from contract
      const accounts = await web3.eth.getAccounts();

      if (!accounts.length)
        return this.setState({
          errorMessage: "Please login to your Metamask Account!",
          loading: false,
        });

      // Compare the passwords
      const superAdminPassword = await LandRegistration.methods
        .getSuperAdminPassword()
        .call({ from: accounts[0] });

      const passwordIsCorrect = await bcrypt.compare(
        this.state.password,
        superAdminPassword
      );

      // If the passwords dont match, display an error message.
      if (!passwordIsCorrect)
        return this.setState({
          errorMessage: "Incorrect password!",
          loading: false,
        });

      // If the passwords match, route ot the
      this.setState({ loading: false });
      this.setState({ successMessage: "Logged in successully!" });

      // Genereate a jwt token and store it in localstorage
      const token = await signToken(accounts[0]);
      localStorage.setItem("token", token);

      setTimeout(() => {
        Router.pushRoute("/super_admin/show_admins");
      }, 3000);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  renderAlert() {
    if (this.state.errorMessage)
      return <ErrorAlert errorMessage={this.state.errorMessage} />;
    else if (this.state.successMessage && !this.state.errorMessage)
      return <SuccessAlert successMessage={this.state.successMessage} />;
  }

  render() {
    return (
      <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 shadow-xl mb-40 p-20 rounded-md ">
          {this.renderAlert()}
          <div>
            <div className="mx-auto h-12 w-auto text-center">
              <Image
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
                width={48}
                height={48}
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Land registration system
            </h2>
            <p className="mt-3 text-center">Super Administrator login:</p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={this.loginSuperAdmin.bind(this)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <LoadingButton loading={this.state.loading} text="Login" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
