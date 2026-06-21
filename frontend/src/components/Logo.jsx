import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Logo() {
const navigate = useNavigate();

return (
<div
onClick={() => navigate("/")}
className="
flex items-center gap-0.5
cursor-pointer
select-none
group
"
>
{/* LOGO ICON */} <div
     className="
       w-11 h-11
       rounded-2xl
       bg-gradient-to-br
       from-emerald-400
       via-green-500
       to-emerald-700
       flex items-center justify-center
       shadow-lg
       group-hover:scale-105
       transition-all
       duration-300
     "
   > <Leaf
       size={22}
       className="text-white"
       strokeWidth={2.5}
     /> </div>

  {/* BRAND */}
  <div className="leading-tight">
    <h1
      className="
        text-lg md:text-xl
        font-extrabold
        tracking-tight
        text-gray-900
      "
    >
      Vessy
    </h1>

    <p
      className="
        text-[11px]
        text-gray-500
        font-medium
        hidden sm:block
      "
    >
      Grocery in Minutes
    </p>
  </div>
</div>

);
}
