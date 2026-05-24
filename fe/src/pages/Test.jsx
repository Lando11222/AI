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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* NAVBAR */}
      <header className="bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
          <h1 className="text-3xl font-bold text-gray-800">Tes Minat</h1>

          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
          >
            <FaSignOutAlt />
            Keluar
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="px-6 py-10">
        {/* PROGRESS */}
        {loading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl">
              <p className="text-lg font-semibold text-indigo-600 animate-pulse">
                Sedang memproses rekomendasi...
              </p>
            </div>
          </div>
        )}
        <section className="max-w-3xl mx-auto mb-10">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Pertanyaan {current + 1} dari {total}
            </span>

            <span className="font-semibold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* QUESTION CARD */}
        <section className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center relative overflow-hidden">
          {/* BACKGROUND BLUR */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-40" />

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 text-indigo-600 p-5 rounded-2xl text-4xl shadow-inner">
              {CurrentIcon && <CurrentIcon />}
            </div>
          </div>

          {/* QUESTION NUMBER */}
          <p className="text-sm text-gray-400 mb-2">Pertanyaan {current + 1}</p>

          {/* QUESTION */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 leading-snug">
            {currentQuestion?.question}
          </h2>

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`
                  py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300
                  ${
                    selected === option.value
                      ? `${option.active} scale-105 shadow-lg`
                      : `bg-white text-gray-600 ${option.hover}`
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
          <div className="flex items-center gap-3 bg-indigo-50 text-indigo-600 text-sm py-3 px-4 rounded-xl">
            <FaInfoCircle />

            <span>
              Jawabanmu akan menentukan hasil rekomendasi program studi terbaik
            </span>
          </div>
        </section>
      </main>

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[400px] text-center shadow-2xl">
        {icon && <div className="flex justify-center mb-4">{icon}</div>}

        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

        <p className="text-gray-500 mb-6">{desc}</p>

        <div className="flex justify-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>
          )}

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
