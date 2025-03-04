import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { packagesData } from "../extras/packageData";
import PackageForm from "../components/Packages/PackageForm";

const Packages = () => {
  const [packageFormView, setPackageFormView] = useState(false);

  return (
    <div className="relative">
      <div className="h-auto w-full px-4 md:px-6 lg:px-10 py-4 md:py-12 overflow-x-auto">
        <div className="flex items-center justify-center gap-4 flex-col my-4 md:my-0 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-sky-900">
            Publishing Plans
          </h1>
          <p className="text-sm md:text-base text-center">
            These packages are designed as per your needs and are fully
            customizable.
          </p>
        </div>

        <div className="overflow-x-auto mt-8 md:mt-0">
          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-sky-900 text-white">
              <tr>
                <th className="p-4">Services</th>
                {packagesData.map((items, i) => (
                  <th key={i} className="p-4">
                    {items.Service}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(packagesData[0]).map(
                (key, index) =>
                  key !== "Service" && (
                    <tr key={index}>
                      <td className="p-4 bg-zinc-100 font-semibold">{key}</td>
                      {packagesData.map((items, i) => (
                        <td key={i} className="p-4">
                          {key === "Price" ? (
                            `₹${items[key].toLocaleString("en-IN")}`
                          ) : key === "Book Royalty" ? (
                            `${items[key]}%`
                          ) : typeof items[key] === "boolean" ? (
                            items[key] ? (
                              <FaCheck className="text-green-500 mx-auto" />
                            ) : (
                              <RxCross2 className="text-red-500 mx-auto" />
                            )
                          ) : (
                            items[key]
                          )}
                        </td>
                      ))}
                    </tr>
                  )
              )}
              <tr>
                <td className="p-4 bg-zinc-100 font-semibold"></td>
                {packagesData.map((_, i) => (
                  <td key={i} className="p-4">
                    <button
                      onClick={() => setPackageFormView(true)}
                      className="bg-sky-900 text-white px-4 py-2 rounded hover:bg-sky-800 transition"
                    >
                      Book Plan
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Package Form */}
      {packageFormView && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-85 backdrop-blur-md z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setPackageFormView(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <PackageForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
