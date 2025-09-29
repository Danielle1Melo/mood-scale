export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto ">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-500 mb-2">Escala de Humor</h1>
          <p className="text-4xl font-bold mb-2">Como está se sentindo hoje?</p>
          <p className="text-sm text-gray-500">Seu humor escolhido:</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <button
              className="cursor-pointer relative px-8 py-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-bold text-xl rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-3xl">🥳</span>
            </button>

            <button
              className="cursor-pointer relative px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold text-xl rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-3xl">🙄</span>
            </button>

            <button
              className="cursor-pointer relative px-8 py-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-bold text-xl rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-3xl">😐</span>
            </button>

            <button
              className="cursor-pointer relative px-8 py-4 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold text-xl rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-3xl">😡</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 w-full">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">🥳</div>
              <div className="text-gray-600">Animado</div>
              <div className="text-sm text-gray-500">1</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">🙄</div>
              <div className="text-gray-600">Entediado</div>
              <div className="text-sm text-gray-500">1</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">😐</div>
              <div className="text-gray-600">Neutro</div>
              <div className="text-sm text-gray-500">1</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">😡</div>
              <div className="text-gray-600">Estressado</div>
              <div className="text-sm text-gray-500">1</div>
            </div>

            
          </div>
          <p className="text-sm text-gray-600 text-center mt-5">Total de votos:</p>
        </div>
      </div>
    </div>
  );
}