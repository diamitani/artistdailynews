'use client';

import React, { useState } from 'react';

export default function DeskDashboardPage() {
  const [status, setStatus] = useState('Draft'); // Draft, Approved, Dispatched
  
  // Mock data representing adn.editor's output JSON
  const proposedIssue = {
    issue_date: new Date().toISOString().split('T')[0],
    kicker: 'BUSINESS',
    lead: {
      title: "Spotify adjusts mechanical royalty rates",
      dek: "The streaming giant is raising the minimum stream count required to generate royalties, a move that will heavily impact the long tail of independent creators.",
      source_name: "Billboard Pro",
      signal_score: 85
    },
    rails: {
      culture: 5,
      business: 5,
      ideas: 3
    }
  };

  const handleApprove = () => {
    setStatus('Approved');
    alert('Issue locked. Writer Agent notified.');
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Today's Issue Prep</h1>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
            Status: {status}
          </span>
          <button 
            onClick={handleApprove}
            disabled={status !== 'Draft'}
            className="bg-black text-white px-4 py-2 font-bold text-sm rounded disabled:opacity-50"
          >
            Approve & Lock
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Proposed Lead (by adn.editor)</h2>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs font-bold text-red-600 bg-red-50 inline-block px-2 py-1 mb-2 rounded">
              {proposedIssue.kicker} · Signal: {proposedIssue.lead.signal_score}
            </div>
            <h3 className="text-2xl font-bold mb-2">{proposedIssue.lead.title}</h3>
            <p className="text-gray-700 font-medium max-w-2xl">{proposedIssue.lead.dek}</p>
            <p className="text-sm text-gray-400 mt-2">Source: {proposedIssue.lead.source_name}</p>
          </div>
          <div>
            <button className="text-sm text-blue-600 hover:underline">Swap Lead</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-1">Culture Rail</h3>
          <p className="text-gray-500 text-sm">{proposedIssue.rails.culture} items selected</p>
          <button className="text-xs text-blue-600 mt-2">Edit Items</button>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-1">Business Rail</h3>
          <p className="text-gray-500 text-sm">{proposedIssue.rails.business} items selected</p>
          <button className="text-xs text-blue-600 mt-2">Edit Items</button>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-1">Ideas Rail</h3>
          <p className="text-gray-500 text-sm">{proposedIssue.rails.ideas} items selected</p>
          <button className="text-xs text-blue-600 mt-2">Edit Items</button>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
        <p className="font-bold mb-2 text-gray-800">Agent Checklists</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>adn.ingest:</strong> 34 items pulled from 18 sources.</li>
          <li><strong>adn.classify:</strong> Categories mapped. No rights risks detected.</li>
          <li><strong>adn.editor:</strong> Package built. Week balance: 2 Culture, 2 Business, 1 Idea.</li>
        </ul>
      </div>
    </div>
  );
}
