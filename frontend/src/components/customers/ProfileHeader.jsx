export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white shadow-sm border rounded-xl p-6 flex items-center justify-between">

      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {user.fullName}
        </h2>

        <p className="text-gray-500 text-sm">
          {user.email}
        </p>

        <p className="text-gray-500 text-sm">
          {user.phone}
        </p>
      </div>

      {/* RIGHT BADGE */}
      <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
        {user.role}
      </div>

    </div>
  );
}