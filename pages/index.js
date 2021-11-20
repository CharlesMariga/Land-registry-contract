import { LockClosedIcon } from "@heroicons/react/solid";
import Image from "next/image";

export default function Example() {
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
          <p className="mt-3 text-center">Sign in as:</p>
        </div>
        <button className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <LockClosedIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 mr-2"
            aria-hidden="true"
          />
          Administrator
        </button>
        <button className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <LockClosedIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 mr-2"
            aria-hidden="true"
          />
          User
        </button>
      </div>
    </div>
  );
}
