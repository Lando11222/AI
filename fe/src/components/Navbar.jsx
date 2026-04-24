import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto relative flex items-center py-3 px-6">

        {/* LEFT (LOGO) */}
       <div className="flex items-center gap-2 -ml-14">
          <FaGraduationCap className="text-indigo-600 text-2xl" />
          <span className="font-semibold text-lg text-gray-700">
            Rekomendasi Prodi
          </span>
        </div>

        {/* CENTER (MENU - BENAR2 TENGAH) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-md text-white-600">
          <Link to="/" className="hover:bg-gray-100 transition px-5 py-1 rounded-md">
            Beranda
          </Link>
          <Link to="/tentang" className="hover:bg-gray-100 px-5 py-1 rounded-md transition">
            Tentang
          </Link>
          <Link to="/cara-kerja" className="hover:bg-gray-100 px-5 py-1 rounded-md transition">
            Cara Kerja
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;