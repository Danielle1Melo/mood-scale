import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Escala de Humor</h1>
          <p>Como esta se sentindo hoje?</p>
          <p className="text-sm text-gray-500">
            Total votes: 
          </p>
        </div>

        <div className="flex align-center justify-center gap-6 mb-12">
          <button
            className="group relative px-8 py-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="text-3xl">🥳</span>
          </button>

          <button
            className="group relative px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="text-3xl">🙄</span>
          </button>

          <button
            className="group relative px-8 py-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="text-3xl">😐</span>
          </button>

          <button
            className="group relative px-8 py-4 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="text-3xl">😡</span>
          </button>
        </div>
      </div>
    </div>
  );
}
