import Navbar from "../components/Navbar";
import {
  FaUser,
  FaQuestionCircle,
  FaCogs,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUser />,
    title: "Input Nama",
    desc: "Masukkan nama lengkap untuk memulai proses.",
  },
  {
    icon: <FaQuestionCircle />,
    title: "Isi Tes Minat",
    desc: "Jawab pertanyaan dari Sangat Tidak Setuju hingga Sangat Setuju.",
  },
  {
    icon: <FaCogs />,
    title: "Pengolahan Data",
    desc: "Jawaban diubah menjadi data numerik dan dianalisis sistem.",
  },
  {
    icon: <FaChartBar />,
    title: "Perhitungan",
    desc: "Menggunakan metode Content-Based Filtering.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Hasil Rekomendasi",
    desc: "Program studi terbaik akan ditampilkan.",
  },
];

function CaraKerja() {
  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT - TANGGA VISUAL */}
        <div className="hidden md:flex items-end justify-center gap-3 h-[350px]">
          <div className="w-12 h-[80px] bg-red-400 rounded-t-lg shadow-md"></div>
          <div className="w-12 h-[120px] bg-green-400 rounded-t-lg shadow-md"></div>
          <div className="w-12 h-[170px] bg-orange-400 rounded-t-lg shadow-md"></div>
          <div className="w-12 h-[230px] bg-cyan-400 rounded-t-lg shadow-md"></div>
          <div className="w-12 h-[300px] bg-blue-800 rounded-t-lg shadow-md"></div>
        </div>

        {/* RIGHT - CONTENT */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Cara Kerja <br />
            <span className="text-blue-900">Sistem Kami</span>
          </h1>

          <p className="text-gray-500 mt-4 text-lg max-w-md">
            Ikuti langkah sederhana ini untuk mendapatkan rekomendasi program
            studi terbaik.
          </p>

          {/* STEPS */}
          <div className="mt-10 space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 group">
                {/* ICON */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-xl 
                transition"
                >
                  {step.icon}
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    {step.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaraKerja;
