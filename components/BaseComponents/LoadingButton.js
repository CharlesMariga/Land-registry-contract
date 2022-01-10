import React, { Component } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={this.props.loading}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          {!this.props.loading ? (
            <LockClosedIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          ) : (
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-5 h-5 border-4 border-white-400 border-solid rounded-full animate-spin"
            ></div>
          )}
        </span>
        {this.props.text}
      </button>
    );
  }
}
