// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { verifyToken } from "../utils/token";
import web3 from "../ethereum/web3";

const Auth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [verified, setVerified] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      async function verifyTokenFunc() {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          Router.replace("/");
        } else {
          // we call the api that verifies the token.
          const data = await verifyToken(accessToken);
          const accounts = await web3.eth.getAccounts();

          // if token was verified we set the state.
          if (data.address && accounts[0] === data.address) {
            setVerified(true);
          } else {
            // If the token was fraud we first remove it from localStorage and then redirect to "/"
            localStorage.removeItem("token");
            Router.replace("/");
          }
        }
      }

      verifyTokenFunc();
    });
    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default Auth;
