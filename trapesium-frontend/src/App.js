import React, { useState } from "react";
import IntegralForm from "./components/IntegralForm";
import IntegralChart from "./components/IntegralChart";
import DetailedIntegralTable from "./components/DetailedIntegralTable";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateIntegral = async (input) => {
    setError("");
    setResult(null);
    try {
      const response = await fetch("http://localhost:8000/api/integral/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await response.json();

      console.log("Response data:", data); // Debug log untuk melihat struktur data

      if (!response.ok) {
        throw new Error(data.error || "Error menghitung integral");
      }
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center w-full max-w-7xl">
        Kalkulator Integral Metode Trapesium
      </h1>

      <div className="w-full max-w-7xl flex flex-row gap-8 mb-8">
        {/* Form Input */}
        <div className="w-1/3">
          <IntegralForm onCalculate={calculateIntegral} />
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>

        {/* Chart */}
        <div className="w-2/3 bg-white p-4 rounded shadow">
          {result ? (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Hasil Integral (Trapesium):{" "}
                <span className="text-blue-600">
                  {typeof result.integral === "number"
                    ? result.integral.toFixed(6)
                    : result.integral}
                </span>
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Fungsi:{" "}
                <code>
                  {result.calculation_info?.function || result.function}
                </code>{" "}
                | Interval: [
                {result.calculation_info?.interval?.[0] || result.interval?.[0]}
                ,{" "}
                {result.calculation_info?.interval?.[1] || result.interval?.[1]}
                ] | h: {result.calculation_info?.h || result.h} | n:{" "}
                {result.calculation_info?.n || result.n}
              </p>
              <IntegralChart dataPoints={result.data_points} />
            </>
          ) : (
            <p className="text-gray-500">
              Masukkan data dan klik Hitung untuk melihat hasil
            </p>
          )}
        </div>
      </div>

      {/* Detailed Table Component */}
      {result && (
        <div className="w-full max-w-7xl">
          <DetailedIntegralTable data={result} />
        </div>
      )}
    </div>
  );
}

export default App;
