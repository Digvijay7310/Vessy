import { MapPin, Phone, Home } from "lucide-react";

export default function AddressCard({ address }) {
    // console.log(address);
    
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Home size={16} className="text-blue-600" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {address.name}
            </h3>

            <p className="text-[11px] text-gray-500">
              Default Address
            </p>
          </div>
        </div>

        {address.isDefault && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium">
            Default
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <MapPin
            size={14}
            className="text-gray-400 mt-0.5 shrink-0"
          />

          <p className="text-xs text-gray-600 leading-relaxed">
            {address.street}
          </p>
        </div>

        <div className="flex items-center gap-2 pl-5">
          <span className="text-[11px] text-gray-500">
            {address.city}, {address.state} • {address.pincode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={13} className="text-gray-400" />

          <span className="text-xs font-medium text-gray-700">
            {address.phone}
          </span>
        </div>
      </div>
    </div>
  );
}