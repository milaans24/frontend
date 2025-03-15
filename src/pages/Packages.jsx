import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { packagesData } from "../extras/packageData";
import PackageForm from "../components/Packages/PackageForm";

const Packages = () => {
  const [packageFormView, setPackageFormView] = useState(false);

  return (
    <div className="relative">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Book Publishing Packages - Milaan Publication</title>
        <meta
          name="description"
          content="Discover the best book publishing packages at Milaan Publication. Get professional editing, global distribution, book marketing, and more. Choose a plan that suits your needs."
        />
        <meta
          name="keywords"
          content="book publishing packages, self-publishing plans, Milaan Publication, book editing, book marketing, global book distribution, affordable publishing"
        />
        <link
          rel="canonical"
          href="https://www.milaanpublication.in/packages"
        />

        {/* Open Graph (for better sharing on social media) */}
        <meta
          property="og:title"
          content="Book Publishing Packages | Affordable Self-Publishing Plans"
        />
        <meta
          property="og:description"
          content="Explore our book publishing plans, including professional editing, book marketing, and worldwide distribution. Publish your book today!"
        />
        <meta
          property="og:url"
          content="https://www.milaanpublication.in/packages"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Book Publishing Packages | Affordable Self-Publishing Plans"
        />
        <meta
          name="twitter:description"
          content="Choose a book publishing plan that fits your needs. Get professional services, marketing, and worldwide book distribution."
        />

        {/* Schema Markup for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Book Publishing Packages",
            description:
              "Flexible book publishing plans with editing, marketing, and distribution.",
            brand: "Milaan Publication",
            offers: {
              "@type": "AggregateOffer",
              offerCount: packagesData.length,
              priceCurrency: "INR",
              lowPrice: packagesData[0].Price,
              highPrice: packagesData[packagesData.length - 1].Price,
            },
          })}
        </script>
      </Helmet>

      <div className="h-auto w-full px-4 md:px-6 lg:px-10 py-4 md:py-12 overflow-x-auto">
        <div className="flex items-center justify-center gap-4 flex-col my-4 md:my-0 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-sky-900">
            Book Publishing Packages
          </h1>
          <p className="text-sm md:text-base text-center">
            Choose from our flexible and customizable publishing plans to
            publish your book with ease.
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
                            typeof items[key] === "number" ? (
                              `₹${items[key].toLocaleString("en-IN")}`
                            ) : (
                              items[key]
                            )
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
