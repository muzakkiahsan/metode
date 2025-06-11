import { useState } from "react";

export default function IntegralForm({ onCalculate }) {
  const [func, setFunc] = useState("1/(1+x)");
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [h, setH] = useState(0.125);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (func.trim() === "" || a === "" || b === "" || h === "") {
      setError("Semua input harus diisi");
      return;
    }

    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const hNum = parseFloat(h);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(hNum)) {
      setError("Input a, b, dan h harus angka valid");
      return;
    }
    if (aNum >= bNum) {
      setError("Batas atas (b) harus lebih besar dari batas bawah (a)");
      return;
    }
    if (hNum <= 0) {
      setError("Jarak antar titik (h) harus positif");
      return;
    }
    if (((bNum - aNum) / hNum) % 1 !== 0) {
      setError("h harus membagi interval [a, b] secara tepat");
      return;
    }

    onCalculate({
      function: func,
      a: aNum,
      b: bNum,
      h: hNum,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="func"
        >
          Fungsi f(x):
        </label>
        <input
          id="func"
          type="text"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 1/(1+x)"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="a">
          Batas bawah (a):
        </label>
        <input
          id="a"
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="b">
          Batas atas (b):
        </label>
        <input
          id="b"
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="h">
          Jarak antar titik (h):
        </label>
        <input
          id="h"
          type="number"
          step="any"
          value={h}
          onChange={(e) => setH(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <p className="text-red-600 font-medium">{error}</p>}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Hitung Integral
      </button>
    </form>
  );
}
