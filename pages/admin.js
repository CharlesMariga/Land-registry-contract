import React, { Component } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

export default class Admin extends Component {
  render() {
    return (
      <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 shadow-xl mb-40 p-20 rounded-md ">
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
          <form className="mt-8 space-y-6" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
