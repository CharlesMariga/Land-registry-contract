import Image from "next/dist/client/image";
import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import LoadingButton from "../components/BaseComponents/LoadingButton";
import LandRegistration from "../ethereum/LandRegistration";
import web3 from "../ethereum/web3";
import { Router } from "../routes";
import { signToken } from "../utils/token";

export default function Admin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginAdmin(e) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Get accounts
      const accounts = await web3.eth.getAccounts();

      if (!accounts.length)
        return this.setState({
          errorMessage: "Please login to your Metamask Account!",
          loading: false,
        });

      // Login the admin
      const login = await LandRegistration.methods
        .loginAdmin()
        .send({ from: accounts[0] });

      if (!login) {
        setLoading(false);
        setErrorMessage(
          "Unable to login! Please check your account and try again."
        );
      }

      setLoading(false);
      setSucessMessage("Logged in successfully!");

      // Genereate a jwt token and store it in localstorage
      const token = await signToken(accounts[0]);
      localStorage.setItem("token", token);

      // Route to the home page
      setTimeout(() => {
        Router.pushRoute("/admin/lands");
      }, 3000);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
    }
  }

  function renderAlert() {
    if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;
    else if (successMessage && !errorMessage)
      return <SuccessAlert successMessage={successMessage} />;
  }

  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 shadow-xl mb-40 p-20 rounded-md ">
        {renderAlert()}
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
          <p className="mt-3 text-center">Administrator login:</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginAdmin.bind(this)}>
          <LoadingButton loading={loading} text="Login" />
        </form>
      </div>
    </div>
  );
}
