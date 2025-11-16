import React, { useEffect, useState } from 'react';

export const Profile = () => {
  const [farmer, setFarmer] = useState({ name: '', farmer_id: '' });
  const [applications, setApplications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const krushiSetu = JSON.parse(localStorage.getItem("krushiSetu"));

    if (krushiSetu?.farmer) {
      const farmerData = {
        name: krushiSetu.farmer.name,
        farmer_id: krushiSetu.farmer.farmer_id
      };
      setFarmer(farmerData);

      fetch(`http://localhost:3001/api/farmers/applications?farmer_id=${farmerData.farmer_id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch applications');
          return res.json();
        })
        .then((data) => {
          setApplications(data.applications || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Could not load applications.');
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('Farmer not found in localStorage');
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
      <div className="min-h-screen bg-gradient-to-br  from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br  from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl border border-red-200 p-8 max-w-md">
          <div className="text-red-600 text-center">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error Loading Profile</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20
     from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Farmer Profile Header */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-4">
                <svg className="w-16 h-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{farmer.name}</h1>
            <p className="text-green-100 text-lg">Farmer ID: {farmer.farmer_id}</p>
          </div>
        </div>

        {/* Applications Section */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-500">You haven't submitted any applications.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Applications</h2>
              <div className="inline-flex items-center bg-white border border-green-200 rounded-full px-6 py-2 shadow-md">
                <span className="text-green-800 font-semibold">
                  Application {currentIndex + 1} of {applications.length}
                </span>
              </div>
            </div>

            {/* Application Card */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{applications[currentIndex].scheme_name || 'Scheme Name Unavailable'}</h3>
                    <p className="text-green-100 text-sm">Application ID: {applications[currentIndex].application_id}</p>
                  </div>
                  <div>
                    {getStatusBadge(applications[currentIndex].status)}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Application Details Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                    Application Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Scheme ID</p>
                        <p className="text-gray-900 font-semibold">{applications[currentIndex].scheme_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Applied On</p>
                        <p className="text-gray-900 font-semibold">{formatDate(applications[currentIndex].applied_at)}</p>
                      </div>
                    </div>

                    {applications[currentIndex].reviewed_at && (
                      <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">Reviewed On</p>
                          <p className="text-gray-900 font-semibold">{formatDate(applications[currentIndex].reviewed_at)}</p>
                        </div>
                      </div>
                    )}

                    {applications[currentIndex].approved_at && (
                      <div className="flex items-center bg-green-50 rounded-lg p-4 border border-green-300">
                        <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs text-green-600 font-semibold">Approved On</p>
                          <p className="text-green-900 font-semibold">{formatDate(applications[currentIndex].approved_at)}</p>
                        </div>
                      </div>
                    )}

                    {applications[currentIndex].rejected_at && (
                      <div className="flex items-center bg-red-50 rounded-lg p-4 border border-red-300">
                        <svg className="w-6 h-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs text-red-600 font-semibold">Rejected On</p>
                          <p className="text-red-900 font-semibold">{formatDate(applications[currentIndex].rejected_at)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reviewer Notes */}
                {applications[currentIndex].reviewer_notes && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                      Reviewer Notes
                    </h4>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-gray-800">{applications[currentIndex].reviewer_notes}</p>
                    </div>
                  </div>
                )}

                {/* Documents */}
                {applications[currentIndex].documents && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                      Documents
                    </h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-800 text-sm">{applications[currentIndex].documents}</p>
                    </div>
                  </div>
                )}

                {/* Status Message */}
                {applications[currentIndex].status === 'pending' && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-center">
                    <p className="text-yellow-800 font-bold text-lg">⏳ Application Under Review</p>
                    <p className="text-yellow-700 text-sm mt-1">Your application is being processed by our team.</p>
                  </div>
                )}

                {applications[currentIndex].status === 'approved' && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
                    <p className="text-green-800 font-bold text-lg">✓ Application Approved</p>
                    <p className="text-green-700 text-sm mt-1">Congratulations! Your application has been approved.</p>
                  </div>
                )}

                {applications[currentIndex].status === 'rejected' && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
                    <p className="text-red-800 font-bold text-lg">✗ Application Rejected</p>
                    <p className="text-red-700 text-sm mt-1">Unfortunately, your application was not approved.</p>
                  </div>
                )}

                {/* Timestamps Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="font-semibold">Created:</span> {formatDate(applications[currentIndex].created_at)}
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">Updated:</span> {formatDate(applications[currentIndex].updated_at)}
                  </div>
                </div>
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
          </>
        )}
      </div>
    </div>
  );
};