import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const menuClass = (path) =>
    `relative px-2 py-1 font-medium transition ${
      location.pathname === path
        ? "text-blue-800"
        : "text-gray-600 hover:text-blue-800"
    }`;

  const underlineClass = (path) =>
    `absolute left-0 -bottom-1 h-[2px] w-full transition-all ${
      location.pathname === path
        ? "bg-blue-800"
        : "bg-transparent group-hover:bg-blue-800"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto relative flex items-center py-3 px-6">

        {/* LOGO */}
        <div className="flex items-center gap-2 -ml-14">
          <FaGraduationCap className="text-indigo-600 text-2xl" />
          <span className="font-semibold text-lg text-gray-700">
            Rekomendasi Prodi
          </span>
        </div>

        {/* MENU */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          
          <div className="group relative">
            <Link to="/" className={menuClass("/")}>
              Beranda
            </Link>
            <span className={underlineClass("/")}></span>
          </div>

          

          <div className="group relative">
            <Link to="/cara-kerja" className={menuClass("/cara-kerja")}>
              Cara Kerja
            </Link>
            <span className={underlineClass("/cara-kerja")}></span>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;