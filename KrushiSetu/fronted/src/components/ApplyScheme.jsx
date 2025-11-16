import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ApplyScheme() {
  const location = useLocation();
  const schemeData = location.state?.scheme;
   // ✅ Get scheme object passed from EligibleSchemes
   const navigate = useNavigate()
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifsc: "",
    bankName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (key, value) => {
    setBankDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Get farmer ID from localStorage
      const krushiSetu = JSON.parse(localStorage.getItem("krushiSetu"));
      const farmerId = krushiSetu?.farmer?.farmer_id;

      if (!farmerId) {
        setMessage("Farmer ID not found. Please login again.");
        setLoading(false);
        return;
      }

      if (!schemeData?.id) {
        setMessage("Invalid scheme data. Please go back and select a scheme again.");
        setLoading(false);
        return;
      }

      const payload = {
        farmer_id: farmerId,
        scheme_id: schemeData.id,
        bank_name: bankDetails.bankName,
        account_number: bankDetails.accountNumber,
        ifsc: bankDetails.ifsc,
      };

      const response = await fetch("http://localhost:3001/api/farmers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) throw new Error(data.message || "Failed to submit application");

      setMessage(data.message || "Application submitted successfully!");

      setBankDetails({ accountNumber: "", ifsc: "", bankName: "" });
      navigate("/profile")
    } catch (err) {
      console.error("Submission Error:", err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!schemeData) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">No Scheme Data Found</h2>
        <p>Please go back and select a scheme from the Eligible Schemes page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6  bg-white rounded-xl shadow-lg mt-28">
      <h1 className="text-3xl font-bold text-green-800 mb-2">{schemeData.name}</h1>
      <p className="text-gray-600 mb-6">{schemeData.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Bank Name</label>
          <input
            type="text"
            value={bankDetails.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Enter Bank Name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Account Number</label>
          <input
            type="text"
            value={bankDetails.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Enter Account Number"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">IFSC Code</label>
          <input
            type="text"
            value={bankDetails.ifsc}
            onChange={(e) => handleChange("ifsc", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Enter IFSC Code"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.startsWith("Error") ? "text-red-700" : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
