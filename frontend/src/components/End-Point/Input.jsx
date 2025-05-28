import React, { useContext, useState } from 'react';
import endpoints from '../../end-point/end.point.json';
import { AuthContext } from '../../context/AuthContext';

const Input = () => {
  const { user } = useContext(AuthContext);

  // Selected method like "GET", "POST", etc.
  const [selectedMethod, setSelectedMethod] = useState('');
  // Selected endpoint object
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  // API response data
  const [response, setResponse] = useState(null);
  // Loading state for fake API call
  const [loading, setLoading] = useState(false);
  // Info about who hit API and when
  const [hitInfo, setHitInfo] = useState(null);

  // Get unique methods from endpoints to populate method dropdown
  const uniqueMethods = [...new Set(endpoints.map(ep => ep.method))];

  // Filter endpoints by selected method
  const filteredEndpoints = selectedMethod
    ? endpoints.filter(ep => ep.method === selectedMethod)
    : [];

  // When method changes, reset endpoint selection & response info
  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    setSelectedEndpoint(null);
    setResponse(null);
    setHitInfo(null);
  };

  // When endpoint changes, update selected endpoint
  const handleEndpointChange = (e) => {
    const index = e.target.value;
    setSelectedEndpoint(index !== '' ? filteredEndpoints[index] : null);
    setResponse(null);
    setHitInfo(null);
  };

  // Simulate API call - show example response after 1 second
  const handleCall = () => {
    if (!selectedEndpoint) return;
    setLoading(true);
    setResponse(null);
    setHitInfo(null);

    setTimeout(() => {
      const simulatedResponse = selectedEndpoint.response || { message: 'No example response provided' };
      setResponse(simulatedResponse);

      const hitDetails = {
        user: user?.username || 'guest',
        time: new Date().toLocaleString(),
      };

      setHitInfo(hitDetails);
      console.log('API hit info:', hitDetails);

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">API Endpoint Explorer</h2>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <p className="text-sm text-gray-600 mb-2">Base URL:</p>
        <h4 className="font-mono text-lg text-gray-800 mb-4 border p-2 rounded bg-gray-100">
          http://localhost:3245
        </h4>

        {/* Method Selector */}
        <label className="block mb-2 font-medium text-gray-700">Select HTTP Method:</label>
        <select
          value={selectedMethod}
          onChange={handleMethodChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Choose Method --</option>
          {uniqueMethods.map((method, idx) => (
            <option key={idx} value={method}>
              {method}
            </option>
          ))}
        </select>

        {/* Endpoint Selector - filtered by method */}
        {selectedMethod && (
          <>
            <label className="block mt-4 mb-2 font-medium text-gray-700">Select Endpoint:</label>
            <select
              value={filteredEndpoints.indexOf(selectedEndpoint)}
              onChange={handleEndpointChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Choose Endpoint --</option>
              {filteredEndpoints.map((ep, index) => (
                <option key={index} value={index}>
                  {ep.endpoint}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Endpoint Details */}
        {selectedEndpoint && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-700">Endpoint Details</h4>
            <p><strong>Method:</strong> {selectedEndpoint.method}</p>
            <p><strong>Endpoint:</strong> {selectedEndpoint.endpoint}</p>
            <p><strong>Description:</strong> {selectedEndpoint.description}</p>
          </div>
        )}

        {/* Call API Button */}
        {selectedEndpoint && (
          <button
            onClick={handleCall}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Calling...' : 'Call API'}
          </button>
        )}

        {/* Show Response */}
        {response && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-green-700">API Response</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {/* Show Hit Info */}
        {hitInfo && (
          <div className="mt-4 text-gray-700 text-sm italic">
            <p><strong>User:</strong> {hitInfo.user}</p>
            <p><strong>Hit at:</strong> {hitInfo.time}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
