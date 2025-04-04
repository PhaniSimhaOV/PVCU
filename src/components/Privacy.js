import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>We collect essential personal details such as your name, email address, contact number, and shipping address.</li>
        <li>This information is used to process orders and enhance your shopping experience.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Confidentiality Assured</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Your information is handled with strict confidentiality.</li>
        <li>It is not sold, rented, or disclosed to any third parties, except trusted service providers involved in order processing and delivery.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Secure Transactions</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>All payments are processed via secure, encrypted gateways.</li>
        <li>We do not store or retain any payment information.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Cookies & Tracking</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>We use cookies to optimize site performance, personalize content, and enhance user experience.</li>
        <li>Cookie preferences can be managed through your browser settings.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Marketing Communication</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>With your explicit consent, we may send you updates and promotional offers.</li>
        <li>You may unsubscribe from such communications at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Access & Control</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>You have the right to access, update, or request deletion of your personal data.</li>
        <li>Contact us directly at <a href="mailto:superhelp@pvcu.in" className="text-blue-600">superhelp@pvcu.in</a>.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Policy Revisions</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>This Privacy Policy may be updated periodically.</li>
        <li>Continued use of the website implies your acceptance of the most recent version.</li>
      </ul>
    </div>
  );
};

export default Privacy;
