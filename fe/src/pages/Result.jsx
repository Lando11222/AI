import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { MdComputer, MdCode, MdBusiness } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 py-8">
      {/* CONTAINER */}
      <div className="w-full max-w-[1400px] mx-auto">
        {/* BIG CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* HEADER INSIDE CARD */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-between mb-8"
          >
            <button className="flex items-center gap-2 text-gray-500 hover:text-black transition cursor-pointer">
              <FaArrowLeft />
              <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-800">
              Hasil Rekomendasi
            </h1>

            <div />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT PANEL */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-2">Halo, Reins 👋</h2>
              <p className="text-gray-500 text-md mb-6">
                Berdasarkan hasil tes minatmu, berikut rekomendasi terbaik
                untukmu.
              </p>

              {/* CHART */}
              <div className="h-56 rounded-2xl bg-gradient-to-tr from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center text-gray-500 font-medium shadow-inner">
                Radar Chart
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Visualisasi ini menunjukkan kecenderungan minat kamu.
              </p>
            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Rekomendasi Program Studi
                </h2>

                <button className="text-blue-900 text-sm hover:underline cursor-pointer">
                  Lihat Semua
                </button>
              </div>

              {/* LIST */}
              <div className="space-y-4">
                <RekomendasiItem
                  no={1}
                  icon={<MdComputer size={26} />}
                  title="Sistem Informasi"
                  desc="Teknologi + bisnis untuk solusi organisasi"
                  percent={90}
                />

                <RekomendasiItem
                  no={2}
                  icon={<MdCode size={26} />}
                  title="Informatika"
                  desc="Pengembangan software dan teknologi"
                  percent={85}
                />

                <RekomendasiItem
                  no={3}
                  icon={<MdBusiness size={26} />}
                  title="Manajemen"
                  desc="Mengelola organisasi secara efektif"
                  percent={75}
                />
              </div>

              {/* SAVE BUTTON AT BOTTOM */}
              <div className="mt-8 flex justify-end">
                <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition cursor-pointer">
                  <FaDownload />
                  Simpan Hasil
                </button>
              </div>

              {/* INFO */}
              <div className="mt-6 bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl text-sm">
                Rekomendasi ini bersifat saran. Pilihlah yang paling sesuai
                dengan minatmu.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RekomendasiItem({ no, icon, title, desc, percent }) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg text-2xl bg-indigo-100 text-blue-700 font-bold">
          {no}
        </div>

        <div className="text-indigo-600 text-xl">{icon}</div>

        <div>
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <p className="text-md text-gray-500">{desc}</p>
        </div>
      </div>

      <div className="w-44 text-right">
        <p className="text-indigo-600 font-semibold text-sm">{percent}%</p>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-400 mt-1">Kecocokan</p>
      </div>
    </div>
  );
}
