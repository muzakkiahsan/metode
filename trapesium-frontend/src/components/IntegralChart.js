import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function IntegralChart({ dataPoints }) {
  if (!dataPoints || dataPoints.length === 0) return null;

  const chartData = {
    labels: dataPoints.map((p) => p.x.toFixed(3)),
    datasets: [
      {
        label: "f(x)",
        data: dataPoints.map((p) => p.y),
        fill: true,
        borderColor: "#2563eb",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <Line data={chartData} />
    </div>
  );
}
