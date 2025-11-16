import React, { useEffect, useState } from 'react';

export const ApplicationPage = () => {
  const [applications, setApplications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/applications', {
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': 'admin-secret-2025',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch applications');
        }

        const data = await response.json();
        const appsWithState = (data.applications || []).map(app => ({ ...app, isUpdating: false }));
        setApplications(appsWithState);
        setCount(data.count || 0);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleReview = async (appId, newStatus) => {
    setApplications(apps =>
      apps.map(app => (app.id === appId ? { ...app, isUpdating: true } : app))
    );

    try {
      const response = await fetch(`http://localhost:3001/api/admin/applications/${appId}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'admin-secret-2025',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update status`);
      }

      setApplications(apps =>
        apps.map(app =>
          app.id === appId ? { ...app, status: newStatus, isUpdating: false } : app
        )
      );

    } catch (err) {
      console.error(`Error updating application ${appId}:`, err);
      alert(`Could not update application: ${err.message}`);
      setApplications(apps =>
        apps.map(app => (app.id === appId ? { ...app, isUpdating: false } : app))
      );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const badgeClasses = {
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      approved: 'bg-green-100 text-green-800 border border-green-300',
      rejected: 'bg-red-100 text-red-800 border border-red-300',
    };
    return (
      <span
        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
          badgeClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-300'
        }`}
      >
        {status?.toUpperCase() || 'UNKNOWN'}
      </span>
    );
  };

  const handleNext = () => {
    if (currentIndex < applications.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl border border-red-200 p-8 max-w-md">
          <div className="text-red-600 text-center">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error Loading Applications</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 max-w-md text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
          <p className="text-gray-500">There are no applications to review at this time.</p>
        </div>
      </div>
    );
  }

  const app = applications[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg mb-4">Application Review</p>
          <div className="inline-flex items-center bg-white border border-blue-200 rounded-full px-6 py-2 shadow-md">
            <span className="text-blue-800 font-semibold">
              Application {currentIndex + 1} of {count}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{app.farmer_name}</h2>
                <p className="text-blue-100 text-sm">Farmer ID: {app.farmer_id}</p>
                <p className="text-blue-100 text-sm">Application ID: {app.application_id}</p>
              </div>
              <div>
                {getStatusBadge(app.status)}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {/* Personal Information Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Mobile Number</p>
                    <p className="text-gray-900 font-semibold">{app.mobile}</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">District</p>
                    <p className="text-gray-900 font-semibold">{app.district}</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM14 12a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Land Size</p>
                    <p className="text-gray-900 font-semibold">{app.land_size} acres</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Applied On</p>
                    <p className="text-gray-900 font-semibold">{formatDate(app.applied_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheme Information Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Scheme Information
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-green-600 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{app.scheme_name}</h4>
                    <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-green-300 inline-flex">
                      <span className="text-green-700 font-bold text-lg">{app.benefit_amount}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">Scheme ID: {app.scheme_id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {app.status === 'pending' && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleReview(app.id, 'approved')}
                  disabled={app.isUpdating}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {app.isUpdating ? 'Processing...' : '✓ Approve Application'}
                </button>
                <button
                  onClick={() => handleReview(app.id, 'rejected')}
                  disabled={app.isUpdating}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {app.isUpdating ? 'Processing...' : '✗ Reject Application'}
                </button>
              </div>
            )}

            {app.status === 'approved' && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
                <p className="text-green-800 font-bold text-lg">✓ Application Approved</p>
                {app.approved_at && (
                  <p className="text-green-600 text-sm mt-1">Approved on: {formatDate(app.approved_at)}</p>
                )}
              </div>
            )}

            {app.status === 'rejected' && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
                <p className="text-red-800 font-bold text-lg">✗ Application Rejected</p>
                {app.rejected_at && (
                  <p className="text-red-600 text-sm mt-1">Rejected on: {formatDate(app.rejected_at)}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-lg border-2 border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === applications.length - 1}
            className="flex items-center bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-lg border-2 border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};