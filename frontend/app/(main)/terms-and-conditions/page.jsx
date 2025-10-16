import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-blue-50">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-6">Welcome to <strong>OpT. National</strong> (“we,” “our,” or “us”).</p>

      <p className="mb-6">
        These Terms and Conditions (“Terms”) govern your use of the services offered by OpT. National through our website and email newsletters. By subscribing, accessing, or using our services, you agree to these Terms. Please read them carefully.
      </p>

      <Section title="1. Service Overview">
        <ul className="list-disc ml-5">
          <li>Higher education, scholarships, and research opportunities</li>
          <li>Remote and international jobs and internships</li>
          <li>Career development content and expert guidance</li>
        </ul>
      </Section>

      <Section title="2. Subscription Plans and Pricing">
        <p className="mb-2">We offer three flexible monthly subscription options:</p>
        <ul className="list-disc ml-5">
          <li><strong>EduTrack</strong> (Study Abroad/Research): <strong>BDT 30/month</strong></li>
          <li><strong>CareerEdge</strong> (Jobs & Internships): <strong>BDT 30/month</strong></li>
          <li><strong>OpT. Pro</strong> (All Access): <strong>BDT 50/month</strong></li>
        </ul>
        <p className="mt-2">All prices are in Bangladeshi Taka (BDT) and may be updated with notice.</p>
      </Section>

      <Section title="3. Payment & Refund Policy">
        <ul className="list-disc ml-5">
          <li>Full payment is required before accessing newsletter content.</li>
          <li><strong>All payments are non-refundable</strong>, including for partial months.</li>
          <li>Billing concerns must be reported within <strong>5 days</strong>.</li>
        </ul>
      </Section>

      <Section title="4. Use of Content">
        <ul className="list-disc ml-5">
          <li>All content is for personal, non-commercial use only.</li>
          <li>Redistribution or commercial use is strictly prohibited.</li>
          <li>Content is protected by intellectual property laws.</li>
        </ul>
      </Section>

      <Section title="5. Subscriber Responsibilities">
        <ul className="list-disc ml-5">
          <li>Provide accurate information at signup.</li>
          <li>Use your own email account.</li>
          <li>Do not share login details or newsletter content publicly.</li>
        </ul>
      </Section>

      <Section title="6. Cancellations">
        <ul className="list-disc ml-5">
          <li>Cancel your subscription anytime.</li>
          <li>No future billing after cancellation.</li>
          <li>Access remains until the end of the current billing period.</li>
        </ul>
      </Section>

      <Section title="7. Service Changes">
        <ul className="list-disc ml-5">
          <li>We may update or discontinue services at any time.</li>
          <li>Subscription pricing may change with notice.</li>
          <li>We reserve the right to update these Terms.</li>
        </ul>
      </Section>

      <Section title="8. Termination of Access">
        <ul className="list-disc ml-5">
          <li>Violating Terms may result in account termination.</li>
          <li>Sharing or misusing content will lead to suspension.</li>
          <li>Non-payment may result in account lockout.</li>
        </ul>
      </Section>

      <Section title="9. Limitation of Liability">
        <ul className="list-disc ml-5">
          <li>We are not liable for external listings' accuracy.</li>
          <li>We are not responsible for any loss due to newsletter use.</li>
          <li>Temporary service disruptions may occur.</li>
        </ul>
      </Section>

      <Section title="10. Governing Law">
        <p>These Terms are governed by the laws of the <strong>People’s Republic of Bangladesh</strong>.</p>
      </Section>

      <p className="mt-6 text-sm text-gray-500">If you have any questions, please contact us.</p>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </section>
);

export default TermsAndConditions;
