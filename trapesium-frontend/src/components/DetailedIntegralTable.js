import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calculator,
  BarChart3,
  Info,
} from "lucide-react";

const DetailedIntegralTable = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pengecekan lebih robust untuk data
  if (
    !data ||
    !data.detailed_table ||
    !data.summary_stats ||
    !data.calculation_info
  ) {
    return (
      <div className="text-gray-500 text-center py-4">
        Belum ada data perhitungan
      </div>
    );
  }

  const { detailed_table, summary_stats, calculation_info } = data;

  // Validasi bahwa detailed_table adalah array
  if (!Array.isArray(detailed_table) || detailed_table.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        Belum ada data perhitungan
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(detailed_table.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = detailed_table.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">
            Hasil Perhitungan Integral Trapesium
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm text-gray-600">Nilai Integral</div>
            <div className="text-2xl font-bold text-blue-600">
              {data.integral || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm text-gray-600">Total Interval</div>
            <div className="text-2xl font-bold text-green-600">
              {summary_stats?.total_intervals || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm text-gray-600">Lebar Interval (h)</div>
            <div className="text-2xl font-bold text-purple-600">
              {summary_stats?.interval_width || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Info */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="flex items-center gap-2 mb-3">
          <Info className="text-gray-600" size={20} />
          <h3 className="font-semibold text-gray-800">Informasi Perhitungan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium">Fungsi:</span> f(x) ={" "}
            {calculation_info?.function || "N/A"}
          </div>
          <div>
            <span className="font-medium">Interval:</span> [
            {calculation_info?.interval?.[0] || 0},{" "}
            {calculation_info?.interval?.[1] || 0}]
          </div>
          <div>
            <span className="font-medium">Metode:</span>{" "}
            {calculation_info?.method || "trapezoid"}
          </div>
          <div>
            <span className="font-medium">Formula:</span>{" "}
            {calculation_info?.formula_used || "N/A"}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <BarChart3 size={20} />
            Statistik Ringkasan
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Nilai Minimum</div>
              <div className="text-lg font-semibold text-red-600">
                {summary_stats?.min_y_value || 0}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Nilai Maksimum</div>
              <div className="text-lg font-semibold text-green-600">
                {summary_stats?.max_y_value || 0}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Rata-rata f(x)</div>
              <div className="text-lg font-semibold text-blue-600">
                {summary_stats?.average_y_value || 0}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Luas</div>
              <div className="text-lg font-semibold text-purple-600">
                {summary_stats?.total_area_calculated || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            Tabel Perhitungan Rinci
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? "Sembunyikan" : "Tampilkan Detail"}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {isExpanded && (
          <div className="overflow-x-auto">
            {/* Table Controls */}
            <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Tampilkan:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={detailed_table.length}>Semua</option>
                </select>
                <span className="text-sm text-gray-600">per halaman</span>
              </div>
              <div className="text-sm text-gray-600">
                Menampilkan {startIndex + 1}-
                {Math.min(endIndex, detailed_table.length)} dari{" "}
                {detailed_table.length} interval
              </div>
            </div>

            {/* Table */}
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    x₍ᵢ₎
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    x₍ᵢ₊₁₎
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    f(x₍ᵢ₎)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    f(x₍ᵢ₊₁₎)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Tinggi Rata²
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Lebar (h)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Luas Trapesium
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Luas Kumulatif
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Formula
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {row?.interval_no || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                      {row?.x_left || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                      {row?.x_right || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                      {row?.y_left || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                      {row?.y_right || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 font-mono">
                      {row?.average_height || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                      {row?.width || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-mono font-semibold">
                      {row?.trapezoid_area || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-600 font-mono font-semibold">
                      {row?.cumulative_area || 0}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 font-mono">
                      {row?.formula || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 bg-gray-50 border-t flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Halaman {currentPage} dari {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Sebelumnya
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + Math.max(1, currentPage - 2);
                    if (page > totalPages) return null;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 text-sm border rounded ${
                          currentPage === page
                            ? "bg-blue-500 text-white border-blue-500"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedIntegralTable;
