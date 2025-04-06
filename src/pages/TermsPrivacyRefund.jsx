import React from "react";

const Section = ({ title, content, list, note }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    {content && <p className="text-gray-700 mt-1">{content}</p>}
    {list && (
      <ul className="list-disc list-inside text-gray-700 mt-2">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )}
    {note && <p className="text-red-600 mt-2">{note}</p>}
  </div>
);

const TermsPrivacyRefund = () => {
  return (
    <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold text-sky-900 mb-6">
        Terms and Conditions
      </h1>

      <Section
        title="1. Introduction"
        content="Welcome to Milaan Publication (https://milaanpublication.in/). By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, you must not use our website. This Website is managed by Technical Manager - Prabhjot Singh."
      />
      <Section
        title="2. Definitions"
        content="Vivek Singh refers to Milaan Publication, the owner of the website."
      />
      <Section
        title="3. Use of Website"
        list={[
          "Use the website only for lawful purposes.",
          "Not engage in any activity that may disrupt or impair the functionality of the website.",
          "Not use the website to upload, post, or transmit any harmful or illegal content.",
        ]}
      />
      <Section
        title="4. Intellectual Property"
        list={[
          "All content on the website, including but not limited to text, graphics, logos, images, and videos, is owned by Milaan Publication or its licensors and is protected by copyright laws.",
          "You may not reproduce, distribute, or otherwise use any of the website's content without prior written permission.",
        ]}
      />
      <Section
        title="5. Products and Services"
        list={[
          "All products and services provided by Milaan Publication are subject to availability and may be modified or discontinued at any time without notice.",
          "Pricing and payment terms for products or services will be clearly stated on the website.",
        ]}
      />
      <Section
        title="6. User Account"
        list={[
          "You are responsible for maintaining the confidentiality of your account information, including your password.",
          "Notify us immediately of any unauthorized use of your account.",
        ]}
      />
      <Section
        title="7. Privacy"
        content="Our Privacy Policy governs the collection, use, and disclosure of your personal data. By using our website, you agree to the terms outlined in our Privacy Policy."
      />
      <Section
        title="8. Limitation of Liability"
        list={[
          "Milaan Publication will not be liable for any loss or damage arising from your use of the website, including but not limited to direct, indirect, incidental, or consequential damages.",
          "We do not guarantee the accuracy, completeness, or timeliness of the content on the website.",
        ]}
      />
      <Section
        title="9. Third-Party Links"
        content="Our website may contain links to third-party websites. We do not control these websites and are not responsible for their content, accuracy, or availability. Accessing these websites is at your own risk."
      />
      <Section
        title="10. Amendments"
        content="We reserve the right to modify or update these Terms and Conditions at any time without prior notice. Any changes will be reflected on this page with the updated date. You are encouraged to review these Terms and Conditions periodically."
      />
      <Section
        title="11. Governing Law"
        content="These Terms and Conditions will be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles."
      />
      <Section title="12. Contact Us" content="Email: milaans24@gmail.com" />

      <h1 className="text-2xl font-bold text-sky-900 mt-12 mb-6">
        Privacy Policy
      </h1>

      <Section
        title="1. Introduction"
        content="Your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you visit our website or interact with our services."
      />
      <Section
        title="2. Information We Collect"
        list={[
          "Personal Information: name, email address, phone number, payment details.",
          "Usage Data: IP addresses, browser type, pages visited.",
          "Cookies and Tracking Technologies.",
        ]}
      />
      <Section
        title="3. How We Use Your Information"
        list={[
          "To process orders and provide customer support.",
          "To improve website performance and user experience.",
          "To send updates and promotional materials (you may opt out anytime).",
          "For legal compliance and fraud prevention.",
        ]}
      />
      <Section
        title="4. Data Retention"
        content="We retain personal data as long as necessary for business or legal obligations."
      />
      <Section
        title="5. Data Security"
        content="We implement reasonable measures to protect your data, but no method is 100% secure."
      />
      <Section
        title="6. Sharing of Information"
        list={[
          "Payment Processing: shared with secure gateways.",
          "Analytics: shared with third-party tools.",
          "Legal Compliance: shared when required by law.",
        ]}
        note="We do not sell or rent your personal information to third parties."
      />
      <Section
        title="7. Your Rights and Choices"
        list={[
          "Access: Request your stored personal info.",
          "Correction: Request corrections to your data.",
          "Deletion: Request data deletion (with exceptions).",
          "Opt-Out: From marketing communications anytime.",
        ]}
      />
      <Section
        title="8. Cookies"
        content="You can manage cookies via your browser settings. Disabling cookies may affect site functionality."
      />
      <Section
        title="9. Contact Us"
        content="Email: info.milaanpublication@gmail.com"
      />

      <h1 className="text-2xl font-bold text-sky-900 mt-12 mb-6">
        Refund Policy
      </h1>

      <Section
        title="Refund and Replacement"
        list={[
          "Notify us within 2 days if you receive a defective or incorrect product.",
          "We do not offer refunds or returns. Only replacement/exchange under the above condition.",
          "Replacement will be processed within 5–7 business days.",
        ]}
      />

      <Section
        title="Exception: Incorrect/Wrong Package"
        list={[
          "The sealed package (showing the shipping label and order number).",
          "Opening the package to reveal the incorrect item(s).",
          "A clear view of the item(s) and any packaging materials.",
          "The video must be timestamped and match the date of delivery.",
        ]}
      />

      <h1 className="text-2xl font-bold text-sky-900 mt-12 mb-6">
        Shipping Policy
      </h1>

      <Section
        title="Shipping"
        list={["All orders will be delivered within 10–15 business days."]}
      />
      <div className="mt-6">
        <p className="text-sm">
          <strong>Contact: </strong> info.milaanpublication@gmail.com |
          +91-8957795819
        </p>
      </div>
    </div>
  );
};

export default TermsPrivacyRefund;
