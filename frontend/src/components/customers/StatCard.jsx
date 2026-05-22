export default function StatCard({ label, value, color = "gray" }) {

  const colors = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className={`p-5 rounded-xl shadow-sm border ${colors[color]}`}>
      <p className="text-sm opacity-70">{label}</p>
      <h3 className="text-xl font-semibold mt-1">{value}</h3>
    </div>
  );
}