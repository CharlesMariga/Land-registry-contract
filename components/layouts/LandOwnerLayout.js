import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Header from "../Header";

const userNavigation = [{ name: "Sign out", href: "#" }];

export default function LandOwnerLayout({ headerText, children }) {
  const [navigation, setNavigation] = useState([
    {
      name: "Personal Details",
      href: "/landOwner/details",
      current: false,
    },
    {
      name: "Owned land",
      href: "/landOwner/landOwned",
      current: false,
    },
    {
      name: "Selling Requests",
      href: "/landOwner/sellRequests",
      current: false,
    },
    {
      name: "Buying Requests",
      href: "/landOwner/buyRequests",
      current: false,
    },
    {
      name: "Explore Land",
      href: "/landOwner/explore",
      current: false,
    },
  ]);

  useEffect(() => {
    const navArr = navigation.map((el) => {
      if (el.href === location.pathname) {
        el.current = true;
        return el;
      }

      el.pathname = false;
      return el;
    });

    setNavigation(navArr);
  }, []);

  return (
    <div className="min-h-full">
      <Nav
        logoUrl="/super_admin/show_admins"
        userNavigation={userNavigation}
        showNotification={false}
        navigation={navigation?.length ? navigation : []}
      />
      <Header headerText={headerText} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
