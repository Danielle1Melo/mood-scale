
interface MoodOption {
  emoji: string;
  label: string;
  color: string;
  hoverColor: string;
  disabledColor: string;
}

const moodOptions: MoodOption[] = [
  {
    emoji: '🥳',
    label: 'Animado',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    disabledColor: 'disabled:bg-purple-300'
  },
  {
    emoji: '🙄',
    label: 'Entediado',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    disabledColor: 'disabled:bg-green-300'
  },
  {
    emoji: '😐',
    label: 'Neutro',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    disabledColor: 'disabled:bg-yellow-300'
  },
  {
    emoji: '😡',
    label: 'Estressado',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    disabledColor: 'disabled:bg-red-300'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto ">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-500 mb-2">Escala de Humor</h1>
          <p className="text-4xl font-bold mb-2">Como está se sentindo hoje?</p>
          <p className="text-sm text-gray-500">Seu humor escolhido:</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            {moodOptions.map((mood) => (
              <button
                key={mood.emoji}
                className={`cursor-pointer relative px-8 py-4 ${mood.color} ${mood.hoverColor} ${mood.disabledColor} text-white font-bold text-xl rounded-md shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              >
                <span className="text-3xl">{mood.emoji}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 w-full max-w-4xl px-4">
          {moodOptions.map((mood) => (
              <div key={mood.emoji} className="bg-white rounded-md shadow-md p-6 text-center">
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-gray-600">{mood.label}</div>
                <div className="text-sm text-gray-500">1</div>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-gray-600 text-center mt-4 md:mt-6 px-4">Total de votos:</p>
        </div>
      </div>
    </div>
  );
}