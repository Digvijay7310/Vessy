import React from 'react'

export default function WelcomeUser({ user, defaultAddress}) {
  return (
    <div
          className="
            max-w-md
            rounded-lg
            bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-700
            text-white p-2
            shadow-lg
          "
        >
          <h1 className="text-medium md:text-lg font-bold">
            Welcome back 👋 {user?.customer?.fullName}
          </h1>

          {/* ADDRESS CARD */}
          {defaultAddress && (
            <div
              className="
                mt-2
                max-w-sm
                bg-white/10
                backdrop-blur-xl
                p-4
                rounded-xl
                border border-white/20
              "
            >
              <p className="text-xs uppercase tracking-widest text-white/70">
                Default Delivery Address
              </p>

              <p className="text-sm font-semibold mt-2">
                {defaultAddress.name}
              </p>

              <p className="text-sm text-white/80 mt-1 line-clamp-2">
                {defaultAddress.street}
              </p>

              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-white/80">
                  📍 {defaultAddress.city}
                </span>

                <span className="font-bold text-yellow-300">
                  PIN {defaultAddress.pincode}
                </span>
              </div>
            </div>
          )}

          <p className="text-white/90 mt-5 text-[10px]">
            Discover fresh products, offers & categories tailored for you
          </p>
        </div>
  )
}
