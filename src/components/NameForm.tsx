import React, { useState } from "react";
import { Play } from "lucide-react";

interface NameFormProps {
  onStart: (name: string) => void;
}

export const NameForm: React.FC<NameFormProps> = ({ onStart }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    setError("");
    onStart(name.trim());
  };

  const isValid = name.trim().length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <img
              src="/logo-sindauto-final-2.png"
              alt="Sindauto BA Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Simulado - Sindauto BA
          </h1>
          <p className="text-gray-600">
            Insira seu nome para iniciar o simulado
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                error
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Digite seu nome"
              maxLength={50}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
              isValid
                ? "bg-red-600 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Play className="w-5 h-5" />
            <span>Iniciar Simulado</span>
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            Informações do Simulado:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 30 questões de múltipla escolha</li>
            <li>• Tempo limite: 60 minutos</li>
            <li>• 5 alternativas por questão</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
