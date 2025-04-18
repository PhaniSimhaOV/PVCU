import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Purpose of Use</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>This website and its content are intended solely for personal, non-commercial use.</li>
        <li>Any unauthorized use is strictly prohibited.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Product Availability</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Product details, availability, and pricing are subject to change without prior notice, at the sole discretion of PVCU.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Order Finality</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Orders are confirmed upon successful payment.</li>
        <li>Once processed, they cannot be modified or cancelled.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Intellectual Property</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>All site content, including designs, visuals, and branding, is the Intellectual Property of PVCU or its licensors.</li>
        <li>Any unauthorized reproduction or use is prohibited.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Third-Party Links</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>We may include links to external sites for user convenience.</li>
        <li>PVCU is not responsible for the content or privacy practices of those third parties.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Limitation of Liability</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>PVCU is not liable for any delays, disruptions, or losses arising from factors beyond our control, including third-party logistics or technical issues.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Account Responsibility</h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Users are responsible for maintaining the confidentiality of their account credentials.</li>
        <li>Users are accountable for all activity conducted under their account.</li>
      </ul>
    </div>
  );
};

export default Terms;
