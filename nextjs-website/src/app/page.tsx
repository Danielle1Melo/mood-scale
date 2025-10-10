"use client";

import { useState, useEffect } from "react";

interface MoodOption {
  emoji: string;
  label: string;
  color: string;
  hoverColor: string;
  disabledColor: string;
}

interface StatisticData {
  humor: string;
  count: number;
  percentage: string;
}

interface Statistics {
  total: number;
  breakdown: StatisticData[];
  mostCommon: StatisticData | null;
}

const moodOptions: MoodOption[] = [
  {
    emoji: "🥳",
    label: "Animado",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    disabledColor: "disabled:bg-purple-300",
  },
  {
    emoji: "🙄",
    label: "Entediado",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    disabledColor: "disabled:bg-green-300",
  },
  {
    emoji: "😐",
    label: "Neutro",
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
    disabledColor: "disabled:bg-yellow-300",
  },
  {
    emoji: "😡",
    label: "Estressado",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    disabledColor: "disabled:bg-red-300",
  },
  {
    emoji: "😢",
    label: "Triste",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    disabledColor: "disabled:bg-blue-300",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [lastVotedMood, setLastVotedMood] = useState<MoodOption | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  async function fetchStatistics() {
    try {
      const res = await fetch(`${apiBase}/api/mood-votes/statistics`);
      if (res.ok) {
        const data = await res.json();
        setStatistics(data.data);
      }
    } catch (err) {
      console.error("Erro ao buscar estatísticas:", err);
    } finally {
      setLoadingStats(false);
    }
  }

  useEffect(() => {
    fetchStatistics();
  }, []);

  async function vote(label: string) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${apiBase}/api/mood-votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ humor: label.toLowerCase() }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Erro ao votar");
      setMessage("Voto registrado com sucesso!");

      // Encontrar e salvar o humor votado para exibir o emoji
      const votedMood = moodOptions.find(mood => mood.label === label);
      if (votedMood) {
        setLastVotedMood(votedMood);
      }

      // Atualizar estatísticas após votar
      await fetchStatistics();
    } catch (err: any) {
      setMessage(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  // Função para obter a contagem de um humor específico
  function getHumorCount(label: string): number {
    if (!statistics) return 0;
    const humorData = statistics.breakdown.find(
      (item) => item.humor.toLowerCase() === label.toLowerCase()
    );
    return humorData ? humorData.count : 0;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto ">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-500 mb-2">
            Escala de Humor
          </h1>
          <p className="text-4xl font-bold mb-2">Como está se sentindo hoje?</p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            Seu humor escolhido:
            {lastVotedMood && (
              <span className="text-2xl">{lastVotedMood.emoji}</span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            {moodOptions.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => vote(mood.label)}
                disabled={loading}
                className={`cursor-pointer relative px-8 py-4 ${mood.color} ${
                  mood.hoverColor
                } ${
                  mood.disabledColor
                } text-white font-bold text-xl rounded-md shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                  loading ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-8 w-full max-w-4xl px-4">
            {moodOptions.map((mood) => {
              const count = getHumorCount(mood.label);
              return (
                <div
                  key={mood.emoji}
                  className="bg-white rounded-md shadow-md p-6 text-center"
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-gray-600">{mood.label}</div>
                  <div className="text-sm text-gray-500">
                    {loadingStats ? "..." : count}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs md:text-sm text-gray-600 text-center mt-4 md:mt-6 px-4">
            Total de votos: {loadingStats ? "..." : statistics?.total || 0}
          </p>
          {message && (
            <div
              className={`mt-4 text-center text-sm ${
                message.includes("sucesso") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
