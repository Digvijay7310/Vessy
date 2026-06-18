import { Mail, Phone, UserCheck } from "lucide-react";

export default function ProfileHeader({ user }) {
  if (!user) return null;

  // Generate initials for avatar if no image
  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white shadow-md border rounded-2xl p-6 flex items-center justify-between gap-6">
      
      {/* LEFT: Avatar + Info */}
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xl font-bold">
          {initials}
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">{user.fullName}</h2>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Phone className="h-4 w-4" />
            <span>{user.phone}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Role Badge */}
      <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 text-sm font-medium shadow-sm hover:shadow-md transition-all">
        <UserCheck className="h-4 w-4" />
        <span>{user.role}</span>
      </div>

    </div>
  );
}