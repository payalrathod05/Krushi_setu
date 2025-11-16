import { useState, useEffect } from "react";
import { CheckCircle, Calendar, MapPin, DollarSign, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EligibleSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicationStatus, setApplicationStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const krushiSetu = JSON.parse(localStorage.getItem("krushiSetu"));
        const farmerId = krushiSetu?.farmer?.farmer_id;

        console.log("Fetched farmer ID:", farmerId);

        if (!farmerId) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/farmers/eligible-schemes?farmer_id=${farmerId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch schemes");
        }

        setSchemes(data.eligibleSchemes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSchemes();
  }, []);

  const handleApply = (scheme) => {
    const krushiSetu = JSON.parse(localStorage.getItem("krushiSetu"));
    const farmerId = krushiSetu?.farmer?.farmer_id;

    if (!farmerId) {
      window.location.href = "/login";
      return;
    }

    setApplicationStatus((prev) => ({
      ...prev,
      [scheme.id]: "submitted",
    }));

    navigate(`/apply/${encodeURIComponent(scheme.name)}`, { 
      state: { 
        scheme, 
        farmerId
      } 
    });

    console.log("Navigating with data:", { schemeId: scheme.id, farmerId });
  };

  const handleNext = () => {
    if (currentIndex < schemes.length - 1) {
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading eligible schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-200 p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Schemes</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Schemes Found</h3>
          <p className="text-gray-600 mb-6">
            There are currently no eligible schemes based on your profile. Please check back later or contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const scheme = schemes[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Eligible Government Schemes</h1>
          <p className="text-gray-600 text-lg mb-4">Apply for schemes tailored to your farming profile</p>
          <div className="inline-flex items-center bg-white border border-green-200 rounded-full px-6 py-2 shadow-md">
            <span className="text-green-800 font-semibold">
              Scheme {currentIndex + 1} of {schemes.length}
            </span>
          </div>
        </div>

        {/* Scheme Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold mb-2">{scheme.name}</h2>
              </div>
              <CheckCircle className="w-10 h-10 text-white flex-shrink-0" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-green-200">
                Scheme Description
              </h3>
              <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
            </div>

            {/* Scheme Details */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                Scheme Details
              </h3>
              <div className="space-y-4">
                {/* Benefit Amount */}
                <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                  <div className="bg-white rounded-full p-3 mr-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Benefit Amount</p>
                    <p className="text-xl font-bold text-green-700">{scheme.benefit_amount}</p>
                  </div>
                </div>

                {/* Land Size Requirement */}
                <div className="flex items-center bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="bg-white rounded-full p-3 mr-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Land Size Requirement</p>
                    <p className="text-gray-900 font-semibold">
                      {scheme.min_land_size} – {scheme.max_land_size || "No limit"} Acres
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                {scheme.deadline && (
                  <div className="flex items-center bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="bg-white rounded-full p-3 mr-4">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Application Deadline</p>
                      <p className="text-gray-900 font-semibold">{scheme.deadline}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Eligibility Info */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">You are eligible for this scheme!</h4>
                  <p className="text-sm text-gray-700">Your farming profile matches all the requirements for this government scheme.</p>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => handleApply(scheme)}
              disabled={applicationStatus[scheme.id] === "submitted"}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                applicationStatus[scheme.id] === "submitted"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800"
              }`}
            >
              {applicationStatus[scheme.id] === "submitted" ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Application Submitted
                </span>
              ) : (
                "Apply Now"
              )}
            </button>

            {/* Additional Info */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Click "Apply Now" to proceed with your application for this scheme
              </p>
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
            disabled={currentIndex === schemes.length - 1}
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
}