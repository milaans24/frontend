import React from "react";

const policyData = {
  title: "Non-Return and Replacement Policy",
  subtitle: "Milaan Publication and Bookstore",
  lastUpdated: "24/03/2025",
  sections: [
    {
      title: "General Policy",
      content:
        "All sales are final. Milaan Publication and Bookstore does not accept returns, refunds, or exchanges for any reason, except as explicitly stated below.",
    },
    {
      title: "Exception: Incorrect/Wrong Package",
      conditions: [
        {
          title: "Reporting Deadline",
          content: "Notify us within 24 hours of delivery confirmation.",
        },
        {
          title: "Video Proof Requirement",
          content:
            "You must provide a continuous, unedited video of the entire unboxing process.",
          requirements: [
            "The sealed package (showing the shipping label and order number).",
            "Opening the package to reveal the incorrect item(s).",
            "A clear view of the item(s) and any packaging materials.",
            "The video must be timestamped and match the date of delivery.",
          ],
          note: "Failure to submit valid video proof will result in denial of the replacement request.",
        },
      ],
    },
    {
      title: "Replacement Process",
      steps: [
        {
          title: "Contact Us Immediately",
          content: "Within 24 hours of delivery.",
          contact: {
            email: "info.milaanpublication@gmail.com",
            phone: "+91-8957795819",
          },
          include: [
            "Order number",
            "Delivery date",
            "Unboxing video (as attachment or cloud link)",
          ],
        },
        {
          title: "Verification",
          content:
            "Our team will review the video and respond within 48 hours.",
        },
        {
          title: "Resolution",
          content:
            "If the error is confirmed, we will arrange a free replacement.",
          conditions: [
            "Replacements depend on stock availability.",
            "If unavailable, store credit or an alternative solution may be offered.",
            "No refunds will be issued under any circumstances.",
          ],
        },
      ],
    },
  ],
};

const OurPolicy = () => {
  return (
    <div className="px-8 md:px-10 py-4 md:py-12">
      <h2 className="text-xl font-semibold text-sky-900 mb-1">
        {policyData.title}
      </h2>
      <h5 className="font-semibold">{policyData.subtitle}</h5>
      <p className="text-sm text-gray-700">
        Last Updated: {policyData.lastUpdated}
      </p>
      <div className="mt-6 space-y-6">
        {policyData.sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-800">
              {index + 1}. {section.title}
            </h3>
            {section.content && (
              <p className="text-gray-700 mt-1">{section.content}</p>
            )}
            {section.conditions &&
              section.conditions.map((condition, i) => (
                <div key={i} className="mt-3">
                  <h4 className="font-medium text-gray-900">
                    {condition.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{condition.content}</p>
                  {condition.requirements && (
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                      {condition.requirements.map((req, j) => (
                        <li key={j}>{req}</li>
                      ))}
                    </ul>
                  )}
                  {condition.note && (
                    <p className="text-red-600 text-sm mt-1">
                      {condition.note}
                    </p>
                  )}
                </div>
              ))}
            {section.steps &&
              section.steps.map((step, i) => (
                <div key={i} className="mt-3">
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-gray-700 text-sm">{step.content}</p>
                  {step.contact && (
                    <p className="text-gray-700 text-sm mt-1">
                      Email:{" "}
                      <span className="text-blue-600">
                        {step.contact.email}
                      </span>{" "}
                      | Phone: {step.contact.phone}
                    </p>
                  )}
                  {step.include && (
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                      {step.include.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {step.conditions && (
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                      {step.conditions.map((condition, j) => (
                        <li key={j}>{condition}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            {index + 1 !== policyData.sections.length && (
              <hr className="mt-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
