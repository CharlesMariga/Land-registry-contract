import React from "react";
import Nav from "../../components/Nav";
import Header from "../Header";

const userNavigation = [{ name: "Sign out", href: "#" }];

export default class AdminLayout extends React.Component {
  render() {
    return (
      <div className="min-h-full">
        <Nav
          logoUrl="/super_admin/show_admins"
          userNavigation={userNavigation}
          showNotification={false}
        />
        <Header headerText={this.props.headerText} />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">{this.props.children}</div>
          </div>
        </main>
      </div>
    );
  }
}
