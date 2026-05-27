import { useState } from "react";
import { FaSignOutAlt, FaInfoCircle, FaTrophy } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getRecommendation } from "../services/api";

import { questions } from "../data/questions";

const options = [
  {
    label: "Sangat Tidak Setuju",
    value: 1,
    active: "bg-red-500 text-white",
    hover: "hover:bg-red-50 hover:border-red-300",
  },
  {
    label: "Tidak Setuju",
    value: 2,
    active: "bg-orange-500 text-white",
    hover: "hover:bg-orange-50 hover:border-orange-300",
  },
  {
    label: "Netral",
    value: 3,
    active: "bg-gray-500 text-white",
    hover: "hover:bg-gray-50 hover:border-gray-300",
  },
  {
    label: "Setuju",
    value: 4,
    active: "bg-blue-500 text-white",
    hover: "hover:bg-blue-50 hover:border-blue-300",
  },
  {
    label: "Sangat Setuju",
    value: 5,
    active: "bg-green-500 text-white",
    hover: "hover:bg-green-50 hover:border-green-300",
  },
];

function Test() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName =
    location?.state?.name || localStorage.getItem("userName") || "Pengguna";

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [showExitModal, setShowExitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const total = questions.length;
  const progress = ((current + 1) / total) * 100;

  const currentQuestion = questions[current] || {};
  const CurrentIcon = currentQuestion?.icon;
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (value) => {
    const updatedAnswers = [...answers];

    updatedAnswers[current] = value;

    setAnswers(updatedAnswers);
    setSelected(value);

    setTimeout(async () => {
      if (current >= total) return;

      setSelected(null);

      if (current < total - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        try {
          setLoading(true);

          const result = await getRecommendation(updatedAnswers);

          localStorage.setItem("recommendationResult", JSON.stringify(result));
          localStorage.setItem("userName", userName);

          setShowFinishModal(true);
        } catch (error) {
          console.error(error);
          alert("Terjadi kesalahan saat mengambil rekomendasi");
        } finally {
          setLoading(false);
        }
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100 relative overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-5">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Tes Minat
            </h1>

            <p className="text-sm text-gray-500 mt-1">Halo, {userName} 👋</p>
          </div>

          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          >
            <FaSignOutAlt />
            Keluar
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="px-5 py-10 relative z-10">
        {/* LOADING */}
        {loading && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white px-10 py-7 rounded-3xl shadow-2xl border border-white/50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

                <p className="text-lg font-semibold text-indigo-600">
                  Sedang memproses rekomendasi...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS */}
        <section className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">
              Pertanyaan {current + 1} dari {total}
            </span>

            <span className="font-bold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner border border-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* QUESTION CARD */}
        <section className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/60 p-10 md:p-12 text-center relative overflow-hidden">
          {/* DECORATION */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-indigo-200/40 rounded-full blur-3xl" />

          {/* ICON */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white p-6 rounded-3xl text-4xl shadow-xl">
              {CurrentIcon && <CurrentIcon />}
            </div>
          </div>

          {/* QUESTION NUMBER */}
          <p className="text-sm font-medium tracking-wide uppercase text-indigo-500 mb-3">
            Pertanyaan {current + 1}
          </p>

          {/* QUESTION */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed mb-10">
            {currentQuestion?.question}
          </h2>

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`
                relative overflow-hidden
                py-4 px-3 rounded-xl border text-sm font-semibold
                transition-all duration-300 transform
                ${
                  selected === option.value
                    ? `${option.active} scale-105 shadow-xl border-transparent`
                    : `bg-white text-gray-700 border-gray-300 hover:-translate-y-1 hover:shadow-lg ${option.hover}`
                }
              `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* INFO */}
        <section className="max-w-3xl mx-auto mt-8">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-lg border border-indigo-100 text-indigo-600 text-sm py-4 px-5 rounded-2xl shadow-sm">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <FaInfoCircle />
            </div>

            <span className="font-medium">
              Jawabanmu akan menentukan hasil rekomendasi program studi terbaik
            </span>
          </div>
        </section>
        {/* EXIT MODAL */}
        {showExitModal && (
          <Modal
            title="Keluar dari Tes?"
            desc="Jawaban yang sudah diisi akan hilang."
            confirmText="Ya, Keluar"
            confirmColor="bg-red-500 hover:bg-red-600"
            onClose={() => setShowExitModal(false)}
            onConfirm={() => navigate("/")}
          />
        )}

        {/* FINISH MODAL */}
        {showFinishModal && (
          <Modal
            icon={<FaTrophy className="text-yellow-500 text-4xl" />}
            title="Tes Selesai 🎉"
            desc="Kamu sudah menyelesaikan semua pertanyaan."
            confirmText="Lihat Hasil"
            confirmColor="bg-indigo-600 hover:bg-indigo-700"
            onConfirm={() => navigate("/result")}
          />
        )}
      </main>
    </div>
  );
}

function Modal({
  icon,
  title,
  desc,
  confirmText,
  confirmColor,
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-[400px] text-center shadow-2xl border border-white/50">
        {icon && (
          <div className="flex justify-center mb-5">
            <div className="bg-yellow-100 p-4 rounded-2xl">{icon}</div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        <p className="text-gray-500 mb-7 leading-relaxed">{desc}</p>

        <div className="flex justify-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="px-7 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Batal
            </button>
          )}

          <button
            onClick={onConfirm}
            className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
