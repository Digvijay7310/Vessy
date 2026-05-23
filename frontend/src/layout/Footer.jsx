import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      
      {/* TOP STRIP */}
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
        
        {/* LEFT */}
        <p className="text-sm text-gray-500">
          © 2026 Vessy
        </p>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-4 text-xs text-gray-500">
          <span className="hover:text-black cursor-pointer">About</span>
          <span className="hover:text-black cursor-pointer">Privacy</span>
          <span className="hover:text-black cursor-pointer">Terms</span>
          <span className="hover:text-black cursor-pointer">Support</span>
        </div>

        {/* RIGHT SOCIAL */}
        <div className="flex items-center gap-2">
          {[FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
            <span
              key={i}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
            >
              <Icon size={14} />
            </span>
          ))}
        </div>

      </div>
    </footer>
  );
}