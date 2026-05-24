import { FaArrowLeft } from "react-icons/fa";
import { MdComputer, MdCode, MdBusiness } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";

export default function Result() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const results =
    JSON.parse(localStorage.getItem("recommendationResult")) || [];
  const userName = localStorage.getItem("userName");
  const displayedResults = Array.isArray(results)
    ? showAll
      ? results
      : results.slice(0, 3)
    : [];

  const [showBackModal, setShowBackModal] = useState(false);

  // radarData
  const radarData = [
    { subject: "Logika", value: 4 },
    { subject: "Matematika", value: 5 },
    { subject: "Teknologi", value: 5 },
    { subject: "Analisis", value: 4 },
    { subject: "Komunikasi", value: 3 },
    { subject: "Bisnis", value: 2 },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();

    const currentDate = new Date().toLocaleDateString("id-ID");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.text("HASIL REKOMENDASI PROGRAM STUDI", 20, 25);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Nama Pengguna : ${userName}`, 20, 45);
    doc.text(`Tanggal Tes : ${currentDate}`, 20, 55);

    doc.setFont("helvetica", "bold");
    doc.text("Top Rekomendasi:", 20, 75);

    let y = 90;

    displayedResults.forEach((item, index) => {
      doc.setFont("helvetica", "normal");

      doc.text(`${index + 1}. ${item.prodi} - ${item.score}%`, 25, y);

      y += 12;
    });

    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Kesimpulan:", 20, y);

    y += 12;

    doc.setFont("helvetica", "normal");

    doc.text("Berdasarkan hasil tes minat, pengguna memiliki", 20, y);

    y += 10;

    doc.text("kecenderungan pada bidang yang sesuai dengan", 20, y);

    y += 10;

    doc.text("program studi yang direkomendasikan oleh sistem.", 20, y);

    y += 30;

    doc.setFontSize(10);

    doc.text(
      "Laporan dihasilkan otomatis oleh sistem rekomendasi program studi.",
      20,
      y,
    );

    doc.save("hasil-rekomendasi.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 py-8">
      {/* CONTAINER */}
      <div className="w-full max-w-[1400px] mx-auto">
        {/* BIG CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* HEADER INSIDE CARD */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowBackModal(true)}
              className="flex items-center gap-2 text-gray-500 hover:text-black transition cursor-pointer"
            >
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
              <h2 className="text-2xl font-semibold mb-2">
                Halo, {userName} 👋
              </h2>
              <p className="text-gray-500 text-md mb-6">
                Berdasarkan hasil tes minatmu, berikut rekomendasi terbaik
                untukmu.
              </p>

              {/* CHART */}
              <div className="h-72 bg-white rounded-2xl">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name="Minat"
                      dataKey="value"
                      stroke="#4f46e5"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
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

                <button
                  onClick={() => setShowAll(!showAll)}
                  className="
    text-blue-900 
    text-sm 
    hover:underline 
    cursor-pointer
    transition-all 
    duration-300
  "
                >
                  {showAll ? "Tampilkan Sedikit" : "Lihat Semua"}
                </button>
              </div>

              {/* LIST */}
              <div className="space-y-4">
                {displayedResults?.map((item, index) => (
                  <RekomendasiItem
                    key={index}
                    no={index + 1}
                    icon={getProdiIcon(item.prodi)}
                    title={item.prodi}
                    desc={getProdiDescription(item.prodi)}
                    percent={item.score}
                  />
                ))}
              </div>

              {/* SAVE BUTTON AT BOTTOM */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition cursor-pointer"
                >
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
      {/* BACK MODAL */}
      {showBackModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[420px] text-center shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Kembali ke Home?
            </h2>

            <p className="text-gray-500 mb-6">
              Pastikan kamu sudah mengunduh hasil rekomendasi sebelum kembali.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowBackModal(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Batal
              </button>

              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Ya, Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getProdiIcon(prodi = "") {
  if (prodi.includes("Teknik")) {
    return <MdComputer size={26} />;
  }

  if (prodi.includes("Manajemen") || prodi.includes("Akuntansi")) {
    return <MdBusiness size={26} />;
  }

  return <MdCode size={26} />;
}

function getProdiDescription(prodi) {
  const descriptions = {
    "Teknik Informatika": "Belajar pemrograman, software, dan teknologi",

    "Teknik Elektro": "Belajar sistem kelistrikan dan teknologi",

    "Teknik Industri": "Mengoptimalkan sistem industri dan bisnis",

    "Teknik Sipil": "Mempelajari pembangunan dan konstruksi",

    Manajemen: "Mengelola organisasi dan bisnis",

    Akuntansi: "Mempelajari laporan dan keuangan",

    "Ilmu Hukum": "Belajar hukum dan peraturan",

    Agribisnis: "Bisnis di bidang pertanian",

    "Ilmu Keperawatan": "Pelayanan kesehatan dan perawatan pasien",

    "Profesi NERS": "Praktik profesional keperawatan",

    Fisioterapi: "Terapi fisik dan rehabilitasi",

    "Hospital dan Pariwisata": "Manajemen wisata dan pelayanan hotel",

    "Pendidikan Guru SD": "Mendidik dan mengajar anak sekolah dasar",
  };

  return descriptions[prodi] || "Program studi rekomendasi";
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
