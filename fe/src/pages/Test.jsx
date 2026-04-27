import { useState } from "react";
import {
  FaArrowLeft,
  FaSignOutAlt,
  FaCode,
  FaInfoCircle,
  FaTrophy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const questions = [
  "Saya senang memecahkan masalah dengan logika",
  "Saya tertarik dengan teknologi dan komputer",
  "Saya suka bekerja dengan data dan analisis",
  "Saya menikmati belajar hal baru di bidang IT",
];

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
    hover: "hover:bg-red-100 hover:border-red-300",
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
  const [current, setCurrent] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const total = questions.length;
  const progress = ((current + 1) / total) * 100;

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    setSelected(value);

    setTimeout(() => {
      setSelected(null);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setShowFinishModal(true);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* NAVBAR */}
      <div className="w-full bg-white/80 backdrop-blur border-b shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition"
          >
            <FaArrowLeft />
            Kembali
          </button>

          <h1 className="font-semibold text-gray-700">Tes Minat</h1>

          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition"
          >
            <FaSignOutAlt />
            Keluar
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-10">
        {/* PROGRESS */}
        <div className="max-w-3xl mx-auto mb-10">
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
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CARD */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center relative overflow-hidden">
          {/* Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 text-indigo-600 p-5 rounded-2xl text-3xl shadow-inner">
              <FaCode />
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-2">Pertanyaan {current + 1}</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 leading-snug">
            {questions[current]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`
        py-2 px-1 rounded-lg text-sm font-medium border transition-all duration-300 cursor-pointer
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
        </div>

        {/* INFO */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="flex items-center gap-3 bg-indigo-50 text-indigo-600 text-sm py-3 px-4 rounded-xl">
            <FaInfoCircle />
            Jawabanmu akan menentukan hasil rekomendasi terbaik
          </div>
        </div>
      </div>

      {/* MODAL KELUAR */}
      {showExitModal && (
        <Modal
          title="Keluar dari Tes?"
          desc="Jawaban kamu akan hilang"
          onClose={() => setShowExitModal(false)}
          onConfirm={() => navigate("/")}
          confirmText="Ya, Keluar"
          color="red"
        />
      )}

      {/* MODAL SELESAI */}
      {showFinishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[400px] text-center shadow-2xl animate-scaleIn">
            <div className="flex justify-center mb-4 text-yellow-500 text-4xl">
              <FaTrophy />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Tes Selesai 🎉
            </h2>

            <p className="text-gray-500 mb-6">
              Kamu sudah menyelesaikan semua pertanyaan
            </p>

            <button
              onClick={() => navigate("/result")}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg"
            >
              Lihat Hasil Tes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENT MODAL */
function Modal({ title, desc, onClose, onConfirm, confirmText, color }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[350px] text-center shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>

        <p className="text-sm text-gray-500 mb-6">{desc}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white bg-${color}-500 hover:bg-${color}-600`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
