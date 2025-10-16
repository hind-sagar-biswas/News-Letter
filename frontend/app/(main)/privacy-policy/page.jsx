import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-blue-50">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-6">
        At <strong>OpT. National</strong>, we respect your privacy and are committed to protecting your personal data.
        This Privacy Policy outlines how we collect, use, store, and protect your information when you subscribe to our
        services or interact with us online.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-5">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number (optional)</li>
          <li>Academic Background (e.g., current education level, university name)</li>
          <li>Interest Areas (e.g., higher studies, jobs, internships)</li>
          <li>Transaction Details (only related to subscriptions)</li>
          <li>Feedback or Survey Responses</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
        <ul className="list-disc ml-5">
          <li>Send personalized newsletter content</li>
          <li>Share updates, alerts, and new opportunities</li>
          <li>Enhance and personalize your experience</li>
          <li>Analyze user preferences and performance</li>
          <li>Fulfill legal obligations</li>
        </ul>
        <p className="mt-2 font-medium">We <strong>do not</strong> sell or rent your data to third parties.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Email Communications</h2>
        <p>
          By subscribing, you agree to receive newsletters and service-related emails.
          You can unsubscribe at any time by clicking the <strong>“unsubscribe”</strong> link in any of our emails.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Data Storage and Protection</h2>
        <p>
          We store your data securely using industry-standard security practices. Only authorized personnel have access to your information.
          Our data services (e.g., <strong>Sender.net</strong>) comply with relevant data protection standards.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Third-Party Tools</h2>
        <p>
          We may use tools like <strong>Sender.net</strong> or <strong>Google Analytics</strong> to improve performance.
          These may collect limited, non-identifiable data using cookies or tracking technologies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc ml-5">
          <li>Access the personal data we hold about you</li>
          <li>Request corrections or deletion of your data</li>
          <li>Withdraw consent at any time</li>
          <li>Request information on how your data is processed</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, contact us at{" "}
          <a href="mailto:opt.national@gmail.com" className="text-blue-600 underline">
            opt.national@gmail.com
          </a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
        <p>
          We retain your data only as long as necessary to fulfill our service and legal obligations.
          If you unsubscribe, your core data will be deleted within <strong>60 days</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Policy Updates</h2>
        <p>
          We may update this Privacy Policy from time to time. You will be notified via email or on our website when changes are made.
        </p>
      </section>

      <p className="mt-6 text-sm text-gray-500">
        For any questions or concerns about your data, please contact us at <strong>opt.national@gmail.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
