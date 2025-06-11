import React from "react";

const SimpleDebugTable = ({ data }) => {
  // Debug: tampilkan struktur data
  console.log("Data received:", data);

  if (!data) {
    return (
      <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-yellow-800">Belum ada data perhitungan</p>
      </div>
    );
  }

  // Cek apakah data memiliki properti yang dibutuhkan
  const hasDetailedTable =
    data.detailed_table && Array.isArray(data.detailed_table);
  const hasSummaryStats =
    data.summary_stats && typeof data.summary_stats === "object";
  const hasCalculationInfo =
    data.calculation_info && typeof data.calculation_info === "object";

  return (
    <div className="mt-8 space-y-6">
      {/* Debug Info */}
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Has detailed_table: {hasDetailedTable ? "Yes" : "No"}</p>
        <p>Has summary_stats: {hasSummaryStats ? "Yes" : "No"}</p>
        <p>Has calculation_info: {hasCalculationInfo ? "Yes" : "No"}</p>
        <p>Raw data keys: {Object.keys(data).join(", ")}</p>
      </div>

      {/* Basic Results */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-4">Hasil Perhitungan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-sm text-gray-600">Nilai Integral</div>
            <div className="text-2xl font-bold text-blue-600">
              {data.integral !== undefined ? data.integral : "N/A"}
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-sm text-gray-600">Jumlah Interval</div>
            <div className="text-2xl font-bold text-green-600">
              {data.n !== undefined ? data.n : "N/A"}
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <div className="text-sm text-gray-600">Step Size (h)</div>
            <div className="text-2xl font-bold text-purple-600">
              {data.h !== undefined ? data.h : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats (if available) */}
      {hasSummaryStats && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Statistik Ringkasan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Min f(x)</div>
              <div className="text-lg font-semibold text-red-600">
                {data.summary_stats.min_y_value || "N/A"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Max f(x)</div>
              <div className="text-lg font-semibold text-green-600">
                {data.summary_stats.max_y_value || "N/A"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Rata-rata f(x)</div>
              <div className="text-lg font-semibold text-blue-600">
                {data.summary_stats.average_y_value || "N/A"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Luas</div>
              <div className="text-lg font-semibold text-purple-600">
                {data.summary_stats.total_area_calculated || "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple Table (if available) */}
      {hasDetailedTable && (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b">
            <h3 className="font-semibold text-gray-800">
              Tabel Perhitungan ({data.detailed_table.length} interval)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    No
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    x₍ᵢ₎
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    x₍ᵢ₊₁₎
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    f(x₍ᵢ₎)
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    f(x₍ᵢ₊₁₎)
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Luas
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Kumulatif
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.detailed_table.slice(0, 10).map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 text-sm">
                      {row.interval_no || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono">
                      {row.x_left || 0}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono">
                      {row.x_right || 0}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono">
                      {row.y_left || 0}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono">
                      {row.y_right || 0}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono text-green-600">
                      {row.trapezoid_area || 0}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono text-purple-600">
                      {row.cumulative_area || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.detailed_table.length > 10 && (
              <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-600">
                Menampilkan 10 dari {data.detailed_table.length} interval
                pertama
              </div>
            )}
          </div>
        </div>
      )}

      {/* Raw Data (for debugging) */}
      <details className="bg-gray-100 p-4 rounded">
        <summary className="font-semibold cursor-pointer">
          Raw Data (Debug)
        </summary>
        <pre className="mt-2 text-xs overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default SimpleDebugTable;
