import Image from "next/dist/client/image";
import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import LoadingButton from "../components/BaseComponents/LoadingButton";

export default function Admin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function loginUser(e) {
    e.preventDefault();
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
          <p className="mt-3 text-center">User login:</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => loginUser(e)}>
          <LoadingButton loading={loading} text="Login" />
        </form>
      </div>
    </div>
  );
}
