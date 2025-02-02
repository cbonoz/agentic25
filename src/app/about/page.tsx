import React from 'react';

export default function AboutPage() {
  const integrations = [
    {
      name: 'Coinbase Developer Platform',
      description: 'AgentKit and OnchainKit for AI agents and smart contract interactions',
      benefit: 'Automates transaction recording, provides personalized offers, and ensures secure smart contract executions.'
    },
    {
      name: 'Base',
      description: "Coinbase's Layer 2 solution for high-throughput transactions",
      benefit: 'Enables scalable and cost-effective processing of numerous QR code scans and reward distributions.'
    },
    {
      name: 'EigenLayer',
      description: 'Decentralized verification mechanisms',
      benefit: 'Ensures the integrity and authenticity of loyalty data, preventing fraud and double-spending.'
    },
    {
      name: 'Lit Protocol',
      description: 'Decentralized access control management',
      benefit: 'Protects user data privacy and secures sensitive transaction details.'
    },
    {
      name: 'Gaia and Collab.Land',
      description: 'Decentralized storage and community engagement',
      benefit: 'Provides secure data storage and fosters a community-driven loyalty program.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About StampX</h1>

          {/* Project Overview */}
          <div className="mb-12 text-left bg-white rounded-lg shadow-lg p-8">

            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-6">
              StampX is a Web3 QR code system that enables users to scan QR codes at the point of checkout
              and get loyalty rewards attached to their account.
            </p>

            <h3 className="text-xl font-semibold mb-3">Core Features:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Business QR code setup with configurable reward thresholds</li>
              <li>Custom checkout page</li>
              <li>AI agent integration for transaction management</li>
              <li>Purchase trend analytics</li>
              <li>Payment execution</li>
              <li>Smart contract transactions</li>
            </ul>
          </div>

          {/* Integrations */}
          <div className="grid md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {integration.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {integration.description}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Benefit:</span> {integration.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

