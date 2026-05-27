import { useState } from "react";
import { FaBookOpen, FaBrain, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import aiImage from "../assets/ai.jpg";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Sistem Rekomendasi <br />
            <span className="text-blue-900">Program Studi</span>
          </h1>

          <p className="mt-4 text-gray-500 max-w-lg text-lg">
            Temukan program studi yang paling sesuai dengan minat dan potensi
            dirimu
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                <FaBookOpen />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Tes Minat</h3>
                <p className="text-sm text-gray-500">
                  Jawab pertanyaan seputar minat dan preferensi kamu
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                <FaBrain />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Analisis Cerdas</h3>
                <p className="text-sm text-gray-500">
                  Sistem AI menganalisis minat kamu dengan metode Content-Based
                  Filtering
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl">
                <FaStar />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">
                  Rekomendasi Tepat
                </h3>
                <p className="text-sm text-gray-500">
                  Dapatkan rekomendasi program studi yang paling sesuai
                </p>
              </div>
            </div>
          </div>

          {/* INPUT */}
          <div className="mt-10">
            <label className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>

            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={
                    error
                      ? "Nama lengkap harus diisi"
                      : "Masukkan nama lengkap kamu"
                  }
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  className={`w-full px-3 py-2 rounded-lg border 
    ${error ? "border-red-500 placeholder-red-400" : "border-gray-300"}
    focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>

              <button
                onClick={() => {
                  if (!name.trim()) {
                    setError("Nama lengkap harus diisi");
                    return;
                  }

                  setError("");

                  localStorage.setItem("userName", name);

                  navigate("/test", {
                    state: { name },
                  });
                }}
                className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-lg font-medium transition cursor-pointer"
              >
                Mulai Tes →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {/* RIGHT */}
        <div className="relative flex justify-center items-center">
          {/* BACKGROUND GLOW */}
          <div className="absolute w-[350px] h-[350px] bg-blue-300/30 rounded-full blur-3xl"></div>

          {/* IMAGE */}
          <img
            src={aiImage}
            alt="Ilustrasi"
            className="
      relative z-10
      w-[420px] md:w-[500px]
      object-contain
      mix-blend-multiply
      drop-shadow-2xl
      animate-float
    "
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
