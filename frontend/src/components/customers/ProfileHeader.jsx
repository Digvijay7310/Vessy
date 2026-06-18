import {
Mail,
Phone,
UserCheck,
} from "lucide-react";

export default function ProfileHeader({ user }) {
if (!user) return null;

const initials = user.fullName
?.split(" ")
?.map((n) => n[0])
?.join("")
?.toUpperCase();

return ( <div
   className="
     bg-white
     border border-gray-100
     rounded-2xl
     p-5
     shadow-sm
   "
 > <div className="flex items-center justify-between gap-4">


    {/* Left */}
    <div className="flex items-center gap-4">

      <div
        className="
          h-14 w-14
          rounded-full
          bg-emerald-100
          text-emerald-700
          flex items-center justify-center
          font-bold text-lg
        "
      >
        {initials}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {user.fullName}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Mail size={14} />
            {user.email}
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Phone size={14} />
            {user.phone}
          </div>

        </div>
      </div>

    </div>

    {/* Right */}
    <div
      className="
        flex items-center gap-2
        bg-emerald-50
        text-emerald-700
        px-3 py-1.5
        rounded-full
        text-sm
        font-medium
      "
    >
      <UserCheck size={15} />
      {user.role}
    </div>

  </div>
</div>


);
}
