import React from "react";
import TermsPrivacyRefund from "./TermsPrivacyRefund";

// const policyData = {
//   title: "Non-Return and Replacement Policy",
//   subtitle: "Milaan Publication and Bookstore",
//   lastUpdated: "24/03/2025",
//   sections: [
//     {
//       title: "General Policy",
//       content:
//         "All sales are final. Milaan Publication and Bookstore does not accept returns, refunds, or exchanges for any reason, except as explicitly stated below.",
//     },
//     {
//       title: "Exception: Incorrect/Wrong Package",
//       conditions: [
//         {
//           title: "Reporting Deadline",
//           content: "Notify us within 24 hours of delivery confirmation.",
//         },
//         {
//           title: "Video Proof Requirement",
//           content:
//             "You must provide a continuous, unedited video of the entire unboxing process.",
//           requirements: [
//             "The sealed package (showing the shipping label and order number).",
//             "Opening the package to reveal the incorrect item(s).",
//             "A clear view of the item(s) and any packaging materials.",
//             "The video must be timestamped and match the date of delivery.",
//           ],
//           note: "Failure to submit valid video proof will result in denial of the replacement request.",
//         },
//       ],
//     },
//     {
//       title: "Replacement Process",
//       steps: [
//         {
//           title: "Contact Us Immediately",
//           content: "Within 24 hours of delivery.",
//           contact: {
//             email: "info.milaanpublication@gmail.com",
//             phone: "+91-8957795819",
//           },
//           include: [
//             "Order number",
//             "Delivery date",
//             "Unboxing video (as attachment or cloud link)",
//           ],
//         },
//         {
//           title: "Verification",
//           content:
//             "Our team will review the video and respond within 48 hours.",
//         },
//         {
//           title: "Resolution",
//           content:
//             "If the error is confirmed, we will arrange a free replacement.",
//           conditions: [
//             "Replacements depend on stock availability.",
//             "If unavailable, store credit or an alternative solution may be offered.",
//             "No refunds will be issued under any circumstances.",
//           ],
//         },
//       ],
//     },
//   ],
// };

const OurPolicy = () => {
  return (
    <div className="px-8 md:px-10 py-4 md:py-12">
      <TermsPrivacyRefund />
    </div>
  );
};

export default OurPolicy;
